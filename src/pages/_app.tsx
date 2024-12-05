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
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="keywords"
          property="og:keywords"
          content="Pokemon, PokePlan, Team Builder, Team Planner, PokeDex, Pokemon Stats, Shiny, Mega, GMAX"
        />
        <meta
          name="og:title"
          property="og:title"
          content="PokePlan - PokeDex and Team Planner"
        />
        <meta
          name="og:description"
          property="og:description"
          content="A website where you can view the different pokemon, forms, variants, shiny colors and more. You may also compare stats and plan your team!"
        />
        <meta name="og:site_name" property="og:site_name" content="PokePlan" />
        <meta name="og:type" property="og:type" content="Website" />
        <meta
          name="og:url"
          property="og:url"
          content="https://www.pokeplan.com"
        />
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
