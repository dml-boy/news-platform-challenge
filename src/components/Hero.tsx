// 📁 components/Hero.tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#1B1B1B] flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-[1039px] h-[267px] flex items-center justify-center">
        <img
          src="/ad_1.png" // Update path as needed
          alt="Ad Banner"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Reserved space for future taglines or badges */}
      <div className="absolute top-2 right-2 z-10">
        {/* Optional badge */}
      </div>
    </section>
  );
};

export default Hero;
