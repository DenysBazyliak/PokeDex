import React from 'react';
import style from './FilterItem.module.css';
import { useSelector } from 'react-redux';

const FilterItem = (props) => {
   const pokemonTypeIcons = useSelector((state) => state.pokeListReducer.typeIcons);
   return (
      <>
         <div className={style.pokeType} onClick={() => {
            props.handleShowFilter();
            props.handleShowCancel(true);
            props.handleSetType(props.el);

         }}>
            <img
               alt={props.el}
               width={75}
               height={35}
               src={pokemonTypeIcons?.get(props.el)}
            />
         </div>

      </>
   );
};
export default FilterItem;
