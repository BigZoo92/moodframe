import React from 'react';
import './style.scss'
import { useStore } from '@/app/store';

const LoginButton = () => {
  const { setIsAuthActive } = useStore()
  
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setIsAuthActive(true);
    };

  return (
    <button onClick={handleButtonClick}>login</button>
  );
};

export default LoginButton;
