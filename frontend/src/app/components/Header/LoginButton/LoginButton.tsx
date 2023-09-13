import React from 'react';
import './style.scss'
import { useFrontContext } from '@/app/contexts/FrontContext';

const LoginButton = () => {
  const { setIsLoginActive } = useFrontContext()
  
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsLoginActive(true);
  };

  return (
    <button onClick={handleButtonClick}>login</button>
  );
};

export default LoginButton;
