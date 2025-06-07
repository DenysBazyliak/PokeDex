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
               width={props.isPhone ? 60 : props.isTablet ? 65 : props.isDesktopOrLaptop ? 70 : props.isBigScreen ? 85 : 100}
               height={props.isPhone ? 26 : props.isTablet ? 30 : props.isDesktopOrLaptop ? 35 : props.isBigScreen ? 40 : 45}
               src={pokemonTypeIcons?.get(props.el)}
            />
         </div>

      </>
   );
};
export default FilterItem;
