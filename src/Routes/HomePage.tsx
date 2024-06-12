import React, { useEffect, useState } from "react";
import Ranking from "./Ranking/Ranking";
import GroupClasses from "./GroupClasses/GroupClasses";
import { Login } from "@mui/icons-material";
import { verifyToken } from "../App";
import { Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../Resources/UniversalComponents";
import MyProfile from "./MyProfile/MyProfile";
import EnglishMaterial from "./EnglishMaterial/EnglishMaterial";
import Faq from "./Faq/Faq";
import MyClasses from "./MyClasses/MyClasses";
import MyCalendar from "./MyCalendar/MyCalendar";
import Adm from "./Adm/Adm";
import Blog from "./Blog/Blog";
import { LevelCard } from "./LevelCard/LevelCard";
import { BlogRouteSizeControlBox } from "../Resources/Components/RouteBox";
import { HeadersProps } from "../Resources/types.universalInterfaces";
import { TopBar } from "../Application/TopBar/TopBar";
import EnglishLessonsHome from "./EnglishLessons/EnglishLessonsHome";
import FlashCards from "./FlashCards/FlashCards";
import Homework from "./Homework/Homework";

export function HomePage({ headers }: HeadersProps) {
  const [thePermissions, setPermissions] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [_StudentId, setStudentId] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions, picture, id } = JSON.parse(user);
      setPermissions(permissions);
      setStudentId(id || _StudentId);
      setPicture(picture);
      setAdmin(permissions === "superadmin" ? true : false);
    } else {
      return;
    }
  }, []);

  const appRoutes = [
    {
      title: "Blog",
      path: "/",
      component: (
        <BlogRouteSizeControlBox style={{ gap: "1rem" }} className="smooth">
          <Blog headers={headers} />
          <LevelCard
            headers={headers}
            _StudentId={_StudentId}
            picture={picture}
          />
        </BlogRouteSizeControlBox>
      ),
    },
    {
      title: "Ranking",
      component: <Ranking headers={headers} />,
    },
    {
      title: "Homework",
      component: <Homework headers={headers} />,
    },
    {
      title: "My Profile",
      component: <MyProfile headers={headers} />,
    },
    {
      title: "Group Classes",
      component: <GroupClasses headers={headers} />,
    },
    {
      title: "Live Classes",
      component: <GroupClasses headers={headers} />,
    },
    {
      title: "English Material",
      component: <EnglishMaterial headers={headers} />,
    },
    {
      title: "English Lessons",
      component: <EnglishLessonsHome headers={headers} />,
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
      title: "Flash Cards",
      component: <FlashCards headers={headers} />,
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
    <div style={{ marginTop: "3.5rem" }}>
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
      {/* <AppFooter /> */}
      <Outlet />
    </div>
  );
}

export default HomePage;
