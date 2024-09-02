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
import { CourseCard } from "./EnglishCourses.Styled";

interface ModulesHomeProps {
  headers: MyHeadersType | null;
  courseId: string;
  title: string;
  displayy: boolean;
  setDisplayy: any;
}

export default function Modules({
  headers,
  courseId,
  setDisplayy,
  displayy,
  title,
}: ModulesHomeProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modules, setModules] = useState<any>([]);

  const getModules = async () => {
    setLoading(true);
    const actualHeaders = headers || {};
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/module/${courseId}`,
        { headers: actualHeaders }
      );
      console.log(response.data.modules);
      const mod = response.data.modules;
      setModules(mod);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao obter aulas");
      // onLoggOut();
      setDisplayy(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getModules();
    setDisplayy(!displayy);
    console.log(
      "modules",
      modules.map((module: any) => {
        module;
      })
    );
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");

  var refreshEC = () => {
    window.location.assign("/english-courses");
  };

  useEffect(() => {
    console.log("Modules component mounted", courseId, title);
  }, []);

  interface ClassType {
    title: string;
  }

  interface ModuleType {
    classes: ClassType[];
  }

  return (
    <RouteDiv>
      <Routes>
        {modules.map((module: ModuleType, index: number) =>
          module.classes.map((classItem: ClassType, index2: number) => (
            <Route
              key={`${index}-${index2}`}
              path={`${pathGenerator(classItem.title)}`}
              element={
                <div style={{ padding: "10rem" }}>
                  <p>{classItem.title}</p>
                </div>
              }
            />
          ))
        )}
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
          <span
            style={{
              fontSize: "10px",
              cursor: "pointer",
              textDecoration: "none",
              color: darkGreyColor(),
            }}
            onClick={refreshEC}
          >
            English Courses
          </span>
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
      {modules
        .sort((a: any, b: any) => a.order - b.order)
        .map((module: any, index: number) => (
          <div key={index}>
            <HThree>
              {index + 1} |{" "}
              {module.moduleTitle ? module.moduleTitle : `Module #${index}`} -{" "}
              {module.classes.length} classes
            </HThree>
            <div
              style={{
                display: "grid",
                gap: "2px",
                margin: "0 10px",
              }}
            >
              {module.classes.map((cls: any, idx: number) => (
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
        ))}
      <Helmets text={title} />
      <Outlet />
    </RouteDiv>
  );
}
