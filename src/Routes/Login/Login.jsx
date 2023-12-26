import React, { useState } from "react";
import {
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import {
  InputField,
  LogoSVG,
  backDomain,
} from "../../Resources/UniversalComponents";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState("Entrar");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton(<CircularProgress/>);
    setLoading(true);
    try {
      const response = await axios.post(`${backDomain}/api/v1/studentlogin/`, {
        email,
        password,
      });
      const { token, loggedIn } = response.data;
      console.log("Token:", token);

      localStorage.setItem("authorization", `${token}`);
      localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
      setLoading(false);
      setButton("Sucesso");

      window.location.reload("/");
    } catch (error) {
      alert("Credenciais inválidas. Tente novamente.");
      setButton("Entrar");
    }
  };

  const myLogo = LogoSVG(primaryColor(), secondaryColor(), 2.5);

  return (
    <>
      <div
        style={{
          backgroundColor: alwaysWhite(),
          color: alwaysBlack(),
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "3rem 0",
          marginTop: "180px",
          display: "grid",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            padding: "0 5rem",
          }}
        >
          <div style={{ margin: "0 auto" }}>{myLogo}</div>
          <InputField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="name"
            placeholder="E-mail"
            type="text"
          />
          <InputField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="name"
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
      </div>
      {/* <Button
        style={{
          marginTop: "1rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: primaryColor(),
          color: textPrimaryColorContrast(),
        }}
      >
        <Link to="/signup">Cadastro</Link>{" "}
      </Button> */}
    </>
  );
}

export default Login;
