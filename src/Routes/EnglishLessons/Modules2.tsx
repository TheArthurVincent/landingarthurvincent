import React, { useEffect, useState } from "react";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import {
  backDomain,
  onLoggOut,
  pathGenerator,
} from "../../Resources/UniversalComponents";
import EnglishCourse from "./EnglishCourse";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { darkGreyColor, secondaryColor } from "../../Styles/Styles";
import { HThree } from "../MyClasses/MyClasses.Styled";

interface ModulesHomeProps {
  headers: MyHeadersType | null;
  courseId: string;
  title: string;
}

export default function Modules({
  headers,
  courseId,
  title,
}: ModulesHomeProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modules, setModules] = useState<any>({});

  const getModules = async () => {
    setLoading(true);
    const actualHeaders = headers || {};
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/module/${courseId}`,
        { headers: actualHeaders }
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao obter aulas");
      // onLoggOut();
      setLoading(false);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  // const filteredLessons = lessons.map((course: any) => ({
  //   ...course,
  //   lessons: course.lessons[0].lessons.filter((cls: any) =>
  //     cls.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   ),
  // }));
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    console.log("Modules component mounted", courseId, title);
  }, []);

  const location = useLocation();
  const isRootPath = location.pathname === "/english-courses";
  return (
    <RouteDiv>
      <Routes>
        {/* {modules.map((module: any, index: number) => (
          <Route
            key={index}
            path={`${pathGenerator(module.title)}`}
            element={<div style={{ padding: "10rem" }}>{module.title}</div>}
          />
        ))} */}
      </Routes>
      <HOne>{title}</HOne>
      {loading ? (
        <CircularProgress />
      ) : (
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
            {title}
          </span>
        </div>
      )}
      <input
          type="text"
          placeholder="Search classes by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ borderRadius: "0.3rem", padding: "0.3rem" }}
        />
      {/* {modules
          .sort((a: any, b: any) => a.order - b.order)
          .map((course: any, index: number) => (
            <div key={index}>
              <HThree>
                {index + 1} | {course.type ? course.type : course.module} - {course.lessons.length} classes
              </HThree>
              <div
                style={{
                  display: "grid",
                  gap: "2px",
                  margin: "0 10px",
                }}
              >
                {course.lessons.map((cls: any, idx: number) => (
                  <div key={idx}>
                    <Link
                      to={pathGenerator(cls.title)}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <CourseCard>
                        <img
                          src={
                            cls.image
                              ? cls.image
                              : "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/bg2.png?updatedAt=1687554564387"
                          }
                          alt={cls.title}
                        />
                        <p>
                          {idx + 1} - {cls.title}
                        </p>
                      </CourseCard>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))} */}
      <Helmets text={title} />
      <Outlet />
    </RouteDiv>
  );
}
