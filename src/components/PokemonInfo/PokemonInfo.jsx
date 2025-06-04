import React, { useEffect, useState } from 'react';
import style from './PokemonInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { hasher } from '../../utilities/utilities';
import { getNewPokemon } from '../../store/pokeListReducer';


const PokemonInfo = () => {
   const [mouseEnter, setMouseEnter] = useState(false);
   const [copied, setCopied] = useState(false);
   const [showInfo, setShowInfo] = useState(false);
   const pokemon = useSelector((state) => state.pokeListReducer.pokemon);

   let dispatch = useDispatch();

   useEffect(() => {
      if (pokemon) setShowInfo(true);
   }, [pokemon]);

   const handleSetNull = () => {
      setShowInfo(false);
      setTimeout(() => {
         dispatch(getNewPokemon(null));
      }, 300);
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
                 className={style.dimmingDiv}>
            </div>

            <div className={style.pokeInfoItemsWrapper}>
               <div className={`${style.pokeInfoItem} ${style.pokeItem} ${showInfo && style.pokeItemActive}`}>
                  <div className={style.pokeImg} onMouseEnter={() => setMouseEnter(true)}
                       onMouseLeave={() => setMouseEnter(false)}>
                     <img alt={pokemon.name} width={220} height={220}
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
                    <table className={style.table}>
                        <tbody className={style.tableBody}>
                        <tr>
                            <th>Height</th>
                            <td>{pokemon.height / 10} m</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>{pokemon.weight / 10} kg</td>
                        </tr>
                        {pokemon.stats.map((el) => {
                            return (
                               <tr key={el.stat.name}>
                               <th>{el.stat.name.charAt(0).toUpperCase() + el.stat.name.slice(1)}</th>
                              <td>{el.base_stat}</td>
                           </tr>
                        );
                     })}
                     </tbody>
                  </table>
               </div>
            </div>
         </>

      );
   }
};
export default PokemonInfo;
