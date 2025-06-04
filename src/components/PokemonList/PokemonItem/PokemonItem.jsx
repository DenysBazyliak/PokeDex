import React, { useState } from 'react';
import style from './PokemonItem.module.css';
import { getNewPokemon } from '../../../store/pokeListReducer';
import { useDispatch, useSelector } from 'react-redux';

const PokemonType = ({ name, icon }) => {
   return (
         <div className={style.pokeType}>
            <img
               alt={name}
               width={55}
               height={20}
               src={icon}
            />
         </div>
   );
};

const PokemonItem = (pokemon) => {

   let i = 1;

   const typesLength = pokemon.types.length;

   const [showType, setShowType] = useState(false);

   const pokemonTypeIcons = useSelector((state) => state.pokeListReducer.typeIcons);

   let dispatch = useDispatch();
   return (
      <div className={style.pokeItemWrapper}>
         <div
            className={style.pokeItem}
            onMouseEnter={() => {
               setShowType(true);
            }}
            onMouseLeave={() => {
               setShowType(false);
            }}
            onClick={() => {
               dispatch(getNewPokemon(pokemon));
            }}
         >
            <div>
               <img
                  alt={pokemon.name}
                  width={120}
                  height={120}
                  src={pokemon.sprites.other['official-artwork'].front_default}
               />
            </div>
            <div className={style.pokeName}>
               {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </div>
         </div>
         <div className={`${style.pokeTypeWrapper} ${showType && style.pokeTypeWrapperShow}`}>
            {pokemon.types.map((el, index) => {
               let icon = pokemonTypeIcons?.get(el.type.name);
               if (i < typesLength) {
                  i++;
                  return (
                     <React.Fragment key={el.type.name + index}>
                        <PokemonType name={el.type.name} icon={icon} />
                        <div className={style.separator} />
                     </React.Fragment>
                  );
               } else {
                  return <PokemonType key={el.type.name - index} name={el.type.name} icon={icon} />;
               }
            })}
         </div>
      </div>
   );
};

export default PokemonItem;
