import React, { useState } from "react";
import {
  IFrameVideo,
  getVideoEmbedUrl,
} from "../../Resources/UniversalComponents";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
} from "../../Styles/Styles";
import CoursesSideBar from "../../Application/CoursesSideBar/CoursesSideBar";
import { styled } from "styled-components";

export default function MyCoursesTemplate() {
  const talkingBusiness = {
    courseTitle: "Talking Business",
    courseColor: "#E13300",
    modules: [
      {
        moduleTitle: "module one",
        _id: "1",
        classes: [
          {
            classTitle: "Title 1",
            srcVideos: [
              {
                title: "Title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "Title 2",
            srcVideos: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/742264555?share=copy",
              },
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 3",
            srcVideos: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/664314536?share=copy",
              },
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/742264555?share=copy",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 4",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 5",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 6",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 7",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 8",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 9",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 10",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 11",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=nGs2fH2IaDk",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
        ],
      },
      {
        moduleTitle: "Module two",
        classes: [
          {
            classTitle: "Class 21",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=NlsP-kCQFI4",
              },
            ],
            srcAudios: [
              {
                title: "Class 221",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "Class 23",
            srcVideos: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/664314536?share=copy",
              },
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/742264555?share=copy",
              },
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/742264555?share=copy",
              },
            ],
            srcAudios: [
              {
                title: "title 111",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title 222",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "23",
            srcVideos: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/742264555?share=copy",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
        ],
      },

      {
        moduleTitle: "Module Three",
        classes: [
          {
            classTitle: "Class 2411",
            srcVideos: [
              {
                title: "title",
                src: "https://www.youtube.com/watch?v=NlsP-kCQFI4",
              },
            ],
            srcAudios: [
              {
                title: "Class 22",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "Class 21233",
            srcVideos: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/664314536?share=copy",
              },
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/742264555?share=copy",
              },
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/742264555?share=copy",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
          {
            classTitle: "classe 2s23s323",
            srcVideos: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "https://vimeo.com/742264555?share=copy",
              },
            ],
            srcAudios: [
              {
                title: "title",
                src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
              },
            ],
            srcAttachments: [
              {
                title: "title",
                description:
                  "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
                src: "video",
              },
            ],
          },
        ],
      },
    ],
  };
  const [chosenModule, setChosenModule] = useState(1);
  const [chosenClass, setChosenClass] = useState(1);
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
      background-color: ${talkingBusiness.courseColor};
    }
  `;

  const DivCourse = styled.div`
    max-height: 90vh;
    overflow: auto;
    background-color: ${darkGreyColor()};
    color: ${lightGreyColor()};
    text-transform: capitalize;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${talkingBusiness.courseColor};
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
          backgroundColor: talkingBusiness.courseColor,
          fontSize: "2rem",
          color: lightGreyColor(),
          textAlign: "center",
        }}
      >
        {talkingBusiness.courseTitle}
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
          {talkingBusiness.modules[chosenModule].classes[
            chosenClass
          ].srcVideos.map((videoItem, videoIndex) => {
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
                  <IFrameVideo src={getVideoEmbedUrl(videoItem.src)} />
                )}
                {videoItem.description && <p>{videoItem.description}</p>}
              </div>
            );
          })}
        </DivCourse>
        <DivCourse>
          {talkingBusiness.modules.map((item, index) => {
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
