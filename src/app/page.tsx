"use client";
import "../app/globals.css";
import Image from "next/image";
import Hackathon from "./components/Hackathon";
import React, { Fragment } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, ScrollTrigger, Timeline } from "react-gsap";
import Isro from "./components/Isro";
import JP from "./components/JP/JP";
import "./components/components.css";
import Skills from "./components/Skills";

function page() {
  return (
    <Controller globalSceneOptions={{ triggerHook: "onLeave" }}>
      <Scene pin indicators>
        <section style={{ height: "100vh", fontSize: "7rem", alignItems: "center", backgroundColor: "black" }}>
          <img src="/img/react.png" className="glowingLogo" alt={""} />
          <img src="/img/react.png" alt={""} />
        </section>
      </Scene>

      <Scene pin indicators>
        <section className="scrollmagc_zoomin_container">
          <ScrollTrigger start="0vh center" end="200vh center" scrub={0.4}>
            <Timeline
              target={
                <Fragment>
                  <div style={{ position: "absolute", width: "100%", backgroundColor: "black", marginTop: "30%" }}>
                    <h1 className="scrollmagic-zoomin-img">Interned At</h1>
                  </div>
                  <div style={{ position: "absolute", width: "100%" }}>
                    <Isro />
                  </div>
                  <div style={{ position: "absolute", width: "100%" }}>
                    <JP />
                  </div>
                </Fragment>
              }
            >
              <Tween to={{ transform: "scale(3)", opacity: 0 }} target={0} ease="power3.in(2, 0.5)" />
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} target={1} ease="power3.in(2, 0.5)" />
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} target={2} ease="power3.in(2, 0.5)" />
            </Timeline>
          </ScrollTrigger>
        </section>
      </Scene>

      <Scene pin indicators>
        <section className="relative">
          <Skills />
        </section>
      </Scene>

      {/* <Scene pin indicators duration={600}>
        <section className="relative">
          <Hackathon />
        </section>
      </Scene> */}
    </Controller>
  );
}

export default page;
