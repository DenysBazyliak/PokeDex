import React from "react";
import style from "./App.module.css";
import { Header } from "./components/Header/Header";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonInfo from "./components/PokemonInfo/PokemonInfo";
import { Provider } from "react-redux";
import store from "./store/store";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <Provider store={store}>
      <div className={style.app}>
        <Header />
        <PokemonList />
        <PokemonInfo />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
