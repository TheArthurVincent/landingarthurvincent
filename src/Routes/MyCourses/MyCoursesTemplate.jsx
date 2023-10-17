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
  transparentBlack,
} from "../../Styles/Styles";
import CoursesSideBar from "../../Application/CoursesSideBar/CoursesSideBar";
import { styled } from "styled-components";

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
    padding: 0.2rem;
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
      <h1
        style={{
          marginBottom: 0,
          padding: "0.3rem",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: alwaysWhite(),
          backgroundColor: alwaysBlack(),

          textAlign: "center",
        }}
      >
        {title}
      </h1>
      <FullDisplay>
        <DivCourse>
          <h2
            style={{
              textAlign: "right",
              fontSize: "1.3rem",
              padding: "0.7rem",
              fontWeight: 500,
              color: lightGreyColor(),
              backgroundColor: darkGreyColor(),
              textTransform: "capitalize",
            }}
          >
            {chosenTitle}
          </h2>
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
                        textAlign: "center",
                        margin: "0.5rem",
                        fontSize: "1.5rem",
                        color: alwaysBlack(),
                      }}
                    >
                      {videoItem.title}
                    </h3>
                  )}{" "}
                  {videoItem.src && (
                    <IFrameVideoCourses src={getVideoEmbedUrl(videoItem.src)} />
                  )}
                  {videoItem.description && <p>{videoItem.description}</p>}
                </div>
              );
            }
          )}
        </DivCourse>
        <SideBarCourse
          style={{
            borderLeft: `1px solid ${courseColor}`,
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
                        padding: "0.3rem ",
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
