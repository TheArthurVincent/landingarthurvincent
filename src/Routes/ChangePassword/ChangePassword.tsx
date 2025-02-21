import React, { useState } from "react";
import { primaryColor, secondaryColor } from "../../Styles/Styles";
import {
  InputField,
  LogoSVG,
  backDomain,
} from "../../Resources/UniversalComponents";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import Helmets from "../../Resources/Helmets";
import { HOne } from "../../Resources/Components/RouteBox";
import { NavLink } from "react-router-dom";

export function ChangePassword() {
  const [email, setEmail] = useState<string>("");
  const [button, setButton] = useState<any>("Enviar");

  const handleSendPassword = () => {
    alert("email-enviado");
    window.location.assign("/login");
  };

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
            <form
              onSubmit={handleSendPassword}
              style={{
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                padding: "5rem",
                backgroundColor: "#fff",
                maxWidth: "fit-content",
                margin: "auto",
                borderRadius: "10px",
              }}
              className="box-shadow-white"
            >
              <div style={{ margin: "0 auto" }}>{myLogo}</div>
              <HOne>Altere sua senha</HOne>
              <InputField
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}
                id="name"
                placeholder="E-mail"
                type="text"
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#eee",
                    color: primaryColor(),
                    marginLeft: "auto",
                  }}
                  type="submit"
                >
                  {button}
                </Button>
              </div>
              <NavLink to="/">Voltar ao Login</NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
