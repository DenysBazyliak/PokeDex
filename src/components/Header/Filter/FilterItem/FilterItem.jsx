import React from "react";
import style from "./FilterItem.module.css";
import { filterPokemonArray, setType } from "../../../../store/pokeListReducer";
import { useDispatch, useSelector } from "react-redux";
const FilterItem = (props) => {
  let dispatch = useDispatch();
  let pokemons = useSelector((state) => state.pokeListReducer.pokemons);
  console.log("props", props);
  return (
    <div className={style.pokeType}>
      <button
        className={style[props.el]}
        onClick={() => {
          props.turnOffFilter();
          dispatch(setType(props.el));
        }}
      >
        {props.el}
      </button>
    </div>
  );
};
export default FilterItem;
