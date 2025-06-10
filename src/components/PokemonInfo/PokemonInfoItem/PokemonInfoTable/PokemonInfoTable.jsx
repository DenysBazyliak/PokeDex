import style from './PokemonInfoTable.module.css';
import React from 'react';

export const PokemonInfoTable = ({pokemon}) => {
  return (
     <table className={style.table}>
        <tbody className={style.tableBody}>
        <tr>
           <th>Height</th>
           <td>{pokemon.height / 10} m</td>
        </tr>
        <tr>
           <th>Weight</th>
           <td>{pokemon.weight / 10} kg</td>
        </tr>
        {pokemon?.stats.map((el) => {
           return (
              <tr key={el.stat.name}>
                 <th>{el.stat.name.charAt(0).toUpperCase() + el.stat.name.slice(1)}</th>
                 <td>{el.base_stat}</td>
              </tr>
           );
        })}
        </tbody>
     </table>
  )
}