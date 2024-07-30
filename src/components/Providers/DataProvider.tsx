import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkPokemonData,
  getPokemon,
  PokeDetails,
  setPokemonData,
} from "@/utils";

export const total = 1025;

export interface IDataContext {
  loadingState: number;
  isCached: boolean;
}

export const DataContext = createContext<IDataContext | undefined>(undefined);

export interface IDataProviderProps {
  children: ReactNode;
}

export const DataProvider: FunctionComponent<IDataProviderProps> = (props) => {
  const [loadingState, setLoadingState] = useState(0);
  const [isCached, setIsCached] = useState(false);

  const getAllPokemon = useCallback(async () => {
    let pokemonList: PokeDetails[] = [];

    for (let i = 0; i < total; i++) {
      const pokemonDetails = await getPokemon(i + 1);

      if (pokemonDetails) {
        pokemonList.push(pokemonDetails);
      }
      setLoadingState(i + 1);
    }

    setPokemonData(pokemonList);
  }, []);

  useEffect(() => {
    if (!checkPokemonData()) {
      getAllPokemon();
    } else {
      setIsCached(true);
    }
  }, [getAllPokemon]);

  return (
    <DataContext.Provider
      value={{
        loadingState: Math.floor((loadingState / total) * 100),
        isCached,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);

  if (!ctx) {
    throw new Error("Data context not found! Check your AppProvider");
  }

  return ctx;
};