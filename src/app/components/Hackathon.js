import { Scene } from 'react-scrollmagic'
import { Parallax, Background } from 'react-parallax';
import { Tween, SplitChars, ScrollTrigger } from 'react-gsap';
import Image from 'next/image';
import React from 'react';
import "./components.css"

const Hackathon = () => {
  return (
    <Scene pin>
      <div className='waveStyle'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" >
          <path fill="#fcba03" d="M0,192L48,202.7C96,213,192,235,288,245.3C384,256,480,256,576,240C672,224,768,192,864,170.7C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* <Parallax bgImage="https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" strength={500}>
        <div style={{ height: 500 }}>
          <div style={{ top: '50%', bottom: '50%', transform: 'translate(-50%,-50%)' }}>HTML inside the parallax</div>
        </div>
      </Parallax> */}
      {/* <Image src="/img/wave.svg" width={700} height={100} class=" w-screen relative bottom-96" /> */}
    </Scene>
  );
};

export default Hackathon;
