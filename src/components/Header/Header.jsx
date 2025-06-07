import React from "react";
import style from "./Header.module.css";
import Filter from './Filter/Filter';


export const Header = () => {

  return (
     <div className={style.header}>
        <div className={style.headerWrapper}>
           <h1 className={style.h1}>PokeDex</h1>
           <Filter />
        </div>
     </div>
  );
};
