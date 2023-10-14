import React, { useState } from "react";
import {
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
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${courseColor};
    }

    &::-webkit-scrollbar-track {
      background-color: ${lightGreyColor()};
    }
  `;

  return (
    <div style={{ marginLeft: "2.6rem" }}>
      <CoursesSideBar />
      <h1
        style={{
          marginBottom: 0,
          padding: "1rem",
          backgroundColor: courseColor,
          fontSize: "2rem",
          color: lightGreyColor(),
          textAlign: "center",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 1fr 16rem",
          maxWidth: "99vw",
        }}
      >
        <DivCourse>
          <h2
            style={{
              textAlign: "left",
              fontSize: "2rem",
              padding: "0.7rem",
              backgroundColor: alwaysBlack(),
              color: alwaysWhite(),
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
        <DivCourse>
          {modules.map((item, index) => {
            return (
              <div>
                <ul
                  style={{
                    maxWidth: "16rem",
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
        </DivCourse>
      </div>
    </div>
  );
}
