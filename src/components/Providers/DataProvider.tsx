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
import { json } from "stream/consumers";

export const total = 1025;

export interface IDataContext {
  loadingState: number;
  isLocallyLoaded: boolean;
  setSyncInBackground: (value: boolean) => void;
  syncInBackground: boolean;
  isRecentlyUpdated: boolean;
  isCheckingData: boolean;
  isBeingUpdated: boolean;
}

export const DataContext = createContext<IDataContext | undefined>(undefined);

export interface IDataProviderProps {
  children: ReactNode;
}

export const DataProvider: FunctionComponent<IDataProviderProps> = (props) => {
  const [loadingState, setLoadingState] = useState(0);
  const [syncInBackground, setSyncInBackground] = useState(false);
  const [isRecentlyUpdated, setIsRecentlyUpdated] = useState(false);
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);

  const getLastUpdate = async () => {
    try {
      const data = await fetch(`/api/get-last-update`);

      const jsonData = await data.json();

      if (jsonData) {
        setIsBeingUpdated(true);
      } else {
        setIsBeingUpdated(false);
      }

      return jsonData;
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const { isLoading: isLoadingCheck } = useQuery({
    queryKey: ["getLastUpdate"],
    queryFn: getLastUpdate,
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const getLastUpdateElapsed = async () => {
    try {
      const data = await fetch(`/api/get-last-update-elapsed`);

      const jsonData = await data.json();

      if (jsonData) {
        setIsRecentlyUpdated(true);
      } else {
        setIsRecentlyUpdated(false);
      }

      return jsonData;
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const { isLoading: isLoadingCheckElapsed } = useQuery({
    queryKey: ["getLastUpdateElapsed"],
    queryFn: getLastUpdateElapsed,
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const getAllPokemon = async () => {
    let pokemonList: PokeDetails[] = [];

    try {
      await fetch(`/api/update-last-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBeingUpdated: true }),
      });
    } catch (e: any) {
      console.log(e.message);
    }

    for (let i = 0; i < total; i++) {
      const pokemonDetails = await getPokemon(i + 1);

      if (pokemonDetails) {
        pokemonList.push(pokemonDetails);
      }

      try {
        const result = await fetch(
          `/api/pokemon/refresh?index=${pokemonDetails.index}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pokemon: { ...pokemonDetails } }),
          }
        );

        const jsonResult = await result.json();

        if (jsonResult) {
          setLoadingState(i + 1);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    }
    setSyncInBackground(false);

    try {
      const result = await fetch(`/api/update-last-update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedOn: true, isBeingUpdated: false }),
      });

      const jsonResult = await result.json();

      if (jsonResult) {
        setIsRecentlyUpdated(true);
      }
    } catch (e: any) {
      console.log(e.message);
    }

    return pokemonList;
  };

  useQuery({
    queryKey: ["getPokemon", syncInBackground],
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
        isLocallyLoaded:
          Math.floor(((loadingState || 0) / total) * 100) === 100,
        setSyncInBackground,
        syncInBackground,
        isRecentlyUpdated,
        isCheckingData: isLoadingCheck || isLoadingCheckElapsed,
        isBeingUpdated,
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
