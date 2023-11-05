import { Scene } from 'react-scrollmagic'
import { Parallax, Background } from 'react-parallax';
import { Tween, SplitChars, ScrollTrigger } from 'react-gsap';
import Image from 'next/image';
import React from 'react';

const Hackathon = () => {
  return (
    <div>
      <Parallax bgImage="https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" strength={500}>
        <div style={{ height: 500 }}>
          <div style={{ top: '50%', bottom: '50%', transform: 'translate(-50%,-50%)' }}>HTML inside the parallax</div>
        </div>
      </Parallax>
      {/* <Image src="/img/wave.svg" width={700} height={100} class=" w-screen relative bottom-96" /> */}
    </div>
  );
};

export default Hackathon;
