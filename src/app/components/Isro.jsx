"use client";
import Background from "./StarBackground";
import Image from 'next/image'
import './components.css'
import { forwardRef } from "react";

const Isro = forwardRef((_, ref) => {
    return (
        <div className='starbg' ref={ref}>
            <Background />
            <Image src="/img/isroLogo2.png" width={400} height={400} alt="isro"/>
        </div>
    );
});

export default Isro