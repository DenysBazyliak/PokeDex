import React from "react";
import style from "./Header.module.css";


export const Header = () => {

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
