import React from "react";

export const GlobalStyle = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
            body {
                overflow: hidden;
                overscroll-behavior: none;
                margin: 0px;
                padding: 0px;
            }
        `,
    }}
  />
);
