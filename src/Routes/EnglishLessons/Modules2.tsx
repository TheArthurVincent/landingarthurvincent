import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import {
  backDomain,
  onLoggOut,
  pathGenerator,
} from "../../Resources/UniversalComponents";
import axios from "axios";
import { darkGreyColor, secondaryColor } from "../../Styles/Styles";
import { HThreeModule } from "../MyClasses/MyClasses.Styled";
import { CourseCard } from "./EnglishCourses.Styled";
import EnglishClassCourse2 from "./Class2";
import { truncateTitle } from "./CoursesSideBar/CoursesSideBar";

interface ModulesHomeProps {
  headers: MyHeadersType | null;
  courseId: string;
  title: string;
  studentId: any;
}

export default function Modules({
  headers,
  courseId,
  studentId,
  title,
}: ModulesHomeProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modules, setModules] = useState<any>([]);
  const [visibleModules, setVisibleModules] = useState<boolean[]>([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const actualHeaders = headers || {};

  const getModules = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/module/${courseId}`,
        { headers: actualHeaders }
      );

      var mod = response.data.modules;
      console.log(response.data);
      setModules(mod);
      // Inicialize todos os módulos como visíveis
      setVisibleModules(new Array(mod.length).fill(true));
      setLoading(false);
    } catch (error) {
      console.log(error, "Erro ao obter aulas");
      onLoggOut();
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    const { id } = JSON.parse(user || "");
    getModules();
  }, []);

  const toggleModuleVisibility = (index: number) => {
    setVisibleModules((prev) => {
      const newVisibleModules = [...prev];
      newVisibleModules[index] = !newVisibleModules[index];
      return newVisibleModules;
    });
  };

  const loc = useLocation();
  const [displayRouteDiv, setDisplayRouteDiv] = useState<boolean>(true);

  useEffect(() => {
    const isRootPath =
      loc.pathname === `/english-courses/${pathGenerator(title)}/` ||
      loc.pathname === `/english-courses/${pathGenerator(title)}`;
    setDisplayRouteDiv(isRootPath);
  }, [loc.pathname]);

  useEffect(() => {
    // Filtra os módulos com base na pesquisa e atualiza o estado
    const filteredModules = modules.map((module: any) => {
      return {
        ...module,
        classes: module.classes.filter((cls: any) => {
          // Verifica o título e as tags
          const titleMatches = cls.title
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
          const tagsMatch = cls.tags?.some((tag: string) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return titleMatches || tagsMatch;
        }),
      };
    });
    setFiltered(filteredModules);
  }, [searchQuery, modules]);

  return (
    <RouteDiv>
      <Routes>
        {modules.map((module: any, index: number) =>
          module.classes.map((classItem: any, index2: number) => {
            const isLastModule = index === modules.length - 1;
            const isLastClass = index2 === module.classes.length - 1;
            return (
              <Route
                key={`${index}-${index2}`}
                path={`${classItem._id}/`}
                element={
                  <EnglishClassCourse2
                    studentsWhoCompletedIt={classItem.studentsWhoCompletedIt}
                    headers={headers}
                    classId={classItem._id}
                    course={courseId}
                    previousClass={
                      index2 == 0 ? "123456" : module.classes[index2 - 1]._id
                    }
                    nextClass={
                      !isLastClass
                        ? module.classes[index2 + 1]._id
                        : !isLastModule && modules[index + 1]?.classes[0]?._id
                        ? modules[index + 1]?.classes[0]?._id
                        : "123456"
                    }
                    order={index2}
                    courseTitle={title}
                  />
                }
              />
            );
          })
        )}
      </Routes>
      {displayRouteDiv ? (
        <div>
          <HOne>{title}</HOne>
          {loading ? (
            <>...</>
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
                onClick={() => window.location.assign("/english-courses")}
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
            onChange={(e) => {
              console.log(e.target.value, searchQuery);
              setSearchQuery(e.target.value);
            }}
            style={{ borderRadius: "0.3rem", padding: "0.3rem" }}
          />
          {filtered
            .sort((a: any, b: any) => a.order - b.order)
            .map((module: any, index: number) => (
              <div key={index}>
                <HThreeModule onClick={() => toggleModuleVisibility(index)}>
                  {index + 1} |{" "}
                  {module.moduleTitle ? module.moduleTitle : `Module #${index}`}{" "}
                  - {module.classes.length} classes
                </HThreeModule>
                {visibleModules[index] && (
                  <div
                    style={{
                      display: "grid",
                      gap: "2px",
                      margin: "0 10px",
                    }}
                  >
                    {module.classes.map((cls: any, idx: number) => (
                      <div
                        style={{
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                        key={idx}
                      >
                        <Link
                          to={cls._id}
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <CourseCard>
                            {
                              <i
                                style={{
                                  color: "white",
                                  backgroundColor: "green",
                                  padding: "1px",
                                  borderRadius: "50%",
                                  margin: "0 0.5rem",
                                }}
                                className={
                                  cls.studentsWhoCompletedIt.includes(studentId)
                                    ? `fa fa-check`
                                    : `fa fa-circle`
                                }
                              />
                            }
                            {/* <img
                              src={
                                cls.image
                                  ? cls.image
                                  : "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/bg2.png?updatedAt=1687554564387"
                              }
                              alt={cls.title}
                            /> */}
                            <p className="hoverable-paragraph">
                              #{idx + 1} - {cls.title}
                              <span
                                className="hidden-span"
                                style={{
                                  fontStyle: "italic",
                                  fontWeight: "400",
                                  fontSize: "10px",
                                  marginLeft: "1rem",
                                }}
                              >
                                {cls.tags.length > 0 &&
                                  truncateTitle(
                                    cls.tags.join(", ").toLowerCase(),
                                    30
                                  )}
                              </span>
                            </p>
                          </CourseCard>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          <Helmets text={title} />
        </div>
      ) : null}
      <Outlet />
    </RouteDiv>
  );
}
