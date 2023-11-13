"use client";
import "../app/globals.css";
import Image from "next/image";

import React, { Fragment } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, ScrollTrigger, Timeline } from "react-gsap";
import Isro from "./components/Isro";
import "./components/components.css";
import Hackathon from "./components/Hackathon";

function page() {
  return (
    <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
      <Scene pin indicators>
        <section style={{ height: "100vh", fontSize: "7rem", textAlign: "center" }}>
          <h4>
            hi
            <br />
            under construction
          </h4>
        </section>
      </Scene>

      <Scene pin indicators duration={600}>
        <section className="scrollmagc_zoomin_container">
          <ScrollTrigger start="0vh center" end="150vh center" scrub={0.4}>
            <Timeline
              target={
                <Fragment>
                  <div style={{ position: "absolute", zIndex: 1, width: "100%" }}>
                    <h1 className="scrollmagic-zoomin-img">worked in</h1>
                  </div>
                  <div style={{ position: "absolute", zIndex: 0, width: "100%" }}>
                    <Isro />
                  </div>
                </Fragment>
              }
            >
              <Tween to={{ transform: "scale(3)", opacity: 0 }} target={0} ease="elastic.out(0.2,1.2)" />
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} target={1} ease="elastic.out(0.2,1.2)" />
            </Timeline>
          </ScrollTrigger>
        </section>
      </Scene>

      <Scene pin indicators>
        <section className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="waveStyle">
            <path
              fill="#fcba03"
              d="M0,192L48,202.7C96,213,192,235,288,245.3C384,256,480,256,576,240C672,224,768,192,864,170.7C960,149,1056,139,1152,138.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
          <div className="h-screen w-screen bg-yellow-300"></div>
        </section>
      </Scene>
      {/* <Hackathon /> */}
    </Controller>
  );
}

export default page;
