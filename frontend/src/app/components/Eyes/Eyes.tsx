// 'use client';

import React, { useEffect, useState } from 'react';
import './style.scss';
// import {
//   transformStyle,
//   eyeTransformStyle,
//   dotStyle,
//   calculateDotSize,
// } from './calculateEyesPositions'


const Eyes: React.FC = () => {
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   // const handleMouseMove = (e: MouseEvent | TouchEvent) => {
  //   //   const { clientX, clientY } = e instanceof MouseEvent ? e : e.touches[0];
  //   //   const x = (clientX - window.innerWidth / 2) / 20;
  //   //   const y = (clientY - window.innerHeight / 2) / 20;

  //   //   setPosition({ x, y });
  //   // };

  //   window.addEventListener('mousemove', handleMouseMove);
  //   window.addEventListener('touchmove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //     window.removeEventListener('touchmove', handleMouseMove);
  //   };
  // }, []);


  return (
      <div className='wrapper_eyes'>
        <div id='head'>
          <div
            id='eye'
          >
            <div id='dot'></div>
          </div>
        </div>
      </div>
  );
};



export default Eyes;
