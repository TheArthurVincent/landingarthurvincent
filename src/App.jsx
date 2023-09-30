import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import { setHTMLStyle } from "./Styles/Styles";
import Login from "./Routes/Login/Login";
import LoggedIn from "./Routes/LoggedIn";
import Adm from "./Routes/Adm/Adm";
import PhrasalVerbs from "./Routes/ClassesToTeach/PhrasalVerbs/PhrasalVerbs";
import MyClasses from "./Routes/MyClasses/MyClasses";
import Extras from "./Routes/Extras/Extras";
import MyProfile from "./Routes/MyProfile/MyProfile";

export function App() {
  useEffect(() => {
    setHTMLStyle();
  }, []);

  const verifyToken = () => {
    const token = localStorage.getItem("authorization");
    console.log(token);
    return token;
  };

  const [value, setValue] = useState("1");
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [permissions, setPermissions] = useState("");
  const [ID, setID] = useState("");

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(getLoggedUser);
    setName(getLoggedUser.name);
    setLastname(getLoggedUser.lastname);
    setID(getLoggedUser.id);
    setPermissions(getLoggedUser.permissions);
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={verifyToken() ? <LoggedIn /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<LoggedIn />} />
          <Route path="/my-classes" element={<MyClasses studentID={ID} />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/adm" element={<Adm />} />
          <Route path="/phrasal-verbs" element={<PhrasalVerbs />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
