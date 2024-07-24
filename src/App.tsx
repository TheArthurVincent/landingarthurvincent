import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import Login from "./Routes/Login/Login";
import HomePage from "./Routes/HomePage";
import NotFound from "./Routes/NotFound/NotFound";
import { SignUp } from "./Routes/SignUp/SignUp";
import { MessageDrive } from "./Routes/Message/Message";
import { authorizationToken } from "./App.Styled";
import { MyHeadersType } from "./Resources/types.universalInterfaces";
import { textFont, textTitleFont } from "./Styles/Styles";

export const verifyToken = () => {
  const token = localStorage.getItem("authorization");
  return token;
};
const authorization: string = authorizationToken();
const headers: MyHeadersType = {
  Authorization: authorization,
};

function App() {
  const [_StudentId, setStudentId] = useState<string>("");

  const checkLocalBackground = () => {
    if (window.location.hostname === "localhost") {
      document.body.style.backgroundColor = "#555";
    }
  };

  useEffect(() => {
    checkLocalBackground();
    const user = localStorage.getItem("loggedIn");

    const textElement = document.querySelector("div");
    if (textElement) {
      textElement.style.fontFamily = textFont();
    }
    const h1Element = document.querySelector("h1");
    if (h1Element) {
      h1Element.style.fontFamily = textTitleFont();
    }

    if (user) {
      const { id } = JSON.parse(user);
      setStudentId(id || _StudentId);
    } else {
      return;
    }
  }, []);

  const routes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/*",
      element: verifyToken() ? <HomePage headers={headers} /> : <Login />,
    },
    {
      path: "/message",
      element: verifyToken() ? <MessageDrive /> : <Login />,
    },
    {
      path: "*",
      element: verifyToken() ? <NotFound /> : <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
