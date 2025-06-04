import React, { useState } from "react";
import FilterItem from "./FilterItem/FilterItem";
import { useDispatch, useSelector } from 'react-redux';
import { fromSetToArray } from "../../../utilities/utilities";
import style from "./Filter.module.css";
import { setType } from '../../../store/pokeListReducer';

const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  let dispatch = useDispatch();

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleShowCancel = (value) => {
    value ? setShowCancel(value) : setShowCancel(false);
  };

  const handleSetType = (type) => {
    dispatch(setType(type));
  };

  let types = fromSetToArray(
    useSelector((state) => state.pokeListReducer.types)
  );
  let filterItems = types.map((el) => (
    <FilterItem handleSetType={handleSetType} handleShowFilter={handleShowFilter} handleShowCancel={handleShowCancel} key={el} el={el} />
  ));
  return (
     <>
       <button className={style.filterButton} onClick={() => handleShowFilter()}>
         Filter
       </button>
       {
         showFilter ? (
              <div>
                <div className={style.filterItemWrapper}>
                  {filterItems}
                  {showCancel && <div className={style.cancelButton}>
                    <button onClick={() => {
                      handleSetType(null)
                      handleShowFilter()
                      handleShowCancel(false)
                    }} className={style.filterButton}> Cancel Selection</button>
                  </div>}
                </div>
              </div>
         ) : null
       }
     </>
  )
     ;
};
export default Filter;
