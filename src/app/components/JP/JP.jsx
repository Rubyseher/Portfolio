import React, { useRef, useEffect } from 'react';
import Particles from "./Particles";
import "./styles.css";
import { useWindowScroll } from "@uidotdev/usehooks";

const JP = () => {
  const [{ x, y }] = useWindowScroll();

    return (
        <div className='JPContainer'>
          <Particles scrollCoordinate={0}/>
        </div>
      );
};

export default JP;