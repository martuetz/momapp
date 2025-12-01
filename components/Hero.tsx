import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden pb-20 pt-10 lg:pt-20 lg:pb-32">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="z-10 order-2 lg:order-1 flex flex-col items-start">
          <h1 className="text-5xl lg:text-7xl font-medium text-brand-black leading-[1.1] mb-2 tracking-tight">
            Break Through Limits. <br/>
            Build Your Freedom.
          </h1>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-red mb-8 tracking-tight">
            MOMENTUM360°
          </h2>
          <p className="text-lg text-brand-black/80 mb-6 max-w-lg leading-relaxed font-light">
            If you could build a profitable online business at your own pace that gives you the freedom to work and live the way you want...
          </p>
          <ul className="space-y-4 mb-10 max-w-lg">
             <li className="flex items-start gap-3 text-brand-black/80 font-light">
                <span className="text-brand-red text-xl mt-1">→</span>
                <span>without watching your email list grow at a glacial pace or feeling like your business has hit an invisible ceiling...</span>
             </li>
             <li className="flex items-start gap-3 text-brand-black/80 font-light">
                <span className="text-brand-red text-xl mt-1">→</span>
                <span>without accepting that your current revenue is "as good as it gets"...</span>
             </li>
             <li className="flex items-start gap-3 text-brand-black/80 font-light">
                <span className="text-brand-red text-xl mt-1">→</span>
                <span>And do it with a community of ambitious women who are as committed to building a life of freedom as they are to growing their businesses...</span>
             </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
             <a href="#apply" className="btn-sigrun bg-brand-red text-white px-8 py-4 shadow-md w-full sm:w-auto">
               APPLY FOR A CALL <span className="text-lg leading-none mb-1 ml-2">↗</span>
             </a>
          </div>
          <p className="mt-4 text-xs text-brand-charcoal max-w-sm">
             This call helps you discover if Momentum is right for you. Don't worry. It's not a commitment to join.
          </p>
          
          <div className="mt-12 flex items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos for Trust */}
             <span className="font-serif font-bold text-xl">Forbes</span>
             <span className="font-bold text-lg tracking-tighter">TEDx</span>
             <span className="font-serif italic text-lg">Entrepreneur</span>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative order-1 lg:order-2">
          {/* Background Shape - subtle branding */}
          <div className="absolute top-10 right-10 w-full h-full bg-brand-light rounded-[3rem] -z-10 transform rotate-2"></div>
          
          <img 
            src="https://picsum.photos/id/445/800/900" 
            alt="Sigrun Style Business Portrait" 
            className="w-full h-auto object-cover relative z-10 shadow-2xl rounded-sm"
            style={{ maxHeight: '700px' }}
          />
          
          {/* Floating Badge - Brand element */}
          <div className="absolute bottom-12 left-0 bg-white p-6 shadow-xl border-t-4 border-brand-red z-20 max-w-xs hidden md:block">
            <p className="font-quote text-2xl text-brand-black italic mb-2">
              "If she can do it, I can do it."
            </p>
            <p className="text-xs text-brand-charcoal uppercase tracking-widest font-bold">Sigrun</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;