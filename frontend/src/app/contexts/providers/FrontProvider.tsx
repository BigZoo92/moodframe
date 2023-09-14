'use client';

import { useState } from "react";
import { FrontContext } from "../FrontContext";

interface FrontProviderProps {
  children: React.ReactNode;
}

export function FrontProvider({ children }: FrontProviderProps) {
  const [isAuthActive, setIsAuthActive] = useState<boolean>(false);
  const [isLoginActive, setIsLoginActive] = useState<boolean>(true);

  return (
    <FrontContext.Provider value={{ isLoginActive, isAuthActive, setIsLoginActive, setIsAuthActive }}>
      {children}
    </FrontContext.Provider>
  );
}
