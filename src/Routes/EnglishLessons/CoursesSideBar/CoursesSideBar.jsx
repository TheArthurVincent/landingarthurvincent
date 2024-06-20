import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { pathGenerator } from "../../../Resources/UniversalComponents";
import { CoursesList, CoursesListContainer, CoursesListInnerContainer, CoursesListInnerInnerContainer, CoursesListItem, } from "./CoursesSideBarStyled";
import { alwaysWhite, primaryColor, secondaryColor, textPrimaryColorContrast, } from "../../../Styles/Styles";

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
      style={showCourses ? { left: "0rem" } : { left: "-18.4rem" }}
    >
      <CoursesListInnerContainer>
        <CoursesListInnerInnerContainer>
          <div onClick={handleShowCourses}>
            <div
              style={{
                maxHeight: "1rem", padding: "1rem", zIndex: -1, alignItems: "center", backgroundColor: secondaryColor(), border: `ridge 5px ${secondaryColor()}`, borderRadius: "50px",
                transition: "left 0.3s ease-out", color: alwaysWhite(), position: "fixed", left: showCourses ? -150 : "-17.8rem", top: 405, justifyContent: "space-between", cursor: "pointer",
                width: "18rem", display: "flex", gap: "9rem",
              }}
            >
              <h1>Modules</h1>
              <h1 style={{ fontSize: "10px" }}>
                <i
                  className={`fa fa-arrow-${arrow ? "left" : "right"}`}
                  style={{ fontSize: "16px" }}
                  aria-hidden="true"
                />
              </h1>
            </div>
            {courses.map((course, index) => (
              <div style={{ padding: "1rem 0" }} key={index}>
                <h2 style={{ padding: "0 1rem " }}> {course.type} </h2>
                <CoursesList>
                  {course.lessons[0].lessons.map((lesson, idx) => {
                    return (
                      <div
                        key={idx}
                        style={{ textDecoration: "none" }}
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
                            {idx + "- " + truncateTitle(lesson.title, 30)}
                          </span>
                        </CoursesListItem>
                      </div>
                    );
                  })}
                </CoursesList>
              </div>
            ))}
          </div>
        </CoursesListInnerInnerContainer>
      </CoursesListInnerContainer>
      <div
        onClick={handleHideCourses}
        style={{
          display: showCourses ? "block" : "none",
          width: "1000vw",
          height: "1000vw",
        }}
      />
    </CoursesListContainer>
  );
}
export default CoursesSideBar;
