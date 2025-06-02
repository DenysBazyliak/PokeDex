import React from "react";
import style from "./Footer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadNewPokemons } from "../../store/pokeListReducer";
import { Preloader } from "../../utilities/Preloader/Preloader";
export const Footer = () => {
  const next = useSelector((state) => state.pokeListReducer.next);
  const isLoading = useSelector((state) => state.pokeListReducer.isLoading);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className={style.footer}>
      <div className={style.footerButtonWrapper}>
        <button
          className={style.footerButton}
          disabled={isLoading}
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
