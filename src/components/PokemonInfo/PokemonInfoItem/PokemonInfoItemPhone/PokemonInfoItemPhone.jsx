import React, { useEffect, useRef, useState } from 'react';

import style from './PokemonInfoItemPhone.module.css';

import { hasher } from '../../../../utilities/utilities';
import { PokemonInfoTable } from '../PokemonInfoTable/PokemonInfoTable';


export const PokemonInfoItemPhone = ({pokemon, copied, handleCopy, handleSetNull}) => {

   const panelRef = useRef(null);
   const offsetRef = useRef(200);
   const startYRef = useRef(0);
   const [translateY, setTranslateY] = useState(260);

   const handleTouchStart = (e) => {
      startYRef.current = e.touches[0].clientY;
      offsetRef.current = translateY;
   };

   const handleTouchMove = (e) => {
      const deltaY = e.touches[0].clientY - startYRef.current;
      const newY = Math.max(0, offsetRef.current + deltaY);
      setTranslateY(newY);
   };

   const handleTouchEnd = () => {
      if (translateY < 50) setTranslateY(0);
      else handleSetNull();
   };

   useEffect(() => {
      const panel = panelRef.current;
      if (!panel) return;

      panel.addEventListener('touchstart', handleTouchStart);
      panel.addEventListener('touchmove', handleTouchMove);
      panel.addEventListener('touchend', handleTouchEnd);

      return () => {
         panel.removeEventListener('touchstart', handleTouchStart);
         panel.removeEventListener('touchmove', handleTouchMove);
         panel.removeEventListener('touchend', handleTouchEnd);
      };
   }, [translateY]);

   return (
      <>
         <div ref={panelRef} className={style.pokeInfoItemPhoneWrapper}
              style={{ transform: `translateY(${translateY}px)` }}>
            <div className={style.pokeImgWrapper}>
               <img alt={pokemon.name}
                    width={170}
                    height={170}
                    src={pokemon.sprites.other.showdown.front_shiny} />
            </div>
            <div className={style.pokeName}>
               <div className={style.pokeIcon} onClick={handleCopy}>
                  <img
                     src={`${copied ? 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Ftick-icon-png%2Ftick-icon-png-10.jpg&f=1&nofb=1&ipt=47dd4719e1f41244643e6af89c63c98a7d877369cfe542afa678add1ce9655fc' : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficons.veryicon.com%2Fpng%2FSystem%2FMono%2520General%25202%2Fcopy.png&f=1&nofb=1&ipt=f087de7c03a1abe3d4db815230e2ded942e01edf18089a702c99b0484dbd5060'}`}
                     alt={'copy_text'}
                     width={28}
                     height={28}
                  />
               </div>
               {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ' ' + hasher(pokemon.id)}
            </div>
            <PokemonInfoTable pokemon={pokemon} />
         </div>
      </>
   );
};