import React, { useState } from "react";
import { primaryColor, secondaryColor } from "../../Styles/Styles";
import {
  InputField,
  LogoSVG,
  backDomain,
} from "../../Resources/UniversalComponents";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { Alert, Button, CircularProgress } from "@mui/material";
import Helmets from "../../Resources/Helmets";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fail, setFail] = useState<boolean>(false);
  const [button, setButton] = useState<any>("Entrar");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFail(false);

    setButton(<CircularProgress style={{ color: secondaryColor() }} />);
    try {
      const response = await axios.post(`${backDomain}/api/v1/studentlogin/`, {
        email,
        password,
      });
      const { token, loggedIn } = response.data;
      localStorage.removeItem("authorization");
      localStorage.removeItem("loggedIn");

      if (localStorage.getItem("authorization")) {
        localStorage.removeItem("authorization");
      }

      if (localStorage.getItem("loggedIn")) {
        localStorage.removeItem("loggedIn");
      }

      localStorage.setItem("authorization", `${token}`);
      localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
      setButton("Sucesso");
      window.location.assign("/");
    } catch (error) {
      setFail(true);
      setButton("Entrar");
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
            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                padding: "5rem",
                backgroundColor: "#fff",
                maxWidth: "fit-content",
                margin: "auto",
                boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div style={{ margin: "0 auto" }}>{myLogo}</div>
              <InputField
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}
                id="name"
                placeholder="E-mail"
                type="text"
              />
              <InputField
                value={password}
                onChange={(event: any) => setPassword(event.target.value)}
                id="password"
                placeholder="Senha"
                type={passwordVisible ? "text" : "password"}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  onClick={handlePasswordVisible}
                  style={{
                    fontSize: "1.2rem",
                    display: "block",
                    cursor: "pointer",
                  }}
                >
                  {passwordVisible ? (
                    <i
                      style={{
                        fontSize: "1.2rem",
                        display: "block",
                        cursor: "pointer",
                      }}
                      className="fa fa-eye-slash"
                    />
                  ) : (
                    <i
                      style={{
                        fontSize: "1.2rem",
                        display: "block",
                        cursor: "pointer",
                      }}
                      className="fa fa-eye"
                    />
                  )}
                </p>
                <Button
                  style={{
                    backgroundColor: "#eee",
                    color: primaryColor(),
                  }}
                  type="submit"
                >
                  {button}
                </Button>
              </div>
            </form>
            <Alert
              style={{
                maxWidth: "20rem",
                margin: "auto",
                display: fail ? "block" : "none",
              }}
              severity="error"
            >
              Credenciais inválidas!
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
