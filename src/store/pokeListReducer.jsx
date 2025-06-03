import {pokemonAPI} from "../API/api";

const SET_POKEMONS = "SET_POKEMONS";
const SET_TYPE = "SET_TYPE";
const IS_LOADING = "IS_LOADING";
const FILTER_POKEMONS = "FILTER_POKEMONS";
const SET_NEXT_URL = "SET_NEXT_URL";
const ADD_POKEMONS = "ADD_POKEMONS";
const ADD_POKEMON_TYPES = "ADD_POKEMON_TYPES";
const SET_NEW_POKEMON = "SET_NEW_POKEMON";
const ADD_POKEMON_TYPE_ICONS = "ADD_POKEMON_TYPE_ICONS";

let initialState = {
    pokemons: [],
    pokemon: null,
    next: null,
    types: new Set(),
    typeIcons: null,
    type: null,
    isLoading: false,
};

export const setPokemons = (pokemons) => {
    return {
        type: SET_POKEMONS,
        pokemons,
    };
};
const buttonSwitch = (isLoading) => {
    return {
        type: IS_LOADING,
        isLoading,
    };
};
export const setType = (currentType) => {
    return {
        type: SET_TYPE,
        currentType,
    };
};
export const setTypeIcons = (typeIcons) => {
    return {
        type: ADD_POKEMON_TYPE_ICONS,
        typeIcons,
    };
};
export const filterPokemons = (pokemons) => {
    return {
        type: FILTER_POKEMONS,
        pokemons,
    };
};
export const addPokemons = (pokemons) => {
    return {
        type: ADD_POKEMONS,
        pokemons,
    };
};
export const addPokemonTypes = (types) => {
    return {
        type: ADD_POKEMON_TYPES,
        types,
    };
};
export const setNextUrl = (next) => {
    return {
        type: SET_NEXT_URL,
        next,
    };
};
export const setNewPokemon = (pokemon) => {
    return {
        type: SET_NEW_POKEMON,
        pokemon,
    };
};
const pokeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMONS:
            return {
                ...state,
                pokemons: action.pokemons,
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case SET_TYPE:
            return {
                ...state,
                type: action.currentType,
            };
        case FILTER_POKEMONS:
            return {
                ...state,
                pokemons: [...action.pokemons],
            };
        case SET_NEW_POKEMON:
            return {
                ...state,
                pokemon: action.pokemon,
            };
        case ADD_POKEMONS:
            return {
                ...state,
                pokemons: [...state.pokemons, ...action.pokemons],
            };
        case ADD_POKEMON_TYPES:
            return {
                ...state,
                types: new Set([...state.types, ...action.types]),
            };
        case ADD_POKEMON_TYPE_ICONS:
            return {
                ...state,
                typeIcons: new Map(action.typeIcons),
            };
        case SET_NEXT_URL:
            return {
                ...state,
                next: action.next,
            };
        default:
            return state;
    }
};
export const filterPokemonArray = (pokemons, type) => (dispatch) => {
    let filteredPokemons = pokemons.filter(
        (el) => el.types[0].type.name === type
    );
    dispatch(filterPokemons(filteredPokemons));
};

let typeSpreading = (pokemons) => (dispatch) => {
    let typesArray =
        pokemons?.map((el) => {
            return el.types;
        }) || [];
    let types = typesArray
        .map((el) => {
            return el.map((el) => {
                return el.type.name;
            });
        })
        .flat();
    dispatch(addPokemonTypes(types));
};
let setPokemonTypeAPI =  (typeData) => async (dispatch) => {
    let typeIcons = new Map();
    let array = [];
    let pokemonData = await Promise.all(
       typeData.results.map((el) => {
           return pokemonAPI.getPokemonInfo(el.url);
       })
    );
    let icons = pokemonData.map((el)=>{
        return el.sprites?.["generation-ix"]["scarlet-violet"].name_icon
    })
    for (let i = 0; i < icons.length; i++) {
       array.push({
           name: typeData.results[i].name,
           url: icons[i],
       })
    }
    if(array){
       array.map((el) => {
            return typeIcons.set(el.name, el.url);
        })
    } else{
        return null
    }
    return dispatch(setTypeIcons(typeIcons));
};
export const getPokemonAPI = () => async (dispatch) => {
    let data = await pokemonAPI.getPokemonsAPI();
    dispatch(setNextUrl(data.next));
    let pokemonData = await Promise.all(
        data.results.map((el) => {
            return pokemonAPI.getPokemonInfo(el.url);
        })
    );
    dispatch(typeSpreading(pokemonData));
    dispatch(setPokemons(pokemonData));
};

export const getPokemonTypeAPI = () => async (dispatch) => {
    let typeData = await pokemonAPI.getPokemonTypeAPI();
    dispatch(setPokemonTypeAPI(typeData));
};
export const getNewPokemon = (pokemon) => {
    return setNewPokemon(pokemon);
};

export const loadNewPokemons = (next) => async (dispatch) => {
    dispatch(buttonSwitch(true));

    let nextPokemonData = await pokemonAPI.getNextPokemonAPI(next);
    dispatch(setNextUrl(nextPokemonData.next));
    let nextPokemonInfo = await Promise.all(
        nextPokemonData.results.map((el) => {
            return pokemonAPI.getPokemonInfo(el.url);
        })
    );
    dispatch(typeSpreading(nextPokemonInfo));
    dispatch(addPokemons(nextPokemonInfo));
    dispatch(buttonSwitch(false));
};
export default pokeListReducer;
