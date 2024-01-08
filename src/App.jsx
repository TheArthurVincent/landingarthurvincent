import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import Login from "./Routes/Login/Login";
import HomePage from "./Routes/HomePage";
import MyClasses from "./Routes/MyClasses/MyClasses";
import Extras from "./Routes/Extras/Extras";
import MyProfile from "./Routes/MyProfile/MyProfile";
import ClassesToTeach from "./Routes/ClassesToTeach/ClassesToTeach";
import { All, authorizationToken } from "./Resources/UniversalComponents";
import LiveClasses from "./Routes/MyCourses/LiveClasses";
import Footer from "./Application/Footer/Footer";
import { Adm } from "./Routes/Adm/Adm";

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

  const verifyToken = () => {
    const token = localStorage.getItem("authorization");
    return token;
  };
  const authorization = authorizationToken();
  const headers = {
    Authorization: authorization,
  };

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
      path: "/classes-to-teach",
      element: verifyToken() ? <ClassesToTeach headers={headers} /> : <Login />,
    },
    {
      path: "/extras",
      element: verifyToken() ? <Extras headers={headers} /> : <Login />,
    },
    {
      path: "/adm",
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
