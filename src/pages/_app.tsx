import { AppProps } from "next/app";
import { DefaultFonts, GlobalStyle } from "..";
import {
  DarkThemeProvider,
  SizeProvider,
  UserProvider,
} from "@/components/Providers";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.title = "Nathan M Portfolio";
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
