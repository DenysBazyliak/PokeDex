import React, { useEffect } from "react";
import style from "./PokemonList.module.css";
import PokemonItem from "./PokemonItem/PokemonItem";
import pokeListReducer, {
  getPokemonsAPI,
  loadNewPokemons,
  loadPokemons,
  setNextUrl,
} from "../../store/pokeListReducer";
import { useDispatch, useSelector } from "react-redux";
const PokemonList = (props) => {
  const dispatch = useDispatch();
  const pokipoki = useSelector((state) => state.pokeListReducer.pokemons);
  const next = useSelector((state) => state.pokeListReducer.next);
  // console.log("next",next)
  // console.log("pokipoki",pokipoki)
  useEffect(() => {
    dispatch(getPokemonsAPI());
  }, []);
  let pokemonItems = pokipoki.map((p) => <PokemonItem key={p.id} {...p} />);
  return (
    <div>
      <div>
        <div className={style.listWrapper}>{pokemonItems}</div>
      </div>
      <div className={style.superButtonWrapper}>
        <button
          className={style.superButton}
          onClick={() => {
            return dispatch(loadNewPokemons(next));
          }}
        >
          Load Pokemons
        </button>
      </div>
    </div>
  );
};
export default PokemonList;
