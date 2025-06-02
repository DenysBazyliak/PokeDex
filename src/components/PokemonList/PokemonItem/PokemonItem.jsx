import React from "react";
import style from "./PokemonItem.module.css";
import { getNewPokemon } from "../../../store/pokeListReducer";
import { useDispatch } from "react-redux";
const PokemonItem = (pokemon) => {
  let dispatch = useDispatch();
  return (
    <div className={style.itemWrapper}>
      <div
        className={style.pokeItem}
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
        {/*<div className={style.pokeWrapper}>*/}
        {/*  /!*${style[el.type.name]}*!/*/}
        {/*  {pokemon.types.map((el) => {*/}
        {/*    return (*/}
        {/*      <div key={el.slot} className={style.pokeType}>*/}
        {/*        {el.type.name}*/}
        {/*      </div>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
export default PokemonItem;
