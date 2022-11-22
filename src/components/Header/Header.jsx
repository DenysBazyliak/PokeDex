import React, { useEffect } from "react";
import style from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";

import Filter from "./Filter/Filter";

export const Header = (props) => {
  // console.log("types", types);
  return (
    <div className={style.header}>
      <h1>
        <div>
          <span>
            <Filter />
            <p className={style.p}>Pokedex</p>
          </span>
        </div>
      </h1>
    </div>
  );
};
