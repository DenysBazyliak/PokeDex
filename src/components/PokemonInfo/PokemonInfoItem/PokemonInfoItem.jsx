import style from './PokemonInfoItem.module.css';
import { hasher } from '../../../utilities/utilities';
import React from 'react';
import { PokemonInfoTable } from './PokemonInfoTable/PokemonInfoTable';
import { PokemonInfoItemPhone } from './PokemonInfoItemPhone/PokemonInfoItemPhone';

export const PokemonInfoItem = ({handleMouse, handleCopy, pokemon, showInfo, mouseEnter, copied, isPhone, isTablet, isDesktopOrLaptop, isBigScreen, handleSetNull }) => {
  if(isPhone){
     return PokemonInfoItemPhone({handleMouse, handleCopy, pokemon, copied, isPhone, handleSetNull, showInfo});
  } else {
     return (
     <>
        <div className={style.pokeInfoItemsWrapper}>
           <div
              className={`${style.pokeInfoItem} ${style.pokeItem} ${showInfo && style.pokeItemActive}`}>
              <div className={style.pokeImgWrapper}
                   onMouseEnter={() => handleMouse(true)}
                   onMouseLeave={() => handleMouse(false)}>
                 <img alt={pokemon.name}
                      width={ isTablet ? 160 : isDesktopOrLaptop ? 220 : isBigScreen ? 260 : 390}
                      height={ isTablet ? 160 : isDesktopOrLaptop ? 220 : isBigScreen ? 260 : 390}
                      src={`${mouseEnter ? pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny : pokemon.sprites.other.showdown.front_shiny}`} />
              </div>
              <div className={style.pokeName}>
                 <div className={style.pokeIcon} onClick={handleCopy}>
                    <img
                       src={`${copied ? 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Ftick-icon-png%2Ftick-icon-png-10.jpg&f=1&nofb=1&ipt=47dd4719e1f41244643e6af89c63c98a7d877369cfe542afa678add1ce9655fc' : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficons.veryicon.com%2Fpng%2FSystem%2FMono%2520General%25202%2Fcopy.png&f=1&nofb=1&ipt=f087de7c03a1abe3d4db815230e2ded942e01edf18089a702c99b0484dbd5060'}`}
                       alt={'copy_text'}
                       width={20}
                       height={20}
                    />
                 </div>
                 {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ' ' + hasher(pokemon.id)}
              </div>
           </div>
           <div
              className={`${style.pokeInfoItem} ${style.pokeTable} ${showInfo && style.pokeTableActive}`}>
              <PokemonInfoTable pokemon={pokemon} />
           </div>
        </div>
     </>
  )}
}