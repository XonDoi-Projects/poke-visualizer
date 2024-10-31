import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
} from "react";

export interface IDataContext {
  total: number;
}

export const DataContext = createContext<IDataContext | undefined>(undefined);

export interface IDataProviderProps {
  children: ReactNode;
}

export const DataProvider: FunctionComponent<IDataProviderProps> = (props) => {
  const getTotal = async () => {
    try {
      const data = await fetch(`/api/get-total`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await data.json();

      if (result) {
        return result;
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const { data } = useQuery<{ total: number }>({
    queryKey: ["getTotal"],
    queryFn: getTotal,
    refetchOnMount: false,
  });

  return (
    <DataContext.Provider value={{ total: data ? data.total : 1025 }}>
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
