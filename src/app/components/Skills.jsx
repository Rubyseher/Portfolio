import React from "react";
import { Scene } from "react-scrollmagic";
import "./components.css";
import Image from "next/image";

function Skills() {
  return (
    <div>
      <Scene pin>
        <section className=" h-screen text-white flex items-center bg-black">
          {/* <p className="glowingLogos">skills</p> */}
          <Image src="/img/js.png" width={120} height={120} className="glowing"/>
        </section>
      </Scene>
    </div>
  );
}

export default Skills;
