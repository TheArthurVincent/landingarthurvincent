import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const truncateTitle = (title, maxChars) => {
    if (title.length > maxChars) {
      return title.substring(0, maxChars).trim() + " ...";
    }
    return title;
  };

  const location = useLocation();

  const go = (e) => {
    window.location.assign(pathGenerator(e));
  };

  return (
    <CoursesListContainer
      style={showCourses ? { left: "0rem" } : { left: "-14.5rem" }}
    >
      <CoursesListInnerContainer>
        <div onClick={handleShowCourses}>
          <div
            style={{
              maxHeight: "3rem",
              padding: "8px",
              alignItems: "center",
              backgroundColor: alwaysBlack(),
              borderRadius: "10px",
              color: alwaysWhite(),
              justifyContent: "space-between",
              cursor: "pointer",
              display: "flex",
              gap: "9rem",
            }}
          >
            <h1>Modules</h1>
            <h1
              style={{
                fontSize: "10px",
              }}
            >
              <i
                className={`fa fa-arrow-${arrow ? "left" : "right"}`}
                style={{
                  fontSize: "16px",
                }}
                aria-hidden="true"
              />
            </h1>
          </div>
          {courses.map((course, index) => (
            <div
              style={{
                paddingLeft: "1rem",
              }}
              key={index}
            >
              <h2>{course.type}</h2>
              <CoursesList>
                {course.lessons[0].lessons.map((lesson, idx) => {
                  return (
                    <div
                      key={idx}
                      style={{
                        textDecoration: "none",
                      }}
                      onClick={() => go(lesson.title)}
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
                        <span>
                          {idx + 1 + "- " + truncateTitle(lesson.title, 20)}
                        </span>
                        <span>{UniversalTexts.specialCharacters.circle}</span>
                      </CoursesListItem>
                    </div>
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
