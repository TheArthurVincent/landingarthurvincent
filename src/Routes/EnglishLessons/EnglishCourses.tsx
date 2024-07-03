import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { backDomain, pathGenerator } from "../../Resources/UniversalComponents";
import EnglishCourse from "./EnglishCourse";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";

interface EnglishCoursesHomeProps {
  headers: MyHeadersType | null;
}

export default function EnglishCourses({ headers }: EnglishCoursesHomeProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [listOfClassesFromDatabase, setListOfClassesFromDatabase] =
    useState<any>([]);
  const [
    listOfClassesNonAuthFromDatabase,
    setListOfClassesNonAuthFromDatabase,
  ] = useState<any>([]);

  const actualHeaders = headers || {};

  const renderCourses = (cList: any) => {
    const arrayC = cList.map((course: any) => ({
      title: course.title,
      groupedLessonsArray: course.modules,
      image: course.image,
    }));

    return arrayC;
  };

  const getCourses = async () => {
    setLoading(true);
    const getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "{}");
    const studentId = getLoggedUser.id;
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/courses/${studentId}`,
        {
          headers: actualHeaders,
        }
      );
      const classesDB = renderCourses(
        response.data.courses.sort((a: any, b: any) => a.order - b.order)
      );
      const classesDBNonAuth = renderCourses(
        response.data.coursesNonAuth.sort((a: any, b: any) => a.order - b.order)
      );
      setListOfClassesFromDatabase(classesDB);
      setListOfClassesNonAuthFromDatabase(classesDBNonAuth);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao obter cards");
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const location = useLocation();
  const isRootPath = location.pathname === "/english-courses";

  return (
    <div>
      <Routes>
        {listOfClassesFromDatabase.map((route: any, idx: number) => (
          <Route
            key={idx}
            path={`${pathGenerator(route.title)}/*`}
            element={
              <EnglishCourse
                back={pathGenerator(route.title)}
                less={route}
                headers={headers}
              />
            }
          />
        ))}
      </Routes>
      <RouteDiv
        style={{
          display: isRootPath ? "block" : "none",
        }}
      >
        <Helmets text="Courses" />
        <HOne>Escolha um curso</HOne>
        <ArvinButton onClick={getCourses}>
          <i className="fa fa-refresh" aria-hidden={true} />
        </ArvinButton>
        <br />
        {!loading ? (
          <div>
            <ul
              style={{
                display: "grid",
                gap: "1rem",
              }}
            >
              {listOfClassesFromDatabase
                .sort((a: any, b: any) => a.order - b.order)
                .map((route: any, idx: number) => (
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    key={idx}
                    to={pathGenerator(route.title)}
                  >
                    <div
                      className="hvr"
                      style={{
                        display: "flex",
                        gap: "1rem",
                        padding: "1rem",
                        borderRadius: "30rem",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        style={{
                          maxWidth: "8rem",
                          width: "100%",
                          borderRadius: "50%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        src={route.image}
                        alt={`${route.title}img`}
                      />
                      <h2>{route.title}</h2>
                    </div>
                  </Link>
                ))}
            </ul>
            <br />
            <br />
            <br />
            <ul
              style={{
                display: "grid",
                gap: "1rem",
              }}
            >
              {listOfClassesNonAuthFromDatabase.map(
                (route: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      cursor: "not-allowed",
                      display: "flex",
                      gap: "1rem",
                      padding: "1rem",
                      borderRadius: "30rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    className="hvr"
                  >
                    <img
                      style={{
                        maxWidth: "6rem",
                        borderRadius: "50%",
                        width: "100%",
                        filter: "grayscale(100%)",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
                      src={route.image}
                      alt={`${route.title}img`}
                    />
                    <div>
                      <h2>{route.title}</h2>
                      <p>No access</p>
                    </div>
                  </div>
                )
              )}
            </ul>
          </div>
        ) : (
          <div>
            <br />
            <CircularProgress />
          </div>
        )}
        <Outlet />
      </RouteDiv>
    </div>
  );
}
