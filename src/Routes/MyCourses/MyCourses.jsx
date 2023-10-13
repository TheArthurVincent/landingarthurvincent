import React from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link } from "react-router-dom";
import { CourseCard } from "./MyCourses.Styled";
import { BackToHomePage } from "../../Resources/UniversalComponents";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import MyCoursesTemplate from "./MyCoursesTemplate";

const courses = [
  {
    title: "Talking Business",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/business.jpg?updatedAt=1697220823801",
    link: "/talking-business",
  },
  {
    title: "Biblical English",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/biblical.jpg?updatedAt=1697220790416",
    link: "/biblical-english",
  },
];

export default function MyCourses() {
  const { UniversalTexts } = useUserContext();

  return (
    <>
      <MyCoursesTemplate />
      <TopBar />{" "}
      <RouteSizeControlBox>
        <RouteDiv>
          <HOne>{UniversalTexts.myCourses}</HOne>
          <BackToHomePage />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              gap: "1rem",
              margin: "0 1rem",
              flexDirection: "row-reverse",
              flexWrap: "wrap",
            }}
          >
            {courses.map((course, index) => {
              return (
                <Link key={index} to={course.link} target="_blank">
                  <CourseCard>
                    <h3
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      {course.title}
                    </h3>
                    <img
                      style={{
                        height: "240px",
                        width: "240px",
                        objectFit: "cover",
                        objectPosition: "left",
                      }}
                      src={course.img}
                      alt=""
                    />
                  </CourseCard>
                </Link>
              );
            })}
          </div>
          <BackToHomePage />
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}
