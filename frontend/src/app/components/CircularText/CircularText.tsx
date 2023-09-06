import React from 'react';
import './style.scss';

const CircularText = () => {
  return (
    <svg
        className='roundText'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 500 500'
    >
        <defs>
            <path
            d='M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250'
            id='textcircle_top'
            ></path>
            <path
            d='M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250'
            id='textcircle_bottom'
            ></path>
        </defs>
        <text dy='10' textLength='1220'>
            <textPath xlinkHref='#textcircle_top'>
                <tspan className="word">Art</tspan>.<tspan className="word">Awaits</tspan>.<tspan className="word">Click</tspan>.<tspan className='word'>Now</tspan>.
            </textPath>
        </text>
    </svg>

  );
};

export default CircularText;
