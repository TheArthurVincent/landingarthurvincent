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
import theitems from "../src/Routes/Ranking/RankingComponents/ranking.json";
import { SignUp } from "./Routes/SignUp/SignUp";
import { MessageDrive } from "./Routes/Message/Message";

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
  const [id, setId] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions } = JSON.parse(user);
      const { totalScore } = JSON.parse(user);
      setScore(totalScore);
      setAdmin(permissions === "superadmin" ? true : false);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    const levelNumber =
      score >= 10000 && score < 20000
        ? 1
        : score >= 20000 && score < 35000
        ? 2
        : score >= 35000 && score < 50000
        ? 3
        : score >= 50000 && score < 65000
        ? 4
        : score >= 65000 && score < 80000
        ? 5
        : score >= 80000 && score < 100000
        ? 6
        : score >= 100000 && score < 2000000
        ? 7
        : score >= 2000000
        ? 8
        : 0;
    setTimeout(() => {
      document.body.style.backgroundImage = `url(${theitems.items[levelNumber].background})`;
    }, 100);
  }, [score]);

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
      path: "/message",
      element: verifyToken() ? <MessageDrive /> : <Login />,
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
    {
      path: "/signup",
      element: <SignUp />,
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
