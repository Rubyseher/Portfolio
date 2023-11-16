"use client";
import "../app/globals.css";
import Image from "next/image";
import Hackathon from "./components/Hackathon";
import React, { Fragment } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, ScrollTrigger, Timeline } from "react-gsap";
import Isro from "./components/Isro";
import "./components/components.css";
// import Hackathon from "./components/Hackathon";

function page() {
  return (
    <Controller globalSceneOptions={{ triggerHook: "onLeave" }}>
      <Scene pin indicators>
        <section style={{ height: "100vh", fontSize: "7rem", textAlign: "center" }}>
          <h4>hi</h4>
        </section>
      </Scene>

      <Scene pin indicators>
        <section className="scrollmagc_zoomin_container">
          <ScrollTrigger start="0vh center" end="50vh center" scrub={0.4}>
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

      <Scene pin indicators duration={600}>
        <section className="relative">
          <Hackathon />
        </section>
      </Scene>
    </Controller>
  );
}

export default page;
