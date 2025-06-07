import React, { useEffect, useState } from 'react';
import style from "./Footer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadNewPokemons } from "../../store/pokeListReducer";
import { Preloader } from "../../utilities/Preloader/Preloader";

export const Footer = () => {
  const next = useSelector((state) => state.pokeListReducer.next);
  const isLoading = useSelector((state) => state.pokeListReducer.isLoading);
  const dispatch = useDispatch();

   const [showButton, setShowButton] = useState(false);
   useEffect(()=>{
      const handleScroll = () => {
         setShowButton(window.scrollY > 500);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   })

   const scrollToTop = () => {
      const scrollToTop = () => {
         if (window.scrollY !== 0) {
            window.scrollBy(0, -75);
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
          className={style.footerButton}
          disabled={isLoading}
          onClick={() => {
            return dispatch(loadNewPokemons(next));
          }}
        >
          Load Pokemons
        </button>
      </div>
      <button className={`${style.scrollButton} ${showButton && style.showScrollButton}`} onClick={()=>scrollToTop()} title={`Scroll to top`}> ↑ </button>
    </div>
  );
};
