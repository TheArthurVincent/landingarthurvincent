import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteDivUp,
} from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { backDomain, pathGenerator } from "../../Resources/UniversalComponents";
import EnglishCourse from "./EnglishCourse";
import { englishGrammar } from "./Assets/CoursesLists/EnglishGrammar";
import { talkingBusiness } from "./Assets/CoursesLists/TalkingBusiness";
import { contrasts } from "./Assets/CoursesLists/Contrasts";
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface EnglishCoursesHomeProps {
  headers: MyHeadersType | null;
}

export default function EnglishCourses({ headers }: EnglishCoursesHomeProps) {
  const transformLessons = (lessons: any): any[] => {
    return Object.entries(
      lessons.reduce((acc: { [key: string]: any }, lesson: any) => {
        if (!acc[lesson.type]) {
          acc[lesson.type] = [];
        }
        acc[lesson.type].push(lesson);
        return acc;
      }, {})
    ).map(([type, lessons]) => ({ type, lessons }));
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [listOfClassesFromDatabase, setListOfClassesFromDatabase] =
    useState<any>([]);

  const actualHeaders = headers || {};

  const renderCourses = (cList: any) => {
    const arrayC = cList.map((course: any) => ({
      title: course.title,
      groupedLessonsArray: course.modules,
      image: course.image,
    }));

    return arrayC;
  };

  const talkingB = transformLessons(talkingBusiness);
  const englishClassesArray = transformLessons(englishGrammar);
  const constrastsArray = transformLessons(contrasts);

  const groupedTalkingBArray = talkingB.sort(
    (a: any, b: any) => a.order - b.order
  );
  const groupedEnglishLessonsArray = englishClassesArray.sort(
    (a: any, b: any) => a.order - b.order
  );
  const groupedConstrastsArray = constrastsArray.sort(
    (a: any, b: any) => a.order - b.order
  );

  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/courses`, {
        headers: actualHeaders,
      });
      const testt = renderCourses(response.data.courses);
      setListOfClassesFromDatabase(testt);
      console.log(
        "response.data.courses",
        response.data.courses,
        "testt",
        testt
      );
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

  const listOfCourses = [
    {
      title: "English Grammar",
      groupedLessonsArray: groupedEnglishLessonsArray,
      image:
        "https://ik.imagekit.io/vjz75qw96/assets/courses/1.jpg?updatedAt=1718734644018",
    },
    {
      title: "Texts",
      // groupedLessonsArray: groupedTextsLessonsArray,
      image:
        "https://ik.imagekit.io/vjz75qw96/assets/courses/2.jpg?updatedAt=1718734644105",
    },
    {
      title: "Talking Business",
      groupedLessonsArray: groupedTalkingBArray,
      image:
        "https://ik.imagekit.io/vjz75qw96/assets/courses/3.jpg?updatedAt=1718734643966",
    },
    {
      title: "When English contrasts with Portuguese",
      groupedLessonsArray: groupedConstrastsArray,
      image:
        "https://ik.imagekit.io/vjz75qw96/assets/courses/4.png?updatedAt=1718973560787",
    },
  ];

  return (
    <RouteDivUp>
      <Routes>
        {/* {listOfClassesFromDatabase.map((route: any, idx: number) => (
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
        ))} */}

        {listOfCourses.map((route: any, idx: number) => (
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
      {!loading ? (
        <RouteDiv style={{ display: isRootPath ? "block" : "none" }}>
          <Helmets text="Courses" />
          <HOne>Escolha um curso</HOne>
          {/* <ul
            style={{
              display: "grid",
              gap: "1rem",
            }}
          >
            {listOfClassesFromDatabase.map((route: any, idx: number) => (
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
                    borderRadius: "1rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "10rem",
                      width: "100%",
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
          <>_______________________________________________________</>
          <br /> <>_______________________________________________________</>
          <br /> <>_______________________________________________________</>
          <br /> <>_______________________________________________________</>
          <br /> <>_______________________________________________________</>
          <br /> <>_______________________________________________________</>
          <br /> */}
          <ul
            style={{
              display: "grid",
              gap: "1rem",
            }}
          >
            {listOfCourses.map((route: any, idx: number) => (
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
                    borderRadius: "1rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "10rem",
                      width: "100%",
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
          <Outlet />
        </RouteDiv>
      ) : (
        <CircularProgress />
      )}
    </RouteDivUp>
  );
}
