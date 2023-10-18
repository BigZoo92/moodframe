'use client';

import React, { CSSProperties, useEffect, useRef } from 'react';
import './style.scss';
import { useStore } from '@/app/store';
import {LoginForm} from './Forms';
import {SignForm} from './Forms';

export const AuthComp = () => {

  const { isAuthActive, setIsAuthActive, isLoginActive, setIsLoginActive, isUserExists, setIsUserExists  } = useStore();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const styleContainer: CSSProperties = {
    opacity: isAuthActive ? 1 : 0,
    pointerEvents: isAuthActive ? 'all' : 'none',
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, state: boolean) => {
  event.stopPropagation();
  setIsLoginActive(state);
};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsAuthActive(false);
      }
    };

    if (isAuthActive) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isAuthActive, setIsAuthActive]);

  useEffect(() => {
    if(isUserExists){      
      setIsLoginActive(true)
      setIsUserExists(false)
    }
  }, [setIsLoginActive, setIsUserExists, isUserExists]);

  return (
    <section ref={containerRef} className='container_form' style={styleContainer}>
      {isLoginActive ? (
        <>
          <h3>
            Login To{' '}
            <i>
              M<b>oo</b>dFrame
            </i>
          </h3>
          <LoginForm></LoginForm>
          <span className='changeForm'>
            Don’t have a site yet ? <button onClick={(e) => handleButtonClick(e, false)}>Start here</button>
          </span>
        </>
      ) : (
        <>
          <h3>
            Sign in To{' '}
            <i>
              M<b>oo</b>dFrame
            </i>
          </h3>
          <SignForm></SignForm>
          <span className='changeForm'>
            <button onClick={(e) => handleButtonClick(e, true)}>Or login</button> to an existing Account
          </span>
        </>
      )}
    </section>
  )
};

