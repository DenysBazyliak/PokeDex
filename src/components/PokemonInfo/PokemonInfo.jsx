import React, { useEffect, useState } from 'react';
import style from './PokemonInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPokemon } from '../../store/pokeListReducer';
import { useScreenContextProvider } from '../../context/ScreenContext';

import { PokemonInfoItem } from './PokemonInfoItem/PokemonInfoItem';


export const PokemonInfo = () => {
   const pokemon = useSelector((state) => state.pokeListReducer.pokemon);
   const { isPhone, isTablet, isDesktopOrLaptop, isBigScreen } = useScreenContextProvider();
   const dispatch = useDispatch();

   const [mouseEnter, setMouseEnter] = useState(false);
   const [copied, setCopied] = useState(false);
   const [showInfo, setShowInfo] = useState(false);

   useEffect(() => {
      if (pokemon) setShowInfo(true);
   }, [pokemon]);


   const handleSetNull = () => {
      setShowInfo(false);
      setTimeout(() => {
         dispatch(getNewPokemon(null));
      }, 300);
   };
   const handleMouse = (value) => {
      setMouseEnter(value);
   };

   const handleCopy = () => {
      setCopied(true);
      navigator.clipboard.writeText(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)).then(() => setTimeout(() => setCopied(false), 2000));
   };

   if (!pokemon) {
      return null;
   } else {
      return (
         <>
            <div onClick={() => handleSetNull()}
                 className={`${style.dimmingDiv}`}>
            </div>

            <PokemonInfoItem handleSetNull={handleSetNull} handleMouse={handleMouse} handleCopy={handleCopy}
                             pokemon={pokemon}
                             showInfo={showInfo} mouseEnter={mouseEnter} copied={copied} isPhone={isPhone}
                             isTablet={isTablet} isDesktopOrLaptop={isDesktopOrLaptop}
                             isBigScreen={isBigScreen} />
         </>
      );
   }
};
