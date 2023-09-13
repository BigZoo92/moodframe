'use client';

import { useState } from "react";
import { FrontContext } from "../FrontContext";

interface FrontProviderProps {
  children: React.ReactNode;
}

export function FrontProvider({ children }: FrontProviderProps) {
  const [isLoginActive, setIsLoginActive] = useState<boolean>(false);

  return (
    <FrontContext.Provider value={{ isLoginActive, setIsLoginActive }}>
      {children}
    </FrontContext.Provider>
  );
}
