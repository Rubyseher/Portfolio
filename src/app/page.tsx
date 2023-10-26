"use client";
import "../app/globals.css";

import React, { Fragment } from "react";
import { Scene } from "react-scrollmagic";
import { Tween, ScrollTrigger, Timeline } from "react-gsap";
import WorkedIn from "./components/WorkedIn";
import Isro from "./components/Isro";
import "./components/components.css";

function page() {
  return (
    <div>
      <Scene pin indicators>
        <section style={{ height: "100vh" }}>
          <h1>hi</h1>
        </section>
      </Scene>
      <Scene pin>
        <section className="scrollmagc_zoomin_container">
          <ScrollTrigger start="10vh center" end="400vh center" scrub={0.3}>
            <Timeline target={
            <Fragment>
              <div style={{display:'block', width:'100%'}}>
            <h1 className="scrollmagic-zoomin-img">worked in</h1>
            </div>
            <Isro/>
            </Fragment>}>
              <Tween to={{ transform: "scale(1.5)", opacity: 0,delay:6 }} target={0} ease="elastic.out(0.2,1.2)" />
              <Tween to={{ transform: "scale(1.5)", opacity: 0 }} target={1} ease="elastic.out(0.2,1.2)" />

              {/* <Tween from={{ transform: 'scale(0)', opacity: 1 }} target={1} /> */}
              {/* <Tween to={{ transform: 'scale(8)', opacity: 0 }} target={1} ease="elastic.out(0.2,1.2)" /> */}
              {/* <Timeline target={<Isro/>} labels={Array(20).map((_, a) => { return { label: a + '', position: a } })}  >
                        <Tween from={{ x: '18vw', transform: 'scale(1)', opacity: 1 }} target={1} to={{ x: '18vw', transform: 'scale(8)', opacity: 0 }} ease="elastic.out(0.2,1.2)" position="0" />
                        <Tween from={{ x: '0vw' }} ease="elastic.out(0.2,1.2)" target="first" position="1" />
                        <Tween to={{ opacity: 0 }} ease="elastic.out(0.2,1.2)" target="last" position="2" />
                        <Tween from={{ delay: 2, transform: 'scale(0.3)', y: '-78vh', x: '-20vw' }} target="wrapper" position="4" />
                        <Tween from={{ delay: 4, opacity: 0 }} target="wrapper" position="6" />
                    </Timeline> */}
            </Timeline>
          </ScrollTrigger>
        </section>
      </Scene>
    </div>
  );
}

export default page;
