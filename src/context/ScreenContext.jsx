import { createContext, useContext, useState } from "react";
import { useMediaQuery } from 'react-responsive';

const ScreenContext = createContext();

export const ScreenContextProvider = ({ children }) => {

   const isTabletOrPhone = useMediaQuery({
      query: '(max-width: 650px)',
   });
   const isDesktopOrLaptop  = useMediaQuery({
      query: '(max-width: 1200px)',
   });
   const isBigScreen  = useMediaQuery({
      query: '(max-width: 1660px)',
   });

   return (
      <ScreenContext.Provider value={{ isTabletOrPhone, isDesktopOrLaptop, isBigScreen }}>
         {children}
      </ScreenContext.Provider>
   );
};

// Create a custom hook for easier access
export const useScreenContextProvider = () => useContext(ScreenContext);
