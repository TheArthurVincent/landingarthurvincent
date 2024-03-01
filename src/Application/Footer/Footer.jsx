import React from "react";
import { LogoSVG } from "../../Resources/UniversalComponents";
import { LogoStyle } from "../TopBar/TopBar.Styled";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  mediumGreyColor,
} from "../../Styles/Styles";
export default function Footer() {
  const myLogo = LogoSVG(darkGreyColor(), mediumGreyColor(), 1.3);

  return (
    <footer
      style={{
        bottom: "0vh",
        fontSize: "12px",
        alignItems: "center",
        backgroundColor: alwaysWhite(),
        color: alwaysBlack(),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: "1rem",
        padding: "0.5rem",
      }}
    >
      <LogoStyle>{myLogo}</LogoStyle>
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
