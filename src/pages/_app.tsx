import { AppProps } from "next/app";
import { DefaultFonts, GlobalStyle } from "..";
import {
  DarkThemeProvider,
  QueryProvider,
  SizeProvider,
  UserProvider,
} from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import "../../public/output.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        {/* Global Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A website where you can view the different pokemon and their forms, compare stats and plan you team."
        />
        <meta
          name="keywords"
          content="Pokemon, PokePlan, Team Builder, Team Planner, PokeDex, Pokemon Stats, Shiny, Mega, GMAX"
        />
        <meta
          property="og:title"
          content="PokePlan - PokeDex and Team Planner"
        />
        <meta
          property="og:description"
          content="A website where you can view the different pokemon, forms, and variants. You may also compare stats and plan you team."
        />
        <meta property="og:site_name" content="PokePlan" />
        <meta property="og:type" content="Website" />
        <meta property="og:url" content="https://poke-plan.vercel.app" />
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/PokePlan_Icon.png" />
      </Head>
      <DefaultFonts />
      <GlobalStyle />
      <DarkThemeProvider>
        <SizeProvider>
          <UserProvider>
            <QueryProvider>
              <Component {...pageProps} />
            </QueryProvider>
            <Analytics />
          </UserProvider>
        </SizeProvider>
      </DarkThemeProvider>
    </>
  );
};

export default MyApp;
