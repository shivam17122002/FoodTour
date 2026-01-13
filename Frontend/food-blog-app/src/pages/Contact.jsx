import React from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#BBCB64] flex items-center justify-center p-6 text-stone-800">
      <div className="bg-[#c8db5a] w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left: Contact Info */}
        <div className="p-10 space-y-6">
          <h1 className="text-4xl font-black text-[#CF0F0F] uppercase tracking-tight">
            Contact <br/> <span className="text-stone-800">Tours</span>
          </h1>
          <p className="font-medium">Have questions? We'd love to hear from you.</p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#FFE52A] p-2 rounded-lg"><Mail size={20} className="text-[#CF0F0F]" /></div>
              <span className="font-bold">hi@foodtour.com</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#FFE52A] p-2 rounded-lg"><Phone size={20} className="text-[#CF0F0F]" /></div>
              <span className="font-bold">+1 (555) 000-0000</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#FFE52A] p-2 rounded-lg"><MapPin size={20} className="text-[#CF0F0F]" /></div>
              <span className="font-bold">Main St, Food City</span>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <form className="bg-white p-10 flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full p-4 rounded-xl bg-stone-50 border-2 border-stone-100 focus:border-[#F79A19] outline-none transition-all"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-4 rounded-xl bg-stone-50 border-2 border-stone-100 focus:border-[#F79A19] outline-none transition-all"
          />
          <textarea 
            placeholder="How can we help?" 
            rows="4" 
            className="w-full p-4 rounded-xl bg-stone-50 border-2 border-stone-100 focus:border-[#F79A19] outline-none transition-all resize-none"
          />
          <button className="w-full bg-[#CF0F0F] text-white font-bold py-4 rounded-xl hover:bg-[#F79A19] transition-all flex items-center justify-center gap-2 group"
          onClick={() => alert("Invalid User")}
          >
            SEND <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default function App() {
  return <Contact />;
}