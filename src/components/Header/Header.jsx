import React, { useEffect } from "react";
import style from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";

import Filter from "./Filter/Filter";

export const Header = (props) => {
  // console.log("types", types);
  return (
    <div className={style.header}>
      <h1 className={style.h1}>PokeDex</h1>

      {/*<span className={style.image}>*/}
      {/*  <div>*/}
      {/*    <p className={style.p}>Poki-Poki</p>*/}
      {/*    <div className={style.filter}>*/}
      {/*      <Filter />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</span>*/}
    </div>
  );
};
