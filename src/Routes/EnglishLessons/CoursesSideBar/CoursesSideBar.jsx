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
primaryColor,  secondaryColor,
  textPrimaryColorContrast,
} from "../../../Styles/Styles";

function CoursesSideBar({ courses }) {
  const [showCourses, setShowCourses] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [classes, setClasses] = useState([]);

  const handleShowCourses = () => {
    setShowCourses(!showCourses);
    setArrow(true);
  };

  const handleHideCourses = () => {
    setShowCourses(false);
    setArrow(false);
  };

  useEffect(() => {
    console.log(courses);
  }, []);

  return (
    <CoursesListContainer
      style={showCourses ? { left: "0rem" } : { left: "-22rem" }}
    >
      <CoursesListInnerContainer>
        <div style={{ display: "flex" }}>
          <CoursesList>
            <div
              onClick={handleShowCourses}
              style={{
                display: "flex",
                padding: "0 10px ",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h1>Modules</h1>
              <h1
                style={{
                  cursor: "pointer",
                }}
              >
                <i
                  class={`fa fa-arrow-${arrow ? "left" : "right"}`}
                  aria-hidden="true"
                />
              </h1>
            </div>
            {courses.map((course, index) => (
              <div key={index} onClick={() => setClasses(course.lessons)}>
                <h2>{course.type}</h2>
                <CoursesList>
                  {course.lessons.map((lesson, idx) => {
                    return (
                      <Link
                        key={idx}
                        style={{
                          textDecoration: "none",
                        }}
                        to={pathGenerator(lesson.title)}
                        key={index}
                      >
                        <CoursesListItem
                          style={{
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
                            style={{
                              paddingRight: "0.4rem",
                            }}
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
          </CoursesList>
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
