import React from "react";
import { LogoSVG } from "../../Resources/UniversalComponents";
import { LogoStyle } from "../TopBar/TopBar.Styled";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  mediumGreyColor,
} from "../../Styles/Styles";
export default function AppFooter() {
  const myLogo = LogoSVG(darkGreyColor(), mediumGreyColor(), 1.3);
  return (
    <LogoStyle>
      <footer
        className="footer no-print"
        style={{
          fontSize: "12px",
          backgroundColor: alwaysWhite(),
          color: alwaysBlack(),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "0.5rem",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          zIndex: 9,
        }}
      >
        {myLogo}
        <span>
          This platform is powered by ARVIN ENGLISH SCHOOL © Some rights
          reserved <br />
          Arthur Vincent
          <br />
          +55 11 91585-7807
        </span>
      </footer>
    </LogoStyle>
  );
}
