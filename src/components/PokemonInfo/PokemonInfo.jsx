import React, {useState} from "react";
import style from "./PokemonInfo.module.css";
import {useSelector} from "react-redux";
import {findStatName, hasher, reduceArray} from "../../utilities/utilities";

const PokemonInfo = (props) => {
    let pokemon = useSelector((state) => state.pokeListReducer.pokemon);
    const [tableMode, setTableMode] = useState(false);
    let stats = reduceArray(pokemon?.stats);
    // console.log("stats", stats);
    // console.log("pokemon.stats", pokemon?.stats);
    const deactivateTableMode = () => {
        setTableMode(false);
    };
    const activateTableMode = () => {
        setTableMode(true);
    };
    if (!pokemon) {
        return null;
    } else {
        return (
            <div className={style.pokeItemsWrapper}>
                <div className={style.pokeItem}>
                    <div className={style.pokeImg}>
                        <img
                            width={200}
                            height={350}
                            src={pokemon.sprites.other.dream_world.front_default}
                        />
                    </div>
                    <div className={style.pokeName}>
                        {pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1) +
                            " " +
                            hasher(pokemon.id)}
                    </div>
                    <div></div>
                </div>
                {tableMode ? (
                    <div>
                        <button onClick={deactivateTableMode}>Contract</button>
                        <table className={style.table}>
                            <tr>
                                <th>Type</th>
                                <th>
                                    {pokemon.types
                                        .map((el) => {
                                            return el.type.name;
                                        })
                                        .join(", ")}{" "}
                                </th>
                            </tr>
                            <tr>
                                <th>Attack</th>
                                <th>{stats.attack}</th>
                            </tr>
                            <tr>
                                <th>Defense</th>
                                <th>{stats.defense}</th>
                            </tr>
                            <tr>
                                <th>HP</th>
                                <th>{stats.hp}</th>
                            </tr>
                            <tr>
                                <th>SP Attack</th>
                                <th>{stats["special-attack"]}</th>
                            </tr>
                            <tr>
                                <th>SP Defense</th>
                                <th>{stats["special-defense"]}</th>
                            </tr>
                            <tr>
                                <th>Speed</th>
                                <th>{stats.speed}</th>
                            </tr>
                            <tr>
                                <th>Weight</th>
                                <th>{pokemon.weight}</th>
                            </tr>
                            <tr>
                                <th>Total moves</th>
                                <th>{pokemon.moves.length}</th>
                            </tr>
                        </table>
                    </div>
                ) : (
                    <button onClick={activateTableMode}>Show pokemon stats</button>
                )}
            </div>
        );
    }
};
export default PokemonInfo;
