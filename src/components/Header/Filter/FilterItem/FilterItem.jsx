import React from "react";
import style from "./FilterItem.module.css";
const FilterItem = (props) => {
  console.log("props", props);
  return (
    <div>
      <button className={style[props.el]}>{props.el}</button>
    </div>
  );
};
export default FilterItem;
