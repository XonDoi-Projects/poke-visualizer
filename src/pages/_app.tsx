import { AppProps } from "next/app";
import { DefaultFonts, GlobalStyle } from "..";
import {
  DarkThemeProvider,
  SizeProvider,
  UserProvider,
} from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import "../../public/output.css";
import { DataProvider } from "@/components/Providers/DataProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultFonts />
      <GlobalStyle />
      <DarkThemeProvider>
        <SizeProvider>
          <UserProvider>
            <DataProvider>
              <Component {...pageProps} />
            </DataProvider>
            <Analytics />
          </UserProvider>
        </SizeProvider>
      </DarkThemeProvider>
    </>
  );
};

export default MyApp;
