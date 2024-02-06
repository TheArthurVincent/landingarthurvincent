import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import Login from "./Routes/Login/Login";
import HomePage from "./Routes/HomePage";
import MyClasses from "./Routes/MyClasses/MyClasses";
import Extras from "./Routes/Extras/Extras";
import MyProfile from "./Routes/MyProfile/MyProfile";
import EnglishMaterial from "./Routes/EnglishMaterial/EnglishMaterial";
import { All, authorizationToken } from "./Resources/UniversalComponents";
import LiveClasses from "./Routes/MyCourses/LiveClasses";
import Footer from "./Application/Footer/Footer";
import { Adm } from "./Routes/Adm/Adm";
import Ranking from "./Routes/Ranking/Ranking";
import EnglishActivities from "./Routes/EnglishActivities/EnglishActivities";
import NotFound from "./Routes/NotFound/NotFound";

export const verifyToken = () => {
  const token = localStorage.getItem("authorization");
  return token;
};
const authorization = authorizationToken();
const headers = {
  Authorization: authorization,
};

function App() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions } = JSON.parse(user);
      setAdmin(permissions === "superadmin" ? true : false);
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
      path: "/",
      element: verifyToken() ? <HomePage headers={headers} /> : <Login />,
    },
    {
      path: "/homepage",
      element: verifyToken() ? <HomePage headers={headers} /> : <Login />,
    },
    {
      path: "/my-classes",
      element: verifyToken() ? <MyClasses headers={headers} /> : <Login />,
    },
    {
      path: "/live-classes",
      element: verifyToken() ? <LiveClasses headers={headers} /> : <Login />,
    },
    {
      path: "/my-profile",
      element: verifyToken() ? <MyProfile headers={headers} /> : <Login />,
    },
    {
      path: "/ranking",
      element: verifyToken() ? <Ranking headers={headers} /> : <Login />,
    },
    {
      path: "/english-material",
      element: verifyToken() ? (
        <EnglishMaterial headers={headers} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/english-activities/*",
      element: verifyToken() ? (
        <EnglishActivities headers={headers} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/extras",
      element: verifyToken() ? <Extras headers={headers} /> : <Login />,
    },
    {
      path: "*",
      element: verifyToken() ? <NotFound headers={headers} /> : <Login />,
    },
    {
      path: "/adm-businessmanagement",
      element: verifyToken() && admin ? <Adm headers={headers} /> : <Login />,
    },
  ];

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
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Router>
        </UserProvider>
      </div>
      <Footer />
    </All>
  );
}

export default App;
