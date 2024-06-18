import React, { useEffect, useState } from "react";
import { RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import { lessons } from "./Assets/Functions/ClassesListActivities";
import EnglishLessonsRender from "./Assets/EnglishLessonsRender";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import {
  DisapearOnWeb,
  pathGenerator,
} from "../../Resources/UniversalComponents";
import CoursesSideBar from "./CoursesSideBar/CoursesSideBar";
import {
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";
export default function EnglishLessonsHome({ headers }: HeadersProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [displayClasses, setdisplayClasses] = useState<boolean>(false);
  const [showClasses, setShowClasses] = useState<boolean>(false);

  const changeDisplayClasses = () => {
    setdisplayClasses(!displayClasses);
  };
  //@ts-ignore
  const groupedLessons = lessons.reduce((acc: any, lesson: any) => {
    if (!acc[lesson.type]) {
      acc[lesson.type] = [];
    }
    acc[lesson.type].push(lesson);
    return acc;
  }, {});

  const groupedLessonsArray = Object.entries(
    lessons.reduce((acc: any, lesson: any) => {
      if (!acc[lesson.type]) {
        acc[lesson.type] = [];
      }
      acc[lesson.type].push(lesson);
      return acc;
    }, {})
  ).map(([type, lessons]) => ({ type, lessons }));

  const handleDifficultyChange = (event: any) => {
    setSelectedDifficulty(event.target.value);
    setShowClasses(true);
  };

  return (
    <div
      style={{
        maxWidth: "85vw",
      }}
      className="smooth"
    >
      <Helmets text="Course" />
      <CoursesSideBar courses={groupedLessonsArray} />
      <DisapearOnWeb>
        <select
          style={{
            width: "8rem",
            fontFamily: "Athiti",
            margin: "3px",
          }}
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
        >
          <option hidden value="">
            Select Course
          </option>
          {groupedLessons &&
            Object.keys(groupedLessons).map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
        </select>
        {showClasses && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "1rem",
              backgroundColor: "white",
              border: "1px solid #ddd",
            }}
          >
            <p
              style={{
                cursor: "pointer",
              }}
              onClick={changeDisplayClasses}
            >
              {!displayClasses ? "Show Classes" : "Hide Classes"}
            </p>
            <nav
              style={{
                display: displayClasses ? "grid" : "none",
                gap: "2px",
                overflowY: "auto",
                maxHeight: "20rem",
              }}
            >
              {groupedLessons[selectedDifficulty] &&
                groupedLessons[selectedDifficulty]
                  .sort((a: any, b: any) => a.order - b.order)
                  .map((lesson: any, index: number) => (
                    <Link
                      onClick={changeDisplayClasses}
                      key={index}
                      style={{
                        textDecoration: "none",
                        padding: "5px",

                        color: location.pathname.includes(
                          pathGenerator(lesson.title)
                        )
                          ? textPrimaryColorContrast()
                          : textSecondaryColorContrast(),
                        backgroundColor: location.pathname.includes(
                          pathGenerator(lesson.title)
                        )
                          ? primaryColor()
                          : secondaryColor(),
                      }}
                      to={pathGenerator(lesson.title)}
                    >
                      {lesson.order + "- " + lesson.title}
                    </Link>
                  ))}
            </nav>
          </div>
        )}
      </DisapearOnWeb>
      <Routes>
        {lessons.map((lesson: any, index: number) => {
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
    </div>
  );
}
