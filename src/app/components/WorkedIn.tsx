'use client'
import React, { useEffect } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import './components.css'

const WorkedIn = () => {
  return (
    <div className="scrollmagc_zoomin_container">
      <h1>worked in</h1>
    </div>
    // <div className="scrollmagc_zoomin_container" >
    //   <Controller>
    //     <Scene 
    //       triggerElement="scrollmagic-zoomin-img"
    //       duration="100%"
    //       triggerHook={1}
    //       pin={true}
    //       indicators
    //     >
    //       {(progress:any) => (
    //         <Tween
    //           to={{ scale: 2, opacity: 1 }}
    //           totalProgress={progress}
    //           paused
    //         >
    //           <h1 className="scrollmagic-zoomin-img">Worked In</h1>
    //         </Tween>
    //       )}
    //     </Scene>
    //   </Controller>
    // </div>
  );
};

export default WorkedIn;