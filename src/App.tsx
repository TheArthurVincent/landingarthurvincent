import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import NewStudentAsaas from "./Routes/NewStudentAsaas/NewStudentAsaas";

function App() {
  const routes = [
    { path: "/cadastro", element: <NewStudentAsaas /> },
    {
      path: "/*",
      element: (
        <>
          <NewStudentAsaas />{" "}
        </>
      ),
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
