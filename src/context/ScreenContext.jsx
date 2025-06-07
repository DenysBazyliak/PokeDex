import { createContext, useContext } from "react";
import { useMediaQuery } from 'react-responsive';

const ScreenContext = createContext();

export const ScreenContextProvider = ({ children }) => {
   const isPhone = useMediaQuery({
      query: '(max-width: 700px)',
   });
   const isTablet = useMediaQuery({
      query: '(max-width: 1000px)',
   });
   const isDesktopOrLaptop  = useMediaQuery({
      query: '(max-width: 1200px)',
   });
   const isBigScreen  = useMediaQuery({
      query: '(max-width: 1660px)',
   });

   return (
      <ScreenContext.Provider value={{ isPhone, isTablet, isDesktopOrLaptop, isBigScreen }}>
         {children}
      </ScreenContext.Provider>
   );
};

// Create a custom hook for easier access
export const useScreenContextProvider = () => useContext(ScreenContext);
