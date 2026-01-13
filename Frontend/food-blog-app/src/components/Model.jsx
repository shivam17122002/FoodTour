import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Model = ({ close, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute right-4 top-4 text-stone-600 hover:text-[#CF0F0F] "><IoMdCloseCircle size={20}/></button>

        {children}

      </div>
    </div>
  );
};

export default Model;



