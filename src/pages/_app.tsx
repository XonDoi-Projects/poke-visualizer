import { AppProps } from "next/app";
import { DefaultFonts, GlobalStyle } from "..";
import {
  DarkThemeProvider,
  SizeProvider,
  UserProvider,
} from "@/components/Providers";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import "../../public/output.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.title = "Pokemon PokeDex & Fusion";
  });

  return (
    <>
      <DefaultFonts />
      <GlobalStyle />
      <DarkThemeProvider>
        <SizeProvider>
          <UserProvider>
            <Component {...pageProps} />
            <Analytics />
          </UserProvider>
        </SizeProvider>
      </DarkThemeProvider>
    </>
  );
};

export default MyApp;
