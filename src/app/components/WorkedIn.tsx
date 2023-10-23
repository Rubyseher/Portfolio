'use client'
import React, { useEffect } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import './components.css'

const WorkedIn = () => {
  return (
    <div className="scrollmagc_zoomin_container" >
      <Controller>
        <Scene
          triggerElement="scrollmagc_zoomin_container"
          duration={2500}
          triggerHook={0}
        >
          {(progress) => (
            <Tween
              to={{ scale: 5, opacity: 0 }}
              totalProgress={progress}
              paused
            >
              <h1 className="scrollmagic-zoomin-img">Worked In</h1>
            </Tween>
          )}
        </Scene>
      </Controller>
    </div>
  );
};

export default WorkedIn;