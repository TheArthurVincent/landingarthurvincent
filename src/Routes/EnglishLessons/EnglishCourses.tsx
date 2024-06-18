import React, { useEffect } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../../Resources/UniversalComponents";
import EnglishCourse from "./EnglishCourse";
import { lessons } from "./Assets/Functions/ClassesListActivities";
import { englishGrammar } from "./Assets/CoursesLists/EnglishGrammar";
import { textsCourse } from "./Assets/CoursesLists/Texts";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";

interface EnglishCoursesHomeProps {
  headers: MyHeadersType | null;
  back:any | null
}

export default function EnglishCourses({ headers,back }: EnglishCoursesHomeProps) {
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

  const arr = transformLessons(lessons);
  const englishClassesArray = transformLessons(englishGrammar);
  const textsArray = transformLessons(textsCourse);

  const groupedLessonsTest1Array = arr.sort(
    (a: any, b: any) => a.order - b.order
  );
  const groupedEnglishLessonsArray = englishClassesArray.sort(
    (a: any, b: any) => a.order - b.order
  );
  const groupedTextsLessonsArray = textsArray.sort(
    (a: any, b: any) => a.order - b.order
  );


  const listOfCourses = [
    {
      title: "English Grammar",
      groupedLessonsArray: groupedEnglishLessonsArray,
      image:
        "https://ik.imagekit.io/vjz75qw96/assets/courses/1.jpg?updatedAt=1718734644018",
    },
    {
      title: "Texts",
      groupedLessonsArray: groupedTextsLessonsArray,
      image:
        "https://ik.imagekit.io/vjz75qw96/assets/courses/2.jpg?updatedAt=1718734644105",
    },
    {
      title: "Talking Business",
      groupedLessonsArray: groupedTextsLessonsArray,
      image:
        "https://ik.imagekit.io/vjz75qw96/assets/courses/3.jpg?updatedAt=1718734643966",
    },
  ];
  return (
    <RouteDiv>
      <Routes>
        {listOfCourses.map((route: any, idx: number) => (
          <Route
            key={idx}
            path={`${pathGenerator(route.title)}/*`}
            element={<EnglishCourse back={pathGenerator(route.title)} less={route} headers={headers} />}
          />
        ))}
      </Routes>
      <Helmets text="Courses" />
      <HOne>Escolha um curso</HOne>

    
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
  );
}
