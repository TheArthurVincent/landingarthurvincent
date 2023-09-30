import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import { setHTMLStyle } from "./Styles/Styles";
import Login from "./Routes/Login/Login";
import LoggedIn from "./Routes/LoggedIn";
import Adm from "./Routes/Adm/Adm";
import PhrasalVerbs from "./Routes/Courses/PhrasalVerbs/PhrasalVerbs";

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
          <Route path="/" element={verifyToken() ? <LoggedIn /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<LoggedIn />} />
          <Route path="/adm" element={<Adm />} />
          <Route path="/phrasal-verbs" element={<PhrasalVerbs />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
