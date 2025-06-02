import React, { useEffect } from "react";
import style from "./PokemonList.module.css";
import PokemonItem from "./PokemonItem/PokemonItem";
import { getPokemonsAPI } from "../../store/pokeListReducer";
import { useDispatch, useSelector } from "react-redux";
import { Preloader } from "../../utilities/Preloader/Preloader";

const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokeListReducer.pokemons);
  const type = useSelector((state) => state.pokeListReducer.type);

  useEffect(() => {
    dispatch(getPokemonsAPI());
  }, []);
  
  let pokemonItems = pokemons
    .filter((el) =>
      type ? el.types.some((el) => el.type.name === type) : true
    )
    .map((p) => <PokemonItem key={p.id} {...p} />);
  if (pokemons.length === 0) {
    return <Preloader />;
  }
  return (
    <div className={style.pokemonList}>
      <div className={style.listWrapper}>{pokemonItems}</div>
    </div>
  );
};
export default PokemonList;
