import React, { useEffect } from "react";
import { RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../../Resources/UniversalComponents";
import EnglishCourse from "./EnglishCourse";
import { lessons } from "./Assets/Functions/ClassesListActivities";

interface EnglishCoursesHomeProps {
  headers: MyHeadersType | null;
}

export default function EnglishCourses({ headers }: EnglishCoursesHomeProps) {
  const arr = Object.entries(
    lessons.reduce((acc: any, lesson: any) => {
      if (!acc[lesson.type]) {
        acc[lesson.type] = [];
      }
      acc[lesson.type].push(lesson);
      return acc;
    }, {})
  ).map(([type, lessons]) => ({ type, lessons }));

  const groupedLessonsArray = arr.sort((a: any, b: any) => a.order - b.order);
  const arrsee = [{ title: "English Grammar", groupedLessonsArray }];

  useEffect(() => {
    console.log(arrsee);
  }, [groupedLessonsArray]);

  return (
    <RouteDiv>
      <Routes>
        {arrsee.map((route: any, idx: number) => (
          <Route
            key={idx}
            path={`${pathGenerator(route.title)}/*`}
            element={<EnglishCourse less={route} headers={headers} />}
          />
        ))}
      </Routes>
      <Helmets text="Courses" />
      <p>Escolha um curso</p>
      {arrsee.map((route: any, idx: number) => (
        <Link key={idx} to={pathGenerator(route.title)}>
          {route.title}
        </Link>
      ))}
      <Outlet />
    </RouteDiv>
  );
}
