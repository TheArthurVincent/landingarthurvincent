import React from "react";
import { LogoSVG } from "../../Resources/UniversalComponents";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  mediumGreyColor,
} from "../../Styles/Styles";

interface AppFooterIn  {
  see:boolean
}
export default function AppFooter({see}:AppFooterIn) {
 
  const myLogo = LogoSVG(darkGreyColor(), mediumGreyColor(), 1.3);
  return (
    <footer
      className="footer no-print"
      style={{
        display: see ? "flex" : "none",
        fontSize: "12px",
        backgroundColor: alwaysWhite(),
        color: alwaysBlack(),
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "0.5rem",
        width: "100%",
      }}
    >
      {myLogo}
      <span>
        This platform is powered by ARVIN ENGLISH SCHOOL © Some rights reserved{" "}
        <br />
        Arthur Vincent
        <br />
        +55 11 91585-7807
      </span>
    </footer>
  );
}
