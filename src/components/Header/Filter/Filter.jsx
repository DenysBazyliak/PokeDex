import React, { useState } from 'react';
import FilterItem from './FilterItem/FilterItem';
import { useDispatch, useSelector } from 'react-redux';
import { fromSetToArray } from '../../../utilities/utilities';
import style from './Filter.module.css';
import { setType } from '../../../store/pokeListReducer';

const Filter = () => {
   const [showFilter, setShowFilter] = useState(false);
   const [showCancel, setShowCancel] = useState(false);

   let dispatch = useDispatch();

   const handleShowFilter = () => {
      setShowFilter(!showFilter)
   };

   const handleShowCancel = (value) => {
      value ? setShowCancel(value) : setShowCancel(false);
   };

   const handleSetType = (type) => {
      dispatch(setType(type));
   };

   let types = fromSetToArray(
      useSelector((state) => state.pokeListReducer.types),
   );

   let filterItems = types.map((el) => (
      <FilterItem handleSetType={handleSetType} handleShowFilter={handleShowFilter} handleShowCancel={handleShowCancel}
                  key={el} el={el} />
   ));
   return (
      <>
         <img width={30} height={30} alt={'filter'}
              src={'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Ffilter-icon-1.png&f=1&nofb=1&ipt=ca09be8483c51f86aa93557550f9568b67f83dafdbf366eab1b1ceda1bdf31e8'}
              className={style.filterButton} onClick={() => handleShowFilter()} />

         {
            showFilter ? (
               <div
                  className={`${style.filterItemWrapper} ${showFilter && style.filterItemWrapperShow}`}>
                  {filterItems}
                  {showCancel && <div className={style.cancelButton}>
                     <button onClick={() => {
                        handleShowFilter();
                        handleSetType(null);
                        handleShowCancel(false);
                     }} className={style.filterButton}> Cancel Selection
                     </button>
                  </div>}
               </div>
            ) : null
         }
      </>
   )
      ;
};
export default Filter;
