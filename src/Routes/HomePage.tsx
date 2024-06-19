import React, { useEffect, useState } from "react";
import Ranking from "./Ranking/Ranking";
import GroupClasses from "./GroupClasses/GroupClasses";
import { Login } from "@mui/icons-material";
import { verifyToken } from "../App";
import { Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../Resources/UniversalComponents";
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
import AddFlashCards from "./FlashCards/FlashCardsComponents/AddFlashCards";
import { SpanDisapear } from "./Blog/Blog.Styled";
import AppFooter from "../Application/Footer/Footer";
import EnglishCourse from "./EnglishLessons/EnglishCourse";
import EnglishCourses from "./EnglishLessons/EnglishCourses";

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
      title: "My Classes",
      component: <MyClasses headers={headers} />,
    },
    {
      title: "Group Classes",
      component: <GroupClasses headers={headers} />,
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
      component: <Faq />,
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
          <Blog headers={headers} />
        ),
    },
  ];

  return (
    <div>
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
                    style={{ gap: "1rem" }}
                    className="smooth"
                  >
                    {component.component}
                    <LevelCard
                      display={
                        component.path == "adm-businessmanagement"
                          ? "none"
                          : "block"
                      }
                      change={change}
                      headers={headers}
                      _StudentId={_StudentId}
                      picture={picture}
                    />
                    {/* <AppFooter /> */}
                  </BlogRouteSizeControlBox>
                ) : (
                  <Login />
                )
              }
            />
          );
        })}
      </Routes>
      {/* <SpanDisapear>
        <AddFlashCards headers={headers} display="fixed" />
      </SpanDisapear> */}
      <Outlet />
    </div>
  );
}

export default HomePage;
