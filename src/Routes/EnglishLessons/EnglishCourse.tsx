import React, { act, useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { pathGenerator } from "../../Resources/UniversalComponents";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { CourseCard } from "../EnglishMaterial/EnglishMaterial.Styled";
import EnglishLessonsRender from "./Assets/EnglishCourseClassRender";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { darkGreyColor, secondaryColor } from "../../Styles/Styles";

interface EnglishCourseHomeProps {
  headers: MyHeadersType | null;
  less: any | null;
  back: any | null;
}

export default function EnglishCourse({
  headers,
  less,
  back,
}: EnglishCourseHomeProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const arr = Object.entries(
    less.groupedLessonsArray.reduce((acc: any, lesson: any) => {
      if (!acc[lesson.type ? lesson.type : lesson.module]) {
        acc[lesson.type ? lesson.type : lesson.module] = [];
      }
      acc[lesson.type ? lesson.type : lesson.module].push(lesson);
      return acc;
    }, {})
  ).map(([type, lessons]) => ({ type, lessons }));

  const groupedLessonsArray = arr.sort((a: any, b: any) => a.order - b.order);
  ///
  const filteredLessons = groupedLessonsArray.map((course: any) => ({
    ...course,
    lessons: course.lessons[0].lessons.filter((cls: any) =>
      cls.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const [displayy, setDisplayy] = useState<string>("block");

  const location = useLocation();
  const actualPthn = "/english-courses/" + back;
  const isRootPath = location.pathname === actualPthn;
  useEffect(() => {
    if (isRootPath) {
      setDisplayy("block");
    } else {
      setDisplayy("none");
    }
  }, []);

  return (
    <>
      <Routes>
        {filteredLessons.map((course: any, index: number) =>
          course.lessons.map((cls: any, idx: number) => (
            <Route
              key={idx}
              path={`${pathGenerator(cls.title)}`}
              element={
                <EnglishLessonsRender
                  courseTitle={less.title}
                  previousclass={
                    filteredLessons[index].lessons[idx - 1]
                      ? filteredLessons[index].lessons[idx - 1]
                      : null
                  }
                  nextclass={
                    filteredLessons[index].lessons[idx + 1]
                      ? filteredLessons[index].lessons[idx + 1]
                      : null
                  }
                  order={idx}
                  back={back}
                  pthtt={pathGenerator(cls.title)}
                  course={groupedLessonsArray}
                  theclass={cls}
                  headers={headers}
                  module={less.title}
                />
              }
            />
          ))
        )}
      </Routes>
      <RouteDiv style={{ display: displayy }}>
        <HOne>{less.title}</HOne>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            justifyContent: "left",
            gap: "1rem",
          }}
        >
          <Link
            style={{
              fontSize: "10px",
              textDecoration: "none",
              color: darkGreyColor(),
            }}
            to="/english-courses"
          >
            English Courses
          </Link>
          <span
            style={{
              color: darkGreyColor(),
            }}
          >
            -
          </span>
          <span
            style={{
              color: secondaryColor(),
              fontSize: "10px",
              fontStyle: "italic",
              textDecoration: "none",
            }}
          >
            {less.title}
          </span>
        </div>
        <input
          type="text"
          placeholder="Search classes by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ borderRadius: "0.3rem", padding: "0.3rem" }}
        />
        {filteredLessons
          .sort((a: any, b: any) => a.order - b.order)
          .map((course: any, index: number) => (
            <div key={index}>
              <HThree>
                {index + 1} | {course.type ? course.type : course.module}
              </HThree>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: "1rem",
                  margin: "0 1rem",
                  overflowY: "auto",
                  overflowX: "scroll",
                  maxWidth: "100%",
                  padding: "0.5rem",
                }}
              >
                {course.lessons.map((cls: any, idx: number) => (
                  <div key={idx}>
                    <Link
                      to={pathGenerator(cls.title)}
                      onClick={() => {
                        setDisplayy("none");
                      }}
                    >
                      <CourseCard>
                        <p>{idx +1} - {cls.title}</p>
                        <img
                          style={{
                            margin: "auto",
                            width: "8rem",
                            height: "8rem",
                            objectFit: "cover",
                            objectPosition: "center center",
                          }}
                          src={
                            cls.image
                              ? cls.image
                              : "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/bg2.png?updatedAt=1687554564387"
                          }
                          alt={cls.title}
                        />
                      </CourseCard>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

        <Helmets text="Courses" />
        <Outlet />
      </RouteDiv>
    </>
  );
}
