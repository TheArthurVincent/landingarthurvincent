import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CoursesList,
  CoursesListContainer,
  CoursesListInnerContainer,
  CoursesListItem,
  ArrowStyle,
  Mask,
  CoursesListTitleContainer,
} from "./CoursesSideBarStyled";
import UniversalTexts from "../../Resources/UniversalTexts.json";
import { BackToHomePage, linkReset } from "../../Resources/UniversalComponents";
import { alwaysWhite } from "../../Styles/Styles";

function CoursesSideBar({ courses }) {
  const [showCourses, setShowCourses] = useState(false);
  const [arrow, setArrow] = useState(false);
  const handleShowCourses = () => {
    setShowCourses(true);
    setArrow(true);
  };

  const handleHideCourses = () => {
    setShowCourses(false);
    setArrow(false);
  };

  return (
    <CoursesListContainer
      style={showCourses ? { left: "0rem" } : { left: "-13rem" }}
    >
      <CoursesListInnerContainer
        onMouseOver={handleShowCourses}
        onMouseLeave={handleHideCourses}
      >
        <div>
          <CoursesListTitleContainer style={{ padding: "0 16px" }}>
            <h2>{UniversalTexts.liveClasses}</h2>
            <ArrowStyle>
              {arrow
                ? UniversalTexts.specialCharacters.leftArrow
                : UniversalTexts.specialCharacters.rightArrow}
            </ArrowStyle>
          </CoursesListTitleContainer>
          <CoursesList>
            {courses.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                style={{ ...linkReset, textDecoration: "none" }}
              >
                <CoursesListItem>
                  <span>{item.courseTitle}</span>
                  <span
                    style={{
                      color: item.courseColor,
                      paddingRight: "0.4rem",
                    }}
                  >
                    {UniversalTexts.specialCharacters.circle}
                  </span>
                </CoursesListItem>
              </Link>
            ))}
          </CoursesList>
        </div>
        <div
          style={{
            backgroundColor: alwaysWhite(),
            display: showCourses ? "block" : "none",
          }}
        >
          <BackToHomePage />
        </div>
      </CoursesListInnerContainer>
      <Mask
        onClick={handleShowCourses}
        style={showCourses ? { display: "block" } : { display: "none" }}
      />
    </CoursesListContainer>
  );
}

export default CoursesSideBar;
