import React, { useEffect, useState } from "react";
import { RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../../Resources/UniversalComponents";
import EnglishLessonsHome from "./EnglishLessonsHome";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { CourseCard } from "../EnglishMaterial/EnglishMaterial.Styled";

interface EnglishCourseHomeProps {
  headers: MyHeadersType | null;
  less: any | null;
}

export default function EnglishCourse({
  headers,
  less,
}: EnglishCourseHomeProps) {
  const arr = Object.entries(
    less.groupedLessonsArray.reduce((acc: any, lesson: any) => {
      if (!acc[lesson.type]) {
        acc[lesson.type] = [];
      }
      acc[lesson.type].push(lesson);
      return acc;
    }, {})
  ).map(([type, lessons]) => ({ type, lessons }));

  const groupedLessonsArray = arr.sort((a: any, b: any) => a.order - b.order);

  useEffect(() => {
    console.log(groupedLessonsArray);
  });
  return (
    <div>
      <Routes>
        {/* {groupedLessonsArray.map((course: any, index: number) => (
       
       return     {course.lessons[0].lessons.map((cls: any, idx: number) => (
        <Route
        key={idx}
        path={`${pathGenerator(cls.title)}`}
        element={
          <EnglishLessonsHome less={course} headers={headers} />
        }
      />
            ))}}
 */}
      </Routes>
      <h1>Curso: {less.title}. Veja os módulos</h1>
      {groupedLessonsArray.map((course: any, index: number) => (
        <div key={index}>
          <HThree>{course.type}</HThree>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              gap: "1rem",
              margin: "0 1rem",
              overflowY: "auto",
              overflowX: "scroll",
              maxWidth: "100%",
              padding: "1rem",
            }}
          >
            {course.lessons[0].lessons.map((cls: any, idx: number) => (
              <div key={idx}>
                <Link to={pathGenerator(cls.title)}>
                  <CourseCard>
                    <p>{cls.title}</p>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
                      src={
                        cls.image
                          ? cls.image
                          : "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/bg2.png?updatedAt=1687554564387"
                      }
                      alt={cls.title}
                    />
                  </CourseCard>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Helmets text="Courses" />
      <Outlet />
    </div>
  );
}
