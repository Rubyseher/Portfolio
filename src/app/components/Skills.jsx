import React from "react";
import { Scene } from "react-scrollmagic";
import './backLightGlow.scss'

function Skills() {
  return (
    <div>
      <Scene pin>
        <section className=" h-screen text-white flex items-center bg-black">
          <p className="glowingLogos">skills</p>
        </section>
      </Scene>
    </div>
  );
}

export default Skills;
