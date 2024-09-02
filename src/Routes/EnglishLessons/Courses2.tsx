import React, { useEffect, useState } from "react";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import {
  backDomain,
  onLoggOut,
  pathGenerator,
} from "../../Resources/UniversalComponents";
import EnglishCourse from "./EnglishCourse";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import Modules from "./Modules2";

interface EnglishCoursesHomeProps {
  headers: MyHeadersType | null;
}

export default function EnglishCourses({ headers }: EnglishCoursesHomeProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [listOfCoursesFromDatabase, setListOfCoursesFromDatabase] =
    useState<any>([]);
  const [listOfModulesFromDatabase, setListOfModulesFromDatabase] =
    useState<any>([]);

  const actualHeaders = headers || {};

  const getCourses = async () => {
    setLoading(true);

    const getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "{}");

    const studentId = getLoggedUser.id;
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/courses/${studentId}`,
        { headers: actualHeaders }
      );
      var classesDB = response.data.courses;
      var modulesTitles = response.data.modulesTitles;
      setListOfCoursesFromDatabase(classesDB);
      setListOfModulesFromDatabase(modulesTitles);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao obter aulas");
      onLoggOut();
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const location = useLocation();
  const [displayy, setDisplayy] = useState<boolean>(true);

  useEffect(() => {
      setDisplayy(true);
  }, []);

  return (
    <div>
      <Routes>
        {listOfCoursesFromDatabase.map((route: any, idx: number) => (
          <Route
            key={idx}
            path={pathGenerator(route.title)}
            element={
              <Modules
                setDisplayy={setDisplayy}
                displayy={displayy}
                courseId={route._id}
                title={route.title}
                headers={headers}
              />
            }
          />
        ))}
      </Routes>
      <RouteDiv style={{ display: displayy ? "block" : "false" }}>
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
                gap: "5px",
              }}
            >
              {listOfCoursesFromDatabase
                .sort((a: any, b: any) => a.order - b.order)
                .map((route: any, idx: number) => (
                  <>
                    <Link
                      style={{ textDecoration: "none" }}
                      key={idx}
                      to={`${pathGenerator(route.title)}/`}
                    >
                      <div
                        className="hvr"
                        style={{
                          display: "flex",
                          padding: "5px 1rem  5px 5px ",
                          borderRadius: "20rem",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <img
                          style={{
                            maxWidth: "3rem",
                            width: "100%",
                            borderRadius: "50%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center center",
                          }}
                          src={route.image}
                          alt={`${route.title}img`}
                        />
                        <p>{route.title}</p>
                      </div>
                    </Link>
                  </>
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
            ></ul>
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
