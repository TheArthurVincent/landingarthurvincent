import React, { useEffect } from "react";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../../Resources/UniversalComponents";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { CourseCard } from "../EnglishMaterial/EnglishMaterial.Styled";
import EnglishLessonsRender from "./Assets/EnglishLessonsRender";
import { HOne, HTwo } from "../../Resources/Components/RouteBox";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";

interface EnglishCourseHomeProps {
  headers: MyHeadersType | null;
  less: any | null;
  back: any | null;
}

export default function EnglishCourse({
  headers,
  less,
  back,
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
    console.log("groupedLessonsArray", groupedLessonsArray);
  });

  const backToCourses = () => {
    window.location.assign(`/english-courses`);
  };

  return (
    <div>
      <Routes>
        {groupedLessonsArray.map((course: any, index: number) =>
          course.lessons[0].lessons.map((cls: any, idx: number) => (
            <Route
              key={idx}
              path={`${pathGenerator(cls.title)}`}
              element={
                <EnglishLessonsRender
                  back={back}
                  course={groupedLessonsArray}
                  theclass={cls}
                  headers={headers}
                />
              }
            />
          ))
        )}
      </Routes>
      <HOne>{less.title}</HOne>
      <ArvinButton onClick={backToCourses}>Back to Courses</ArvinButton>
      <HTwo>Modules</HTwo>
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
