"use client";
import { Scene } from "react-scrollmagic";
import { Parallax, Background } from "react-parallax";
import { Tween, SplitChars, ScrollTrigger } from "react-gsap";
import Image from "next/image";
import React from "react";
import "./components.css";

const Hackathon = () => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="waveStyle">
        <path
          fill="#ffffff"
          d="M0,192L48,202.7C96,213,192,235,288,245.3C384,256,480,256,576,240C672,224,768,192,864,170.7C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <Scene pin>
        <section className="bg-white relative top-60 h-screen text-center">
          <ScrollTrigger start="-10vh center" end="50vh center" scrub={0.1}>
            <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} stagger={0.1}>
              <SplitChars wrapper={<div style={{ display: "inline-block", fontSize: "40px", letterSpacing: "1px" }} />}>
                Participated in various Hackathons
              </SplitChars>
            </Tween>
            <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} stagger={0.9} ease="power1.in(0.1, 0.1)">
              <Image src="/img/FGrid.png" width={400} height={400} alt="isro" />
              <Image src="/img/SIH.png" width={400} height={400} alt="isro" />
              <Image src="/img/CFG.jpg" width={400} height={400} alt="isro" />
              <Image src="/img/jwoc.png" width={400} height={400} alt="isro" />
            </Tween>
          </ScrollTrigger>
        </section>
      </Scene>
    </div>
  );
};

export default Hackathon;
