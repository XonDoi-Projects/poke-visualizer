import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getPokemon, PokeDetails } from "@/utils";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { checkPokemonData, setPokemonData } from "../Storage/pokemonStorage";

export const total = 1025;

export interface IDataContext {
  loadingState: number;
  isCached?: boolean;
}

export const DataContext = createContext<IDataContext | undefined>(undefined);

export interface IDataProviderProps {
  children: ReactNode;
}

export const DataProvider: FunctionComponent<IDataProviderProps> = (props) => {
  const [loadingState, setLoadingState] = useState(0);
  const [isCached, setIsCached] = useState<boolean>();

  const router = useRouter();

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

  const query = useQuery({
    queryKey: ["getPokemon"],
    queryFn: getAllPokemon,
    enabled: isCached === false && loadingState === 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const checkCache = useCallback(async () => {
    if (!(await checkPokemonData())) {
      setIsCached(false);
    } else {
      setIsCached(true);
    }
  }, []);

  useEffect(() => {
    const doMagic = () => {
      checkCache();
    };

    router.events.on("routeChangeStart", doMagic);

    return () => {
      router.events.off("routeChangeStart", doMagic);
    };
  }, [checkCache, router.events]);

  useEffect(() => {
    checkCache();
  }, [checkCache]);

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
