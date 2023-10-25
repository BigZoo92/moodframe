import React from 'react';
import './style.scss'
import Link from 'next/link';

interface ButtonProps {
    text: string;
    href: string;
    negatif: boolean;
}

const Button = ({ text, href, negatif }: ButtonProps) => {
  return (
    <Link href={href} className={negatif ? 'retro_button negatif' : 'retro_button'}>
        {text}    
    </Link>
  )
}

export default Button
