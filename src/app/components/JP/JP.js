import React, { useRef, useEffect } from 'react';
import Particles from "./Particles";
import "./styles.css";

const JP = ({scrollCoordinate}) => {
    return (
        <div className='JPContainer'>
          <Particles scrollCoordinate={scrollCoordinate}/>
        </div>
      );
};

export default JP;