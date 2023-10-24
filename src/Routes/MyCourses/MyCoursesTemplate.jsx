import React, { useEffect, useState } from "react";
import {
  BackToHomePage,
  IFrameVideoCourses,
  backDomain,
  getVideoEmbedUrl,
  linkReset,
  linkReset2,
} from "../../Resources/UniversalComponents";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import CoursesSideBar from "../../Application/CoursesSideBar/CoursesSideBar";
import { styled } from "styled-components";
import TopBar from "../../Application/TopBar/TopBar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyCoursesTemplate({
  _id,
  title,
  courseColor,
  courses,
}) {
  const [courseModules, setCourseModules] = useState([]);
  const [chosenModule, setChosenModule] = useState(0);
  const [chosenClass, setChosenClass] = useState(0);
  const [chosenTitle, setChosenTitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${backDomain}/api/v1/moduleforcourse/${_id}`
        );
        console.log(response.data.modules);
        setCourseModules(response.data.modules);
        console.log(courseModules);
      } catch (error) {
        alert("Erro ao importar módulos");
      }
    }
    fetchData();
  }, []);

  const choseClass = (selectedModule, selectedClass, selectedTitle) => {
    setChosenModule(selectedModule);
    setChosenClass(selectedClass);
    setChosenTitle(selectedTitle);
  };
  const LiItem = styled.li`
    color: ${alwaysBlack()};
    background-color: ${alwaysWhite()};
    list-style: none;
    padding: 0.2rem 0.8rem;
    cursor: pointer;
    &:hover {
      color: ${alwaysWhite()} !important;
      background-color: ${courseColor};
    }
  `;

  const DivCourse = styled.div`
    height: 100vh;
    overflow: auto;
    background-color: ${alwaysWhite()};
    color: ${lightGreyColor()};
    text-transform: capitalize;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${courseColor};
    }

    &::-webkit-scrollbar-track {
      background-color: ${alwaysWhite()};
    }
    @media (max-width: 800px) {
      max-height: 45vh;
    }
  `;

  const SideBarCourse = styled.div`
    height: 100vh;
    overflow: auto;
    background-color: ${lightGreyColor()};
    color: ${darkGreyColor()};
    text-transform: capitalize;
    border-left: 1px solid lightGreyColor();

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${courseColor};
    }

    &::-webkit-scrollbar-track {
      background-color: ${alwaysWhite()};
    }
    @media (max-width: 800px) {
      border-top: 1px solid ${courseColor};
    }
  `;
  const FullDisplay = styled.div`
    display: grid;
    grid-template-columns: 1fr 13rem;
    max-width: 100vw;
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  `;

  return (
    <div>
      <CoursesSideBar courses={courses} />
      <TopBar />
      <div>
        <h1
          style={{
            marginBottom: 0,
            padding: "0.5rem 0",
            fontSize: "2rem",
            fontWeight: 600,
            backgroundColor: lightGreyColor(),
            color: alwaysBlack(),
            textAlign: "center",
          }}
        >
          {title}
        </h1>
        <h2
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            padding: "5px",
            fontSize: "1.3rem",
            fontWeight: 500,
            color: courseColor,
            backgroundColor: textPrimaryColorContrast(),
            textTransform: "capitalize",
          }}
        >
          {chosenTitle}
        </h2>
      </div>
      <FullDisplay>
        <DivCourse>
          {courseModules[chosenModule] &&
            courseModules[chosenModule].classes &&
            courseModules[chosenModule].classes[chosenClass] &&
            courseModules[chosenModule].classes[chosenClass].srcVideos.map(
              (videoItem, videoIndex) => {
                return (
                  <div
                    key={videoIndex}
                    style={{
                      padding: "1rem",
                      display: "grid",
                      gap: "1rem",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    {videoItem.title && (
                      <h3
                        style={{
                          textTransform: "capitalize",
                          textAlign: "left",
                          margin: "0.5rem",
                          fontSize: "1.2rem",
                          borderLeft: `3px solid ${courseColor}`,
                          borderRadius: "0.5rem",
                          paddingLeft: "1rem",
                          color: courseColor,
                        }}
                      >
                        {videoItem.title}
                      </h3>
                    )}{" "}
                    {videoItem.url && (
                      <IFrameVideoCourses
                        src={getVideoEmbedUrl(videoItem.url)}
                      />
                    )}
                    {videoItem.description && (
                      <p style={{ color: alwaysBlack(), maxWidth: "120ch" }}>
                        {videoItem.description}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          {courseModules[chosenModule] &&
            courseModules[chosenModule].classes &&
            courseModules[chosenModule].classes[chosenClass] &&
            courseModules[chosenModule].classes[chosenClass].srcAttachments.map(
              (att, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      padding: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      maxWidth: "30rem",
                      margin: "5px auto",
                      borderRadius: "0.5rem",
                      backgroundColor: alwaysBlack(),
                    }}
                  >
                    {att.title && att.description && (
                      <span style={{ maxWidth: "120ch" }}>
                        {att.description}
                      </span>
                    )}{" "}
                    |
                    {att.src && (
                      <Link
                        to={att.src}
                        style={{ textDecoration: "underline" }}
                      >
                        {att.title}
                      </Link>
                    )}
                  </div>
                );
              }
            )}
        </DivCourse>
        <SideBarCourse>
          <BackToHomePage />
          {courseModules.map((item, index) => {
            return item ? (
              <div key={index}>
                <ul>
                  <li
                    style={{
                      listStyle: "none",
                    }}
                  >
                    <h2
                      style={{
                        padding: "0.3rem 1rem",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.moduleTitle}
                    </h2>
                    <div>
                      {item.classes && (
                        <ul>
                          {item.classes.map((classItem, classIndex) => (
                            <LiItem
                              style={{
                                fontSize: "1rem",
                                paddingLeft: "8px",
                                borderRadius:
                                  classItem.classTitle === chosenTitle
                                    ? "0.2rem"
                                    : "none",
                                borderLeft:
                                  classItem.classTitle === chosenTitle
                                    ? `4px solid ${courseColor}`
                                    : "none",
                                color:
                                  classItem.classTitle === chosenTitle
                                    ? courseColor
                                    : "none",
                                fontWeight:
                                  classItem.classTitle === chosenTitle
                                    ? 800
                                    : "none",
                                cursor:
                                  classItem.classTitle === chosenTitle
                                    ? "auto"
                                    : "pointer",
                              }}
                              key={classIndex}
                              onClick={() => {
                                choseClass(
                                  index,
                                  classIndex,
                                  classItem.classTitle
                                );
                              }}
                            >
                              {classItem.classTitle}
                            </LiItem>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            ) : null;
          })}
        </SideBarCourse>
      </FullDisplay>
    </div>
  );
}
