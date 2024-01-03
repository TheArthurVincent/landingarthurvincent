import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import Login from "./Routes/Login/Login";
import HomePage from "./Routes/HomePage";
import Adm from "./Routes/Adm/Adm";
import MyClasses from "./Routes/MyClasses/MyClasses";
import Extras from "./Routes/Extras/Extras";
import MyProfile from "./Routes/MyProfile/MyProfile";
import ClassesToTeach from "./Routes/ClassesToTeach/ClassesToTeach";
import { All } from "./Resources/UniversalComponents";
import SignUp from "./Routes/SignUp/SignUp";
import LiveClasses from "./Routes/MyCourses/LiveClasses";

function App() {
  const verifyToken = () => {
    const token = localStorage.getItem("authorization");
    return token;
  };

  return (
    <All>
      <div
        style={{
          width: "100vw",
        }}
      >
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={verifyToken() ? <HomePage /> : <Login />}
              />
              <Route
                path="/homepage"
                element={verifyToken() ? <HomePage /> : <Login />}
              />
              <Route
                path="/extras"
                element={verifyToken() ? <Extras /> : <Login />}
              />
              <Route
                path="/live-classes"
                element={verifyToken() ? <LiveClasses /> : <Login />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/adm"
                element={verifyToken() ? <Adm /> : <Login />}
              />
              <Route
                path="/my-classes"
                element={verifyToken() ? <MyClasses /> : <Login />}
              />
              <Route
                path="/my-profile"
                element={verifyToken() ? <MyProfile /> : <Login />}
              />
              <Route
                path="/classes-to-teach"
                element={verifyToken() ? <ClassesToTeach /> : <Login />}
              />
            </Routes>
          </Router>
        </UserProvider>
      </div>
      <footer
        style={{
          bottom: "0vh",
          fontSize: "12px",
          alignItems: "center",
          backgroundColor: "#111",
          color: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100vw",
        }}
      >
        <img
          style={{
            maxWidth: "6rem",
          }}
          src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/arvintranmsp?updatedAt=1703788108765"
          alt="logo arvin"
        />
        <span
          style={{
            marginBottom: "1rem",
          }}
        >
          This platform is powered by ARVIN ENGLISH SCHOOL © Some rights
          reserved <br />
          Arthur Vincent
          <br />
          +55 11 91585-7807
        </span>
      </footer>
    </All>
  );
}

export default App;
