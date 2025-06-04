import React, { useEffect, useState } from 'react';
import style from "./PokemonInfo.module.css";
import { useDispatch, useSelector } from 'react-redux';
import {hasher} from "../../utilities/utilities";
import { getNewPokemon } from '../../store/pokeListReducer';

const PokemonInfo = () => {
    const [mouseEnter, setMouseEnter] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const pokemon = useSelector((state) => state.pokeListReducer.pokemon);

    let dispatch = useDispatch();

    useEffect(() => {
        if (pokemon)setShowInfo(true);
    }, [pokemon]);

    const handleClick = () => {
        setShowInfo(false); // triggers CSS transition
        setTimeout(() => {
            dispatch(getNewPokemon(null));
        }, 300); // match your CSS transition duration
    };

    if (!pokemon) {
        return null;
    } else {
        return (
           <div onClick={() => handleClick()}
                className={style.dimmingDiv}>
               <div  className={style.pokeInfoItemsWrapper}>
                   <div  className={`${style.pokeInfoItem} ${style.pokeItem} ${showInfo && style.pokeItemActive}`}>
                       <div className={style.pokeImg} onMouseEnter={() => setMouseEnter(true)}
                            onMouseLeave={() => setMouseEnter(false)}>
                           <img alt={pokemon.name} width={220} height={220}
                                src={`${mouseEnter ? pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny : pokemon.sprites.other.showdown.front_shiny}`} />
                       </div>
                       <div className={style.pokeName}>
                           {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + " " + hasher(pokemon.id)}
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
                                   <td>{pokemon.weight /10} kg</td>
                               </tr>
                               {pokemon.stats.map((el) => {
                                   return (
                                       <tr key={ el.stat.name}>
                                           <th>{el.stat.name.charAt(0).toUpperCase() + el.stat.name.slice(1)}</th>
                                           <td>{el.base_stat}</td>
                                       </tr>
                                   );
                               })}
                               </tbody>
                           </table>
                   </div>

               </div>
           </div>
        );
    }
};
export default PokemonInfo;
