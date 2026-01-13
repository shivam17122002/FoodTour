import React from 'react';
import { ArrowLeft, Copyright } from 'lucide-react';

const App = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#BBCB64] flex items-center justify-center p-6 font-sans antialiased mt-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-stone-100">
        
        {/* Simple Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-stone-400 hover:text-[#CF0F0F] transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-stone-50 text-[#CF0F0F] rounded-full mb-4">
            <Copyright size={24} />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
            All Rights <span className="text-[#F79A19]">Reserved</span>
          </h1>
          <div className="h-1 w-12 bg-[#BBCB64] mt-2 rounded-full" />
        </header>

        {/* Content Body */}
        <div className="space-y-6 text-stone-600 leading-relaxed text-base">
          <p>
            © {currentYear} <span className="font-bold text-stone-900">FoodTour</span>. 
            All rights reserved.
          </p>
          
          <p>
            The content, design, graphics, and functionality of this website are the exclusive property 
            of FoodTour and are protected by applicable copyright and intellectual property laws.
          </p>

          <p>
            No part of this website may be reproduced, distributed, modified, or transmitted in any form 
            without prior written permission from the owner, except where permitted by law.
          </p>

          <div className="p-4 bg-stone-50 rounded-lg border-l-4 border-[#CF0F0F]">
            <p className="text-sm italic">
              Unauthorized use of this website or its content may give rise to a claim for damages 
              and/or be a criminal offense.
            </p>
          </div>
        </div>

        {/* Simple Footer */}
        <footer className="mt-10 pt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400 font-medium uppercase tracking-widest">
            FoodTour Legal Notice • {currentYear}
          </p>
          <a 
            href="mailto:legal@foodtour.com" 
            className="text-xs font-bold text-[#F79A19] hover:underline"
          >
            CONTACT LEGAL TEAM
          </a>
        </footer>
      </div>
    </div>
  );
};

export default App;