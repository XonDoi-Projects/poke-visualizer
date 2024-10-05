import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, FunctionComponent, ReactNode } from "react";
import { DataProvider } from "./DataProvider";

const queryClient = new QueryClient();

export const QueryContext = createContext(undefined);

export interface IQueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: FunctionComponent<IQueryProviderProps> = (
  props
) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>{props.children}</DataProvider>
    </QueryClientProvider>
  );
};
