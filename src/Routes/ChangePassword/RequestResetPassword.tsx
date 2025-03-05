import React, { useState } from "react";
import { primaryColor, secondaryColor } from "../../Styles/Styles";
import {
  InputField,
  LogoSVG,
  backDomain,
} from "../../Resources/UniversalComponents";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { Button } from "@mui/material";
import Helmets from "../../Resources/Helmets";
import { HOne } from "../../Resources/Components/RouteBox";
import { NavLink } from "react-router-dom";

function RequestResetPassword() {
  const [email, setEmail] = useState<string>("");

  const handleSendPassword = async () => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/resetpassword/${email}`
      );
      alert("Verifique seu email");
      window.location.assign("/login");
    } catch (error: any) {
      window.alert(error.response.data.message);
      console.log(error.response.data.message);
      setEmail("");
    }
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
            <div
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
                  onClick={handleSendPassword}
                  disabled={email == "" ? true : false}
                  style={{
                    backgroundColor: "#eee",
                    color: primaryColor(),
                    marginLeft: "auto",
                  }}
                >
                  Enviar{" "}
                </Button>
              </div>
              <NavLink to="/">Voltar ao Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestResetPassword;
