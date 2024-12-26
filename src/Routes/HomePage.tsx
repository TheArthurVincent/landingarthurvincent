import React, { useEffect, useState } from "react";
import Ranking from "./Ranking/Ranking";
import GroupClasses from "./GroupClasses/GroupClasses";
import { Login } from "@mui/icons-material";
import { verifyToken } from "../App";
import { Outlet, Route, Routes } from "react-router-dom";
import { onLoggOut, pathGenerator } from "../Resources/UniversalComponents";
import MyProfile from "./MyProfile/MyProfile";
import Faq from "./Faq/Faq";
import MyClasses from "./MyClasses/MyClasses";
import MyCalendar from "./MyCalendar/MyCalendar";
import Adm from "./Adm/Adm";
import Blog from "./Blog/Blog";
import { LevelCard } from "./LevelCard/LevelCard";
import { BlogRouteSizeControlBox } from "../Resources/Components/RouteBox";
import { HeadersProps } from "../Resources/types.universalInterfaces";
import { TopBar } from "../Application/TopBar/TopBar";
import FlashCards from "./FlashCards/FlashCards";
import Homework from "./Homework/Homework";
import AppFooter from "../Application/Footer/Footer";
import EnglishCourses from "./EnglishLessons/Courses2";

export function HomePage({ headers }: HeadersProps) {
  const [thePermissions, setPermissions] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [_StudentId, setStudentId] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [change, setChange] = useState<boolean>(true);

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions, picture, id } = JSON.parse(user);
      setPermissions(permissions);
      setStudentId(id || _StudentId);
      setPicture(picture);
      setAdmin(permissions === "superadmin" ? true : false);
    } else {
      onLoggOut();
      return;
    }
  }, []);

  const [see, setSee] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSee(true);
    }, 700);
  }, []);

  const appRoutes = [
    {
      title: "Blog",
      path: "/",
      levelcard: false,
      component: (
        <Blog
          change={change}
          headers={headers}
          studentIdd={_StudentId}
          picture={picture}
        />
      ),
    },
    {
      title: "My Classes",
      component: <MyClasses headers={headers} />,
    },
    {
      title: "Homework",
      component: (
        <Homework change={change} setChange={setChange} headers={headers} />
      ),
    },
    {
      title: "My Calendar",
      component: (
        <MyCalendar thePermissions={thePermissions} headers={headers} />
      ),
    },
    {
      title: "Flash Cards",
      levelcard: true,
      component: (
        <FlashCards change={change} onChange={setChange} headers={headers} />
      ),
    },
    {
      title: "Ranking",
      component: <Ranking headers={headers} />,
    },
    {
      title: "English Courses",
      component: <EnglishCourses headers={headers} />,
    },
    {
      title: "Live Classes",
      component: <GroupClasses headers={headers} />,
    },
    {
      title: "FAQ",
      component: <Faq headers={headers} />,
    },
    {
      title: "My Profile",
      component: <MyProfile headers={headers} />,
    },
    {
      path: "/adm-businessmanagement",
      title: "Adm",
      component:
        verifyToken() && admin ? (
          <Adm headers={headers} />
        ) : (
          <Blog
            change={change}
            headers={headers}
            studentIdd={_StudentId}
            picture={picture}
          />
        ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <TopBar />
      <Routes>
        {appRoutes.map((component, index) => {
          return (
            <Route
              key={index}
              path={`${
                component.path ? component.path : pathGenerator(component.title)
              }/*`}
              element={
                verifyToken() ? (
                  <BlogRouteSizeControlBox
                    style={{ gap: "1rem", marginTop: "4.5rem" }}
                    className="smooth"
                  >
                    {component.component}
                    {component.levelcard && (
                      <LevelCard
                        change={change}
                        headers={headers}
                        _StudentId={_StudentId}
                        picture={picture}
                      />
                    )}
                  </BlogRouteSizeControlBox>
                ) : (
                  <Login />
                )
              }
            />
          );
        })}
      </Routes>
      <AppFooter see={see} />
      <Outlet />
    </div>
  );
}

export default HomePage;
