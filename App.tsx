import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import VoiceAssistant from './components/VoiceAssistant';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 h-24 flex justify-between items-center">
          <div className="text-3xl font-bold tracking-tighter text-brand-red">SIGRUN</div>
          <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest text-brand-black items-center">
            <a href="#features" className="hover:text-brand-red transition-colors py-2">The Program</a>
            <a href="#results" className="hover:text-brand-red transition-colors py-2">Success Stories</a>
            <a href="#apply" className="btn-sigrun bg-brand-red text-white px-6 py-2 hover:bg-brand-black text-[10px]">Apply Now ↗</a>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <Hero />
        
        {/* The "Apply" Section */}
        {/* Using Matte Black Background to make the White VoiceAssistant Pop - High Contrast Brand Style */}
        <section id="apply" className="py-24 lg:py-32 bg-brand-black relative overflow-hidden">
           
           <div className="container mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                 <div className="lg:col-span-6 text-white">
                    <span className="text-brand-red uppercase tracking-wide font-bold text-xs mb-4 block">Application Process</span>
                    <h2 className="text-5xl lg:text-6xl font-medium mb-8 leading-tight tracking-tight">
                      Why Apply for a Call?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 leading-relaxed font-light">
                      Momentum 360° isn't the right next step for everyone. When you apply for a call, you get the chance to chat with a member of our team to see if Momentum 360° is the right fit for you.
                    </p>
                    <p className="text-white mb-6 font-bold uppercase tracking-wider text-sm">
                      We're looking for online entrepreneurs who are:
                    </p>
                    
                    <div className="space-y-6">
                       <div className="flex items-start group">
                         <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm mr-5 flex-shrink-0">✓</div>
                         <div>
                           <h4 className="font-bold tracking-wide mb-1 text-sm text-white">Ready to take action</h4>
                           <p className="text-sm text-white/60">And implement what you learn.</p>
                         </div>
                       </div>
                       <div className="flex items-start group">
                         <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm mr-5 flex-shrink-0">✓</div>
                         <div>
                           <h4 className="font-bold tracking-wide mb-1 text-sm text-white">Committed to growing</h4>
                           <p className="text-sm text-white/60">And willing to show up consistently.</p>
                         </div>
                       </div>
                       <div className="flex items-start group">
                         <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm mr-5 flex-shrink-0">✓</div>
                         <div>
                           <h4 className="font-bold tracking-wide mb-1 text-sm text-white">Open to change</h4>
                           <p className="text-sm text-white/60">Even if it takes you out of your comfort zone.</p>
                         </div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="lg:col-span-6">
                    <VoiceAssistant />
                 </div>
              </div>
           </div>
        </section>
        
        <Features />

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default App;