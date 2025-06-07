import React, { useState } from 'react';
import FilterItem from './FilterItem/FilterItem';
import { useDispatch, useSelector } from 'react-redux';
import { fromSetToArray } from '../../../utilities/utilities';
import style from './Filter.module.css';
import { setType } from '../../../store/pokeListReducer';
import { useScreenContextProvider } from '../../../context/ScreenContext';

const Filter = () => {
   const { isPhone, isTablet, isDesktopOrLaptop, isBigScreen } = useScreenContextProvider()
   const [showFilter, setShowFilter] = useState(false);
   const [showCancel, setShowCancel] = useState(false);

   const dispatch = useDispatch();

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
      <FilterItem isPhone={isPhone} isTable={isTablet} isDesktopOrLaptop={isDesktopOrLaptop} isBigScreen={isBigScreen} handleSetType={handleSetType} handleShowFilter={handleShowFilter} handleShowCancel={handleShowCancel}
                  key={el} el={el} />
   ));
   return (
      <>
         <img width={isPhone ? 16 : isTablet ? 18 : isDesktopOrLaptop ? 20 : isBigScreen ? 25 : 30} height={isPhone ? 16 : isTablet ? 18 : isDesktopOrLaptop ? 20 : isBigScreen ? 25 : 30}
              src={'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Ffilter-icon-1.png&f=1&nofb=1&ipt=ca09be8483c51f86aa93557550f9568b67f83dafdbf366eab1b1ceda1bdf31e8'}
              alt={'filter'}
              className={style.filterButton} onClick={() => handleShowFilter()} />

         {
            showFilter ? (
               <div
                  className={`${style.filterItemWrapper} ${showFilter && style.filterItemWrapperShow}`}>
                  {filterItems}
                  {showCancel && <div className={style.cancelButtonWrapper}>
                     <button onClick={() => {
                        handleShowFilter();
                        handleSetType(null);
                        handleShowCancel(false);
                     }} className={`${style.filterButton} ${style.cancelButton}`}> CANCEL SELECTION
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
