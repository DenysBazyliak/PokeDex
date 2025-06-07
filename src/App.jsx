// Core
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { ScreenContextProvider } from './context/ScreenContext';

// Styles
import style from "./App.module.css";

// Components
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PokemonList } from "./components/PokemonList/PokemonList";
import { PokemonInfo } from "./components/PokemonInfo/PokemonInfo";


function App() {

  return (
    <Provider store={store}>
       <ScreenContextProvider>
          <div className={style.app}>
             <Header/>
             <PokemonList />
             <PokemonInfo />
             <Footer />
          </div>
       </ScreenContextProvider>
    </Provider>
  );
}

export default App;
