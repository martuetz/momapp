export enum VoiceStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  LISTENING = 'LISTENING',
  SPEAKING = 'SPEAKING',
  ERROR = 'ERROR'
}

export interface ProgramFeature {
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}
