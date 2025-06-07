import React, { useEffect } from "react";
import style from "./PokemonList.module.css";
import PokemonItem from "./PokemonItem/PokemonItem";
import { getPokemonAPI, getPokemonTypeAPI } from '../../store/pokeListReducer';
import { useDispatch, useSelector } from "react-redux";
import { Preloader } from "../../utilities/Preloader/Preloader";

export const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokeListReducer.pokemons);
  const type = useSelector((state) => state.pokeListReducer.type);

  useEffect(() => {
    dispatch(getPokemonAPI());
    dispatch(getPokemonTypeAPI());
  }, []);
  
  let pokemonItems = pokemons
    .filter((el) =>
      type ? el.types.some((el) => el.type.name === type) : true
    )
    .map((p) => <PokemonItem key={p.name} {...p} />);
  if (pokemons.length === 0) {
    //this need to be fixed asap
    return <Preloader />;
  }
  return (
    <div className={style.pokeList}>
      <div className={style.pokeListWrapper}>{pokemonItems}</div>
    </div>
  );
};
