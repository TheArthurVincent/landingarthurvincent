import React, { useState } from "react";
import { primaryColor, secondaryColor } from "../../Styles/Styles";
import {
  LogoSVG,
} from "../../Resources/UniversalComponents";
import "font-awesome/css/font-awesome.min.css";
import Helmets from "../../Resources/Helmets";
import { HOne } from "../../Resources/Components/RouteBox";
import { NavLink } from "react-router-dom";

export function ChangePasswordSendEmail() {
  const [email, setEmail] = useState<string>("");
  const [button, setButton] = useState<any>("Enviar");

  const handleSendPassword = () => {};

  const myLogo = LogoSVG(primaryColor(), secondaryColor(), 2.5);

  return (
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmets text={"Login"} />
      <div style={{ width: "100vw" }}>
        <div style={{ margin: "auto" }}>
          <div style={{ alignItems: "center", display: "grid" }}>
            <HOne>E-mail Enviado</HOne>
            <NavLink to="/">Voltar ao Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordSendEmail;
