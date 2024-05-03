import React, { useEffect, useState } from "react";
import Blog from "./Blog/Blog";
import TopBar from "../Application/TopBar/TopBar";
import Ranking from "./Ranking/Ranking";
import LiveClasses from "./MyCourses/LiveClasses";
import { Login } from "@mui/icons-material";
import { verifyToken } from "../App";
import { Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../Resources/UniversalComponents";
import MyProfile from "./MyProfile/MyProfile";
import EnglishMaterial from "./EnglishMaterial/EnglishMaterial";
import EnglishActivities from "./EnglishActivities/EnglishActivities";
import Faq from "./Faq/Faq";
import MyClasses from "./MyClasses/MyClasses";
import MyCalendar from "./MyCalendar/MyCalendar";
import AppFooter from "../Application/Footer/Footer";
import Adm from "./Adm/Adm";

export function HomePage({ headers }) {
  const [thePermissions, setPermissions] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions } = JSON.parse(user);
      setPermissions(permissions);
      setAdmin(permissions === "superadmin" ? true : false);
    } else {
      return;
    }
  }, []);

  const appRoutes = [
    {
      title: "Blog",
      path: "/",
      component: <Blog headers={headers} />,
    },
    {
      title: "Ranking",
      component: <Ranking headers={headers} />,
    },
    {
      title: "My Profile",
      component: <MyProfile headers={headers} />,
    },
    {
      title: "Live Classes",
      component: <LiveClasses headers={headers} />,
    },
    {
      title: "English Material",
      component: <EnglishMaterial headers={headers} />,
    },
    {
      title: "English Activities",
      component: <EnglishActivities headers={headers} />,
    },
    {
      title: "FAQ",
      component: <Faq />,
    },
    {
      title: "My Classes",
      component: <MyClasses headers={headers} />,
    },
    {
      title: "My Calendar",
      component: (
        <MyCalendar thePermissions={thePermissions} headers={headers} />
      ),
    },
    {
      path: "/adm-businessmanagement",
      title: "Adm",
      component:
        verifyToken() && admin ? (
          <Adm headers={headers} />
        ) : (
          <Blog headers={headers} />
        ),
    },
  ];

  return (
    <>
      <TopBar />
      <Routes>
        {appRoutes.map((component, index) => {
          return (
            <Route
              key={index}
              path={
                component.path ? component.path : pathGenerator(component.title)
              }
              element={verifyToken() ? component.component : <Login />}
            />
          );
        })}
      </Routes>
      <AppFooter />
      <Outlet />
    </>
  );
}

export default HomePage;
