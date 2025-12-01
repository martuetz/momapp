import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from '../utils/audioUtils';
import { MOMENTUM_SYSTEM_INSTRUCTION } from '../constants';
import { VoiceStatus } from '../types';

const VoiceAssistant: React.FC = () => {
  const [status, setStatus] = useState<VoiceStatus>(VoiceStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(0);

  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  
  // Visualizer Ref
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Gemini Session
  const sessionRef = useRef<Promise<any> | null>(null);

  const cleanup = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
    }
    if (inputSourceRef.current) {
      inputSourceRef.current.disconnect();
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
    }
    
    // Stop all currently playing audio
    audioQueueRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    audioQueueRef.current.clear();

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setStatus(VoiceStatus.IDLE);
    setVolume(0);
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const startVisualizer = (stream: MediaStream, ctx: AudioContext) => {
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    const source = ctx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyzerRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      // Normalize somewhat for visual effect
      setVolume(Math.min(100, average * 1.5)); 
      animationFrameRef.current = requestAnimationFrame(updateVolume);
    };
    updateVolume();
  };

  const startConversation = async () => {
    if (!process.env.API_KEY) {
      setErrorMessage("API Key is missing. Please check your configuration.");
      return;
    }

    setErrorMessage(null);
    setStatus(VoiceStatus.CONNECTING);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio Contexts
      const InputContextClass = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new InputContextClass({ sampleRate: 16000 });
      
      const OutputContextClass = window.AudioContext || (window as any).webkitAudioContext;
      outputAudioContextRef.current = new OutputContextClass({ sampleRate: 24000 });
      nextStartTimeRef.current = outputAudioContextRef.current.currentTime;

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start Visualizer (for user input feedback)
      // Note: We create a separate analyzer path so it doesn't interfere with the script processor
      startVisualizer(stream, inputAudioContextRef.current);

      // Connect to Gemini
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: MOMENTUM_SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            console.log("Connection opened");
            setStatus(VoiceStatus.LISTENING);

            // Setup Input Processing
            if (!inputAudioContextRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            inputSourceRef.current = source;
            
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              
              if (sessionRef.current) {
                sessionRef.current.then(session => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              }
            };

            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const serverContent = msg.serverContent;
            
            if (serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const audioData = serverContent.modelTurn.parts[0].inlineData.data;
              playAudioResponse(audioData);
            }

            if (serverContent?.turnComplete) {
              // Can use this to toggle "Thinking" vs "Listening" states if desired
              // For now we stay in LISTENING state effectively
            }

            if (serverContent?.interrupted) {
               audioQueueRef.current.forEach(source => {
                 try { source.stop(); } catch (e) {}
               });
               audioQueueRef.current.clear();
               if (outputAudioContextRef.current) {
                   nextStartTimeRef.current = outputAudioContextRef.current.currentTime;
               }
            }
          },
          onclose: () => {
            console.log("Connection closed");
            cleanup();
          },
          onerror: (err) => {
            console.error("Connection error", err);
            setErrorMessage("Connection lost. Please try again.");
            cleanup();
          }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to start audio session.");
      cleanup();
    }
  };

  const playAudioResponse = async (base64Data: string) => {
    if (!outputAudioContextRef.current) return;

    try {
      const audioCtx = outputAudioContextRef.current;
      const arrayBuffer = base64ToUint8Array(base64Data);
      const audioBuffer = await decodeAudioData(arrayBuffer, audioCtx, 24000);
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      
      const currentTime = audioCtx.currentTime;
      // Ensure we schedule in the future
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }
      
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;
      
      audioQueueRef.current.add(source);
      source.onended = () => {
        audioQueueRef.current.delete(source);
      };
      
    } catch (e) {
      console.error("Error playing audio chunk", e);
    }
  };

  const handleDisconnect = () => {
    cleanup();
  };

  return (
    <div className="bg-white rounded-3xl p-10 shadow-2xl relative overflow-hidden border border-gray-100">
      {/* Device-like Shine */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white via-white to-transparent opacity-50 rounded-full blur-2xl z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
           <div>
              <h3 className="text-xl font-bold text-brand-black mb-1">
                Momentum Application
              </h3>
              <p className="text-brand-charcoal text-xs uppercase tracking-widest font-bold">
                 AI Admission Assistant
              </p>
           </div>
           <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-red font-bold">
              AI
           </div>
        </div>
        
        <div className="border-t border-gray-100 my-6"></div>

        <div className="flex flex-col items-center justify-center space-y-10 py-4">
          
          {/* Visualizer / Status Indicator */}
          <div className={`relative w-48 h-48 flex items-center justify-center rounded-full transition-all duration-500 ${status === VoiceStatus.LISTENING ? 'bg-brand-black' : 'bg-brand-light'}`}>
            {status === VoiceStatus.IDLE && (
              <div className="text-5xl text-brand-black opacity-20">🎙️</div>
            )}
            
            {status === VoiceStatus.CONNECTING && (
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-brand-red"></div>
            )}

            {status === VoiceStatus.LISTENING && (
              <>
                 {/* Pulse ring - Brand Red */}
                 <div className="absolute w-full h-full rounded-full border border-brand-red/30 animate-audio-pulse"></div>
                 <div className="absolute w-[120%] h-[120%] rounded-full border border-brand-red/10 animate-audio-pulse" style={{animationDelay: '0.5s'}}></div>
                 {/* Volume visualizer */}
                 <div 
                    className="w-36 h-36 bg-gradient-to-br from-brand-red to-[#A00000] rounded-full flex items-center justify-center transition-all duration-75 shadow-lg"
                    style={{ transform: `scale(${0.8 + (volume / 150)})` }}
                 >
                    <span className="text-white font-bold tracking-widest text-xs">LIVE</span>
                 </div>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="w-full">
            {status === VoiceStatus.IDLE || status === VoiceStatus.ERROR ? (
               <button
                onClick={startConversation}
                className="w-full btn-sigrun bg-brand-red text-white py-4 shadow-lg hover:shadow-brand-red/30"
              >
                <span>APPLY FOR A CALL ↗</span>
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="w-full btn-sigrun bg-white border border-gray-200 text-brand-charcoal hover:bg-gray-50 py-4"
              >
                End Session
              </button>
            )}
          </div>

          {errorMessage && (
            <div className="text-brand-red text-xs bg-red-50 px-4 py-2 border border-red-100 w-full text-center rounded">
              {errorMessage}
            </div>
          )}
          
          <div className="text-center">
             <p className="text-xs text-brand-grey uppercase tracking-widest font-bold mb-2">
                 {status === VoiceStatus.LISTENING ? "Listening..." : "Microphone Required"}
             </p>
             <div className="w-8 h-1 bg-brand-light mx-auto rounded-full overflow-hidden">
                <div className={`h-full bg-brand-red transition-all duration-1000 ${status === VoiceStatus.LISTENING ? 'w-full' : 'w-0'}`}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;