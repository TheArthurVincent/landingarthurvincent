import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import { setHTMLStyle } from "./Styles/Styles";
import Login from "./Routes/Login/Login";
import Application from "./Routes/Application";
import Adm from "./Routes/Adm/Adm";
import PhrasalVerbs from "./Routes/ClassesToTeach/PhrasalVerbs/PhrasalVerbs";
import MyClasses from "./Routes/MyClasses/MyClasses";
import Extras from "./Routes/Extras/Extras";
import MyProfile from "./Routes/MyProfile/MyProfile";
import ClassesToTeach from "./Routes/ClassesToTeach/ClassesToTeach";

export function App() {
  useEffect(() => {
    setHTMLStyle();
  }, []);

  const verifyToken = () => {
    const token = localStorage.getItem("authorization");
    console.log(token);
    return token;
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={verifyToken() ? <Application /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/application/*" element={<Application />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/adm" element={<Adm />} />
          <Route path="/classes-to-teach" element={<ClassesToTeach />} />
          <Route path="/phrasal-verbs" element={<PhrasalVerbs />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
