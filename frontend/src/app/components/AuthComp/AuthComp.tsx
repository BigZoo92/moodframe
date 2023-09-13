'use client';

import React, { CSSProperties, useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './style.scss';
import { useFrontContext } from '@/app/contexts/FrontContext';
import LoginForm from './LoginForm/LoginForm';

const AuthComp = () => {

  const { isLoginActive, setIsLoginActive } = useFrontContext();

  const styleContainer: CSSProperties = {
    opacity: isLoginActive ? 1 : 0,
    pointerEvents: isLoginActive ? 'all' : 'none',
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsLoginActive(false);
      }
    };

    if (isLoginActive) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isLoginActive, setIsLoginActive]);

  return (
    <section ref={containerRef} className='container_form' style={styleContainer}>
      <h3>Login To <i>M<b>oo</b>dFrame</i></h3>
      <LoginForm></LoginForm>
      <span className='changeForm'>Don’t have a site yet ? <button>Start here</button></span>
    </section>
  )
};

export default AuthComp;
