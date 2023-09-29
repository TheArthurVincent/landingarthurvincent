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
import { linkReset } from "../../Resources/UniversalComponents";
import ListOfCourses from "../../assets/mockdata/universalcontent.json";

function CoursesSideBar() {
  const CoursesSideBarItems = ListOfCourses.courses.map((course) => ({
    name: course.name,
    color: course.color,
    url: course.url,
  }));
  const [showCourses, setShowCourses] = useState(false);
  const [arrow, setArrow] = useState(false);
  const handleShowCourses = () => {
    setShowCourses(!showCourses);
    setArrow(!arrow);
  };

  return (
    <CoursesListContainer
      style={showCourses ? { left: "0rem" } : { left: "-13rem" }}
    >
      <CoursesListInnerContainer>
        <CoursesListTitleContainer
          style={{ padding: "0 16px" }}
          onClick={handleShowCourses}
        >
          <h2>{UniversalTexts.myCourses}</h2>
          <ArrowStyle>
            {arrow
              ? UniversalTexts.specialCharacters.leftArrow
              : UniversalTexts.specialCharacters.rightArrow}
          </ArrowStyle>
        </CoursesListTitleContainer>
        <CoursesList>
          {CoursesSideBarItems.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              style={{ ...linkReset, textDecoration: "none" }}
            >
              <CoursesListItem>
                <span>{item.name}</span>
                <span
                  style={{
                    color: item.color,
                    paddingRight: "0.4rem",
                  }}
                >
                  {UniversalTexts.specialCharacters.circle}
                </span>
              </CoursesListItem>
            </Link>
          ))}
        </CoursesList>
      </CoursesListInnerContainer>
      <Mask
        onClick={handleShowCourses}
        style={showCourses ? { display: "block" } : { display: "none" }}
      />
    </CoursesListContainer>
  );
}

export default CoursesSideBar;
