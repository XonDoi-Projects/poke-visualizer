import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { getPokemon, PokeDetails } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const total = 1025;

export interface IDataContext {
  loadingState: number;
  setSyncInBackground: (value: boolean) => void;
  syncInBackground: boolean;
}

export const DataContext = createContext<IDataContext | undefined>(undefined);

export interface IDataProviderProps {
  children: ReactNode;
}

export const DataProvider: FunctionComponent<IDataProviderProps> = (props) => {
  const [loadingState, setLoadingState] = useState<number | null>(null);
  const [syncInBackground, setSyncInBackground] = useState(false);

  const getAllPokemon = useCallback(async () => {
    let pokemonList: PokeDetails[] = [];

    for (let i = 0; i < total; i++) {
      const pokemonDetails = await getPokemon(i + 1);

      if (pokemonDetails) {
        pokemonList.push(pokemonDetails);
      }
      setLoadingState(i + 1);
    }

    //update mongodb, use a timestamp to avoid multiple re-syncs
    setSyncInBackground(false);

    return pokemonList;
  }, []);

  useQuery({
    queryKey: ["getPokemon"],
    queryFn: getAllPokemon,
    enabled: syncInBackground && loadingState === 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  return (
    <DataContext.Provider
      value={{
        loadingState: Math.floor(((loadingState || 0) / total) * 100),
        setSyncInBackground,
        syncInBackground,
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
