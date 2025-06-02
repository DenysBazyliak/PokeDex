import React, { useState } from 'react';
import style from './PokemonItem.module.css';
import { getNewPokemon } from '../../../store/pokeListReducer';
import { useDispatch } from 'react-redux';

const PokemonType = ({ key, name }) => {
  return (
    <>
      <div key={key} className={style.pokeType}>
        {name}
      </div>
    </>
  );
};

const PokemonItem = (pokemon) => {

  let i = 1;

  const typesLength = pokemon.types.length;

  const [showType, setShowType] = useState(false);

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
        <div className={style.pokeImg}>
          <img
            alt={pokemon.name}
            width={120}
            height={120}
            src={pokemon.sprites.other.dream_world.front_default}
          />
        </div>
        <div className={style.pokeName}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </div>
      </div>
      <div className={style.pokeTypeWrapper}>
        {pokemon.types.map((el) => {
          if (i < typesLength) {
            i++;
            return (
              <>
                <PokemonType key={el.slot} name={el.type.name} />
                <div className={style.separator} />
              </>
            );
          } else {
            return <PokemonType key={el.slot} name={el.type.name} />;
          }
        })}
      </div>
    </div>
  );
};

export default PokemonItem;
