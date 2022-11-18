import axios from "axios";
const instance = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon'
});
export const pokemonAPI = {
        getPokemonsAPI() {
        return instance
            .get(`?offset=0&limit=12`)
            .then((response) => {
                return response.data;
            });
        },
        getPokemonInfo(url){
            return axios.get(url).then((response) => {
                return response.data;
            });
        },
        getNextPokemonAPI(next){
            return axios.get(next).then((response)=>{
                return response.data
            })
        }

}