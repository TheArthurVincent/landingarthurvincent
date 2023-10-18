import React, { useState } from "react";
import {
  BackToHomePage,
  IFrameVideoCourses,
  getVideoEmbedUrl,
} from "../../Resources/UniversalComponents";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
  primaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import CoursesSideBar from "../../Application/CoursesSideBar/CoursesSideBar";
import { styled } from "styled-components";
import TopBar from "../../Application/TopBar/TopBar";

export default function MyCoursesTemplate({
  title,
  courseColor,
  img,
  modules,
}) {
  const [chosenModule, setChosenModule] = useState(0);
  const [chosenClass, setChosenClass] = useState(0);
  const [chosenTitle, setChosenTitle] = useState("Class 1");

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
      color: ${alwaysWhite()};
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
      <CoursesSideBar />
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
          {modules[chosenModule].classes[chosenClass].srcVideos.map(
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
                  {videoItem.src && (
                    <IFrameVideoCourses src={getVideoEmbedUrl(videoItem.src)} />
                  )}
                  {videoItem.description && (
                    <p style={{ color: alwaysBlack() }}>
                      {videoItem.description}
                    </p>
                  )}
                </div>
              );
            }
          )}
        </DivCourse>
        <SideBarCourse
          style={{
            borderLeft: `1px solid ${lightGreyColor()}`,
          }}
        >
          <BackToHomePage />
          {modules.map((item, index) => {
            return (
              <div>
                <ul>
                  <li
                    style={{
                      listStyle: "none",
                    }}
                  >
                    <h2
                      style={{
                        padding: "0.3rem 1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.moduleTitle}
                    </h2>
                    <div>
                      <ul>
                        {item.classes.map((classItem, classIndex) => (
                          <LiItem
                            style={{
                              backgroundColor:
                                classItem.classTitle == chosenTitle
                                  ? "black"
                                  : "none",
                              color:
                                classItem.classTitle == chosenTitle
                                  ? "white"
                                  : "none",
                              cursor:
                                classItem.classTitle == chosenTitle
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
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </SideBarCourse>
      </FullDisplay>
    </div>
  );
}
