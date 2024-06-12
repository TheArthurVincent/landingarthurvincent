import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import Login from "./Routes/Login/Login";
import HomePage from "./Routes/HomePage";
import NotFound from "./Routes/NotFound/NotFound";
import { SignUp } from "./Routes/SignUp/SignUp";
import { MessageDrive } from "./Routes/Message/Message";
import { All, authorizationToken } from "./App.Styled";
import { MyHeadersType } from "./Resources/types.universalInterfaces";

export const verifyToken = () => {
  const token = localStorage.getItem("authorization");
  return token;
};
const authorization: string = authorizationToken();
const headers: MyHeadersType = {
  Authorization: authorization,
};

function App() {
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
    <All>
      <UserProvider>
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </UserProvider>
    </All>
  );
}

export default App;
