import React from "react";

export const DefaultFonts = () => {
  const googleFonts = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');
    `;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: googleFonts,
      }}
    />
  );
};
