import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import Login from "./Routes/Login/Login";
import HomePage from "./Routes/HomePage";
import Adm from "./Routes/Adm/Adm";
import PhrasalVerbs from "./Routes/ClassesToTeach/PhrasalVerbs/PhrasalVerbs";
import MyClasses from "./Routes/MyClasses/MyClasses";
import Extras from "./Routes/Extras/Extras";
import MyProfile from "./Routes/MyProfile/MyProfile";
import ClassesToTeach from "./Routes/ClassesToTeach/ClassesToTeach";
import {
  primaryColor,
  primaryContrast,
  secondaryColor,
  secondaryContrast,
} from "./Styles/Styles";

function App() {
  const verifyToken = () => {
    const token = localStorage.getItem("authorization");
    return token;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "100vw",
        }}
      >
        <UserProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={verifyToken() ? <HomePage /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/homepage/*" element={<HomePage />} />
              <Route path="/extras" element={<Extras />} />
              <Route path="/adm" element={<Adm />} />
              <Route path="/my-classes" element={<MyClasses />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/classes-to-teach" element={<ClassesToTeach />} />
              <Route path="/phrasal-verbs" element={<PhrasalVerbs />} />
            </Routes>
          </Router>
        </UserProvider>
      </div>
      <footer
        style={{
          textAlign: "center",
          padding: "0.7rem",
          display: "flex",
          bottom: "0vh",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.7rem",
          backgroundColor: secondaryColor(),
          color: primaryContrast(),
        }}
      >
        <img
          style={{
            maxWidth: "3rem",
            width: "100vw",
          }}
          src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/head-white.png?updatedAt=1687369608637"
          alt=""
        />
        <span> Arthur Vincent © Some rights reserved</span>{" "}
      </footer>
    </div>
  );
}

export default App;
