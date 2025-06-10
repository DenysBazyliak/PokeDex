import React from "react";
import style from "./Preloader.module.css";
import pokemonIcon from "./Icon/pokemon-icon.png";

export const Preloader = () => {
  return (
    <div className={style.dimmingDiv}>
      <img className={style.icon} src={pokemonIcon} alt="3333" />
    </div>
  );
};
