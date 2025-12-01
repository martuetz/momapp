import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-1 md:col-span-1">
                <div className="text-3xl font-bold text-brand-red mb-6 tracking-tighter">SIGRUN</div>
            </div>
            
            <div className="col-span-1">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Programs</h4>
                <ul className="space-y-2 text-sm text-brand-charcoal">
                    <li><a href="#" className="hover:text-brand-red transition-colors">Momentum</a></li>
                    <li><a href="#" className="hover:text-brand-red transition-colors">Sombar Kickstart</a></li>
                    <li><a href="#" className="hover:text-brand-red transition-colors">Red Circle</a></li>
                </ul>
            </div>

            <div className="col-span-1">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Resources</h4>
                <ul className="space-y-2 text-sm text-brand-charcoal">
                    <li><a href="#" className="hover:text-brand-red transition-colors">Podcast</a></li>
                    <li><a href="#" className="hover:text-brand-red transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-brand-red transition-colors">Free Masterclass</a></li>
                </ul>
            </div>

            <div className="col-span-1">
                 <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
                 <p className="text-sm text-brand-charcoal mb-4">
                     Do you have any questions? <br/>
                     Email us <a href="mailto:info@sigrun.com" className="text-brand-black underline decoration-brand-red hover:text-brand-red">info@sigrun.com</a>
                 </p>
                 <div className="flex space-x-4">
                     {/* Social Placeholders */}
                     <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-black hover:bg-brand-red hover:text-white transition-colors cursor-pointer">IG</div>
                     <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-black hover:bg-brand-red hover:text-white transition-colors cursor-pointer">YT</div>
                     <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-black hover:bg-brand-red hover:text-white transition-colors cursor-pointer">FB</div>
                 </div>
            </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-grey uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Sigrun GmbH.</p> 
          <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-black">Imprint</a>
              <a href="#" className="hover:text-brand-black">Privacy Policy</a>
              <a href="#" className="hover:text-brand-black">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;