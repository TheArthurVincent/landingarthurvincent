import React, { useState } from "react";
import {
  BackToHomePage,
  IFrameVideo,
  IFrameVideoCourses,
  getVideoEmbedUrl,
} from "../../Resources/UniversalComponents";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
  transparentBlack,
  transparentWhite,
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
    background-color: ${darkGreyColor()};
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
  `;

  const SideBarCourse = styled.div`
    height: 100vh;
    overflow: auto;
    background-color: ${darkGreyColor()};
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
  `;

  return (
    <div>
      <CoursesSideBar />
      <h1
        style={{
          marginBottom: 0,
          padding: "0.3rem",
          backgroundColor: courseColor,
          fontSize: "1.5rem",
          fontWeight: 600,
          color: lightGreyColor(),
          textAlign: "center",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 1fr 13rem",
          maxWidth: "100vw",
        }}
      >
        <DivCourse>
          <h2
            style={{
              textAlign: "right",
              fontSize: "1.3rem",
              padding: "0.7rem",
              fontWeight: 500,
              backgroundColor: alwaysBlack(),
              color: alwaysWhite(),
              textTransform: "capitalize",
              boxShadow: `2px 2px 20px 5px ${alwaysBlack()}`,
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
        <SideBarCourse>
          <BackToHomePage />
          {modules.map((item, index) => {
            return (
              <div>
                <ul
                  style={{
                    maxWidth: "13rem",
                  }}
                >
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
      </div>
    </div>
  );
}
