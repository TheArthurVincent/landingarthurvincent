import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UniversalTexts from "../../../Resources/UniversalTexts.json";
import { pathGenerator } from "../../../Resources/UniversalComponents";
import {
  CoursesList,
  CoursesListContainer,
  CoursesListInnerContainer,
  CoursesListItem,
} from "./CoursesSideBarStyled";
import {
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
} from "../../../Styles/Styles";

function CoursesSideBar({ courses }) {
  const [showCourses, setShowCourses] = useState(false);
  const [arrow, setArrow] = useState(false);

  const handleShowCourses = () => {
    setShowCourses(!showCourses);
    setArrow(!arrow);
  };

  const handleHideCourses = () => {
    setShowCourses(false);
    setArrow(false);
  };

  useEffect(() => {
    console.log("courses", courses);
  }, []);

  return (
    <CoursesListContainer
      style={showCourses ? { left: "0rem" } : { left: "-20rem" }}
    >
      <CoursesListInnerContainer>
        <div
          onClick={handleShowCourses}
          style={{
            display: "grid",
          }}
        >
          <div
            style={{
              padding: "8px",
              alignItems: "center",
              backgroundColor: alwaysBlack(),
              borderRadius: "10px",
              color: alwaysWhite(),
              justifyContent: "space-between",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <h1>Modules</h1>
            <h1
              style={{
                fontSize: "10px",
              }}
            >
              <i
                class={`fa fa-arrow-${arrow ? "left" : "right"}`}
                style={{
                  fontSize: "16px",
                }}
                aria-hidden="true"
              />
            </h1>
          </div>
          {courses.map((course, index) => (
            <div key={index}>
              <h2>{course.type}</h2>
              <CoursesList>
                {course.lessons[0].lessons[0].lessons.map((lesson, idx) => {
                  return (
                    <Link
                      key={idx}
                      style={{
                        textDecoration: "none",
                      }}
                      to={pathGenerator(lesson.title)}
                    >
                      <CoursesListItem
                        className="hover-color"
                        style={{
                          borderRadius: "5px",
                          color: primaryColor(),
                          backgroundColor: location.pathname.includes(
                            pathGenerator(lesson.title)
                          )
                            ? secondaryColor()
                            : textPrimaryColorContrast(),
                        }}
                        onClick={handleHideCourses}
                      >
                        <span>{lesson.title}</span>
                        <span
                          style={
                            {
                              // paddingRight: "0.4rem",
                            }
                          }
                        >
                          {UniversalTexts.specialCharacters.circle}
                        </span>
                      </CoursesListItem>
                    </Link>
                  );
                })}
              </CoursesList>
            </div>
          ))}
        </div>
      </CoursesListInnerContainer>
      <div
        onClick={handleHideCourses}
        style={{
          display: showCourses ? "block" : "none",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          width: "100vw",
          height: "100vw",
        }}
      />
    </CoursesListContainer>
  );
}

export default CoursesSideBar;
