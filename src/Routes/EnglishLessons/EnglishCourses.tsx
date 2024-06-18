import React, { useEffect, useState } from "react";
import { RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../../Resources/UniversalComponents";
import EnglishLessonsHome from "./EnglishLessonsHome";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { CourseCard } from "../EnglishMaterial/EnglishMaterial.Styled";

interface EnglishLessonsHomeProps {
  headers: MyHeadersType | null;
  less: any | null;
}

export default function EnglishCourses({
  headers,
  less,
}: EnglishLessonsHomeProps) {
  const arr = Object.entries(
    less.reduce((acc: any, lesson: any) => {
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
  }, [groupedLessonsArray]);

  return (
    <RouteDiv>
      <Routes>
        <Route
          path="/*"
          element={<EnglishLessonsHome less={less} headers={headers} />}
        />
      </Routes>
      <Helmets text="Courses" />

      {groupedLessonsArray.map((course, index) => (
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
            {/* @ts-ignore */}
            {course.lessons.map((cls: any, idx: number) => (
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

      <Outlet />
    </RouteDiv>
  );
}
