import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <div className="bg-white py-24 border-t border-brand-light">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-brand-black tracking-tight max-w-xl">
              Real Results. <br/><span className="text-brand-red">Real Women.</span>
            </h2>
            <div className="hidden md:block pb-2">
                <a href="#results" className="text-sm font-bold uppercase tracking-wide border-b-2 border-brand-red pb-1 hover:text-brand-red transition-colors">
                    Read more stories ↗
                </a>
            </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-brand-light p-10 hover:shadow-xl transition-shadow duration-300 rounded-sm">
              <div className="text-brand-red text-4xl font-serif mb-4">”</div>
              <p className="text-brand-black mb-8 font-quote text-xl leading-relaxed italic">
                {t.quote}
              </p>
              <div className="flex items-center space-x-4 border-t border-gray-200 pt-6">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-brand-black text-sm">{t.name}</h4>
                  <p className="text-xs text-brand-charcoal uppercase tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;