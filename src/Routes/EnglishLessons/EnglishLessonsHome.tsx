import React, { useEffect, useState } from "react";
import { RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import EnglishLessonsRender from "./Assets/EnglishLessonsRender";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../../Resources/UniversalComponents";
import CoursesSideBar from "./CoursesSideBar/CoursesSideBar";
import {
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";

interface EnglishLessonsHomeProps {
  headers: MyHeadersType | null;
  less: any | null;
}

export default function EnglishLessonsHome({
  headers,
  less,
}: EnglishLessonsHomeProps) {
  const groupedLessonsArray = Object.entries(
    less.reduce((acc: any, lesson: any) => {
      if (!acc[lesson.type]) {
        acc[lesson.type] = [];
      }
      acc[lesson.type].push(lesson);
      return acc;
    }, {})
  ).map(([type, lessons]) => ({ type, lessons }));

  return (
    <RouteDiv
      style={{
        maxWidth: "85vw",
      }}
      className="smooth"
    >
      <Helmets text="Course" />
      <CoursesSideBar courses={groupedLessonsArray} />

      <Routes>
        {less.map((lesson: any, index: number) => {
          return (
            <Route
              key={index}
              path={pathGenerator(lesson.title)}
              element={
                <EnglishLessonsRender theclass={lesson} headers={headers} />
              }
            />
          );
        })}
      </Routes>
      <Outlet />
      <RouteDiv
        style={{
          maxWidth: "85vw",
          overflowY: "auto",
        }}
      >
        {groupedLessonsArray.map((course: any, index: number) => (
          <div key={index}>
            <h2>{course.type}</h2>
            <div>
              {course.lessons.map((lesson: any, idx: number) => {
                return (
                  <Link
                    key={idx}
                    style={{
                      textDecoration: "none",
                    }}
                    to={pathGenerator(lesson.title)}
                  >
                    <div
                      style={{
                        color: primaryColor(),
                        backgroundColor: location.pathname.includes(
                          pathGenerator(lesson.title)
                        )
                          ? secondaryColor()
                          : textPrimaryColorContrast(),
                      }}
                    >
                      <span>{lesson.title}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </RouteDiv>
    </RouteDiv>
  );
}
