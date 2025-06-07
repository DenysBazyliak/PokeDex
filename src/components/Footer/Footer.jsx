import React, { useEffect, useState } from 'react';
import style from './Footer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPokemons } from '../../store/pokeListReducer';
import { Preloader } from '../../utilities/Preloader/Preloader';
import { useScreenContextProvider } from '../../context/ScreenContext';

export const Footer = () => {

   const {isPhone} = useScreenContextProvider()

   const next = useSelector((state) => state.pokeListReducer.next);
   const isLoading = useSelector((state) => state.pokeListReducer.isLoading);
   const dispatch = useDispatch();

   const [showButton, setShowButton] = useState(false);
   const [smallScreen, setSmallScreen] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setShowButton(window.scrollY > 500);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   });

   const scrollToTop = () => {
      const scrollToTop = () => {
         if (window.scrollY !== 0) {
            window.scrollBy(0, isPhone ? -150 : -80);
            requestAnimationFrame(scrollToTop);
         }
      };
      scrollToTop();
   };

      if (isLoading) {
         return <Preloader />;
      }
      return (
         <div className={style.footer}>
            <div className={style.footerButtonWrapper}>
               <button
                  className={`${style.footerButton} ${isPhone && style.footerButtonPhone}`}
                  disabled={isLoading}
                  onClick={() => {
                     return dispatch(loadNewPokemons(next));
                  }}
               >
                  {isPhone ? '+' : 'Load pokemons'}
               </button>
            </div>
            <button className={`${style.scrollButton} ${showButton && style.showScrollButton}`}
                    onClick={() => scrollToTop()} title={`Scroll to top`}> ↑
            </button>
         </div>
      );
   }



