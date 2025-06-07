import React, { useState } from 'react';
import style from './PokemonItem.module.css';
import { getNewPokemon } from '../../../store/pokeListReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useScreenContextProvider } from '../../../context/ScreenContext';

const PokemonType = ({ name, icon, isPhone, isTablet, isDesktopOrLaptop, isBigScreen  }) => {
   return (
         <div className={style.pokeType}>
            <img
               //55 20
               alt={name}
               width={isPhone ? 45 : isTablet ? 50 : isDesktopOrLaptop ? 55 : isBigScreen ? 70 : 75}
               height={isPhone ? 15 : isTablet ? 17.5 : isDesktopOrLaptop ? 20 : isBigScreen ? 25 : 30}
               src={icon}
            />
         </div>
   );
};

const PokemonItem = (pokemon) => {
   const pokemonTypeIcons = useSelector((state) => state.pokeListReducer.typeIcons);
   const { isPhone, isTablet, isDesktopOrLaptop, isBigScreen } = useScreenContextProvider()
   const typesLength = pokemon.types.length;

   const dispatch = useDispatch();

   const [showType, setShowType] = useState(false);

   const handleShowType = (value) => {
      return setShowType(value);
   };

   let i = 1;

   return (
      <div className={style.pokeItemWrapper}>
         <div
            className={style.pokeItem}
            onMouseEnter={() => {
               handleShowType(true);
            }}
            onMouseLeave={() => {
               handleShowType(false);
            }}
            onClick={() => {
               dispatch(getNewPokemon(pokemon));
            }}
         >
            <div className={style.pokeImgWrapper}>
               <img
                  alt={pokemon.name}
                  width={isPhone ? 130 : isTablet ? 135 : isDesktopOrLaptop ? 140 : isBigScreen ? 160 : 200}
                  height={isPhone ? 130 : isTablet ? 135 : isDesktopOrLaptop ? 140 : isBigScreen ? 160 : 200}
                  src={pokemon.sprites.other['official-artwork'].front_default}
               />
            </div>
            <div className={style.pokeName}>
               {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </div>
         </div>
         {
            isPhone ? null : (
               <div className={`${style.pokeTypeWrapper} ${showType && style.pokeTypeWrapperShow}`}>
                  {pokemon.types.map((el, index) => {
                     let icon = pokemonTypeIcons?.get(el.type.name);
                     if (i < typesLength) {
                        i++;
                        return (
                           <React.Fragment key={el.type.name + index}>
                              <PokemonType name={el.type.name} icon={icon} isPhone={isPhone} isTablet={isTablet}
                                           isDesktopOrLaptop={isDesktopOrLaptop} isBigScreen={isBigScreen} />
                              <div className={style.separator} />
                           </React.Fragment>
                        );
                     } else {
                        return <PokemonType key={el.type.name - index} name={el.type.name} icon={icon} isPhone={isPhone}
                                            isTablet={isTablet} isDesktopOrLaptop={isDesktopOrLaptop}
                                            isBigScreen={isBigScreen} />;
                     }
                  })}
               </div>
            )
         }
      </div>
   );
};

export default PokemonItem;
