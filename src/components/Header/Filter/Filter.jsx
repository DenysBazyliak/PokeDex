import React, { useState } from "react";
import FilterItem from "./FilterItem/FilterItem";
import { useSelector } from "react-redux";
import { fromSetToArray } from "../../../utilities/utility";
import style from "./Filter.module.css";
const Filter = () => {
  let [filterMode, setFilterMode] = useState(false);
  let turnOnFilter = () => {
    setFilterMode(true);
  };
  let turnOffFilter = () => {
    setFilterMode(false);
  };
  let types = fromSetToArray(
    useSelector((state) => state.pokeListReducer.types)
  );
  console.log("types", types);
  let filterItems = types.map((el) => <FilterItem key={el} el={el} />);
  console.log("filterItems", filterItems);
  return filterMode ? (
    <div>
      <div>
        <div className={style.listWrapper}>{filterItems}</div>
      </div>
    </div>
  ) : (
    <button onClick={turnOnFilter}>Filter</button>
  );
};
export default Filter;
