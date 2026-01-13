import React from 'react';
import { Utensils, MapPin, Heart, Users, ArrowRight } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-[#BBCB64] py-12 px-6 font-sans antialiased mt-[5%]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-3/5">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F79A19] mb-4 block">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight">
                Discover the <br />
                <span className="text-[#CF0F0F]">Heart of Flavor</span>
              </h1>
              <p className="text-stone-600 leading-relaxed mb-6">
                FoodTour was born out of a simple passion: finding the stories hidden behind every dish. 
                We believe that food is the universal language that connects cultures, families, and strangers.
              </p>
              <button className="flex items-center gap-2 bg-[#CF0F0F] text-white px-6 py-3 rounded-full font-bold hover:bg-stone-900 transition-colors shadow-lg shadow-red-200">
                Join the Tour <ArrowRight size={18} />
              </button>
            </div>
            {/* Visual Accent Area */}
            <div className="hidden md:flex md:w-2/5 bg-stone-50 items-center justify-center border-l border-stone-100 p-12">
               <div className="relative">
                 <div className="w-48 h-48 bg-[#F79A19] rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                    <Utensils size={80} strokeWidth={1.5} />
                 </div>
                 <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#BBCB64] rounded-2xl flex items-center justify-center text-white shadow-xl rotate-12">
                    <Heart size={32} fill="currentColor" />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Mission/Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-[#F79A19]">
            <div className="w-12 h-12 bg-orange-50 text-[#F79A19] rounded-xl flex items-center justify-center mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="font-black text-stone-900 mb-2 uppercase text-sm tracking-widest">Local Roots</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              We scout the most authentic local spots that don't always appear on the maps.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-[#CF0F0F]">
            <div className="w-12 h-12 bg-red-50 text-[#CF0F0F] rounded-xl flex items-center justify-center mb-6">
              <Users size={24} />
            </div>
            <h3 className="font-black text-stone-900 mb-2 uppercase text-sm tracking-widest">Community</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Building a global table where everyone has a seat and a story to share.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-[#BBCB64]">
            <div className="w-12 h-12 bg-green-50 text-[#BBCB64] rounded-xl flex items-center justify-center mb-6">
              <Heart size={24} />
            </div>
            <h3 className="font-black text-stone-900 mb-2 uppercase text-sm tracking-widest">Passion</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Driven by the love of culinary craft and the people who make it possible.
            </p>
          </div>
        </div>

        {/* Simple Text Footer */}
        <div className="text-center pt-8">
           <p className="text-white/80 text-sm font-medium tracking-wide">
             EST. 2024 • CRAFTED WITH CARE BY FOODTOUR
           </p>
        </div>
      </div>
    </div>
  );
};

export default App;