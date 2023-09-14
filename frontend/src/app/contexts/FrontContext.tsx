'use client';

import React, { createContext, useContext } from 'react';

interface FrontContextType {
  isAuthActive: boolean;
  setIsAuthActive: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginActive: boolean;
  setIsLoginActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FrontContext = createContext<FrontContextType | undefined>(undefined);

export const useFrontContext = () => {
  const context = useContext(FrontContext);
  if (context === undefined) {
    throw new Error("useFrontContext doit être utilisé à l'intérieur de FrontContextProvider");
  }
  return context;
};