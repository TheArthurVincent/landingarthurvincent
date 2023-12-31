import React from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link } from "react-router-dom";
import { CourseCard } from "./LiveClasses.Styled";
import { BackToHomePage } from "../../Resources/UniversalComponents";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";

export default function LiveClasses({ courses }) {
  const { UniversalTexts } = useUserContext();

  return (
    <>
      <TopBar />
      <RouteSizeControlBox className="smooth">
        <RouteDiv>
          <HOne>{UniversalTexts.liveClasses}</HOne>
          <BackToHomePage />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              margin: "0 1rem",
              flexDirection: "row-reverse",
              flexWrap: "wrap",
            }}
          >
            {courses.map((course, index) => {
              return (
                <Link key={index} to={course.link} /*target="_blank"*/>
                  <CourseCard style={{ backgroundColor: course.courseColor }}>
                    <h3
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      {course.courseTitle}
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
