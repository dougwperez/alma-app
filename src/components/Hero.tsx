import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative w-full h-[40vh] flex items-center justify-center">
      <Image
        src="/images/image.png"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
    </div>
  );
};

export default Hero;
