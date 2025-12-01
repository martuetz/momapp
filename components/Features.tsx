import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <div id="features" className="bg-brand-light py-24 lg:py-32">
      <div className="container mx-auto px-6">
        
        <div className="max-w-3xl mb-20">
          <span className="text-brand-red uppercase tracking-wide font-bold text-xs mb-2 block">
            MOMENTUM 360°
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-brand-black mb-6 tracking-tight">
            Complete Support System That Ensures Your Success
          </h2>
          <p className="text-brand-black/70 text-lg font-light leading-relaxed max-w-2xl">
            Everything inside Momentum 360° is designed for you to hit the milestones on your roadmap and scale to six figures and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="flex items-baseline mb-4">
                 <span className="text-4xl font-bold text-brand-red mr-2">{idx + 1}.</span>
                 <div className="h-px bg-brand-charcoal w-full opacity-30 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <h3 className="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors">
                {feature.title} <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
              </h3>
              <p className="text-brand-charcoal leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
            <a href="#apply" className="btn-sigrun border border-brand-black text-brand-black px-10 py-4 hover:text-white hover:bg-brand-black">
                See What Else Is Included ↗
            </a>
        </div>

      </div>
    </div>
  );
};

export default Features;