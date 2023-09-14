'use client';

import React, { useState } from 'react';
import'./style.scss'
import Link from 'next/link';
import Logo from '../Logo/Logo';
import LoginButton from './LoginButton/LoginButton';

const Header = () => {
  return (
    <header>
        <nav>
            <Logo></Logo>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/templates'>Templates</Link>
                </li>
                <li>
                    <Link href='/showcase'>Showcase</Link>
                </li>
                <li>
                    <Link href='/gallery'>Gallery</Link>
                </li>
            </ul>
            <LoginButton></LoginButton>
        </nav>
    </header>
  );
};

export default Header;
