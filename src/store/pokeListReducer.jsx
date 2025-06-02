import { pokemonAPI } from "../API/api";

const SET_POKEMONS = "SET_POKEMONS";
const SET_TYPE = "SET_TYPE";
const IS_LOADING = "IS_LOADING";
const FILTER_POKEMONS = "FILTER_POKEMONS";
const SET_NEXT_URL = "SET_NEXT_URL";
const ADD_POKEMONS = "ADD_POKEMONS";
const ADD_POKEMON_TYPES = "ADD_POKEMON_TYPES";
const SET_NEW_POKEMON = "SET_NEW_POKEMON";
let initialState = {
  pokemons: [],
  pokemon: null,
  next: null,
  types: new Set(),
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
  console.log("filteredPokemons", filteredPokemons);
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
  // let set = new Set(types);
  // let allTypes = Array.from(set);
  dispatch(addPokemonTypes(types));
};
export const getPokemonsAPI = () => async (dispatch) => {
  let data = await pokemonAPI.getPokemonsAPI();
  dispatch(setNextUrl(data.next));
  let pokemonsData = await Promise.all(
    data.results.map((el) => {
      return pokemonAPI.getPokemonInfo(el.url);
    })
  );
  dispatch(typeSpreading(pokemonsData));
  dispatch(setPokemons(pokemonsData));
};
export const getNewPokemon = (pokemon) => {
  return setNewPokemon(pokemon);
};

export const loadNewPokemons = (next) => async (dispatch) => {
  dispatch(buttonSwitch(true));

  let nextPokemonsData = await pokemonAPI.getNextPokemonAPI(next);
  dispatch(setNextUrl(nextPokemonsData.next));
  let nextPokemonsInfo = await Promise.all(
    nextPokemonsData.results.map((el) => {
      return pokemonAPI.getPokemonInfo(el.url);
    })
  );
  dispatch(typeSpreading(nextPokemonsInfo));
  dispatch(addPokemons(nextPokemonsInfo));
  dispatch(buttonSwitch(false));
};
export default pokeListReducer;
