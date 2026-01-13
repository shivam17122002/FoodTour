import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Heart, Share2, Search } from 'lucide-react';

const features = [
  {
    title: "Curated Recipes",
    description: "Discover hand-picked, home-style recipes tested for flavor and simplicity.",
    icon: <Utensils size={24} />,
  },
  {
    title: "Save Favourites",
    description: "Keep all your must-try dishes in one place with our personalized save feature.",
    icon: <Heart size={24} />,
  },
  {
    title: "Global Community",
    description: "Join thousands of home cooks sharing secrets from kitchens around the world.",
    icon: <Share2 size={24} />,
  },
  {
    title: "Smart Search",
    description: "Find exactly what you're craving by ingredients, prep time, or cuisine.",
    icon: <Search size={24} />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#BBCB64] py-20 px-6 pt-1">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <p className="text-stone-800 font-bold text-xs uppercase tracking-[0.2em] mb-2 ">
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#CF0F0F] mb-4">
            Cooking <span className="text-stone-800"> Made Simple</span>
          </h2>
          <div className="w-16 h-1 bg-[#FFE52A] mx-auto rounded-full" />
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[32px] p-8 flex flex-col items-start shadow-lg hover:translate-y-[-5px] transition-transform duration-300"
            >
              {/* ICON CONTAINER */}
              <div className="w-12 h-12 rounded-xl bg-[#F79A19]/10 flex items-center justify-center text-[#CF0F0F] mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-stone-800 font-bold text-lg mb-3">
                {feature.title}
              </h3>
              
              <p className="text-stone-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;