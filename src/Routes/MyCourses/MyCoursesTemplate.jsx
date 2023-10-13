import React, { useState } from "react";
import {
  BackToHomePage,
  IFrameVideo,
  getVideoEmbedUrl,
} from "../../Resources/UniversalComponents";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  alwaysBlack,
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
  primaryColor,
} from "../../Styles/Styles";
import { HOne, HThree, HTwo } from "../../Resources/Components/RouteBox";

const talkingBusiness = {
  courseTitle: "Talking Business",
  modules: [
    {
      moduleTitle: "module one",
      _id: "1",
      classes: [
        {
          classTitle: "classe 1",
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
            { title: "title", description: "Lorem", src: "video" },
          ],
        },
        {
          classTitle: "classe 2",
          srcVideos: [
            {
              title: "title",
              description: "Lorem",
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
            { title: "title", description: "Lorem", src: "video" },
          ],
        },
        {
          classTitle: "classe 3",
          srcVideos: [
            {
              title: "title",
              description: "Lorem",
              src: "https://vimeo.com/664314536?share=copy",
            },
            {
              title: "title",
              description: "Lorem",
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
            { title: "title", description: "Lorem", src: "video" },
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
              title: "Class 22",
              src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
            },
          ],
          srcAttachments: [
            { title: "title", description: "Lorem", src: "video" },
          ],
        },
        {
          classTitle: "Class 23",
          srcVideos: [
            {
              title: "title",
              description: "Lorem",
              src: "https://vimeo.com/664314536?share=copy",
            },
            {
              title: "title",
              description: "Lorem",
              src: "https://vimeo.com/742264555?share=copy",
            },
            {
              title: "title",
              description: "Lorem",
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
            { title: "title", description: "Lorem", src: "video" },
          ],
        },
        {
          classTitle: "classe 2ss323",
          srcVideos: [
            {
              title: "title",
              description: "Lorem",
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
            { title: "title", description: "Lorem", src: "video" },
          ],
        },
      ],
    },
  ],
};

export default function MyCoursesTemplate() {
  const { UniversalTexts } = useUserContext();
  const [chosenModule, setChosenModule] = useState(1);
  const [chosenClass, setChosenClass] = useState(1);
  const [chosenTitle, setChosenTitle] = useState(1);

  const choseClass = (selectedModule, selectedClass, selectedTitle) => {
    setChosenModule(selectedModule);
    setChosenClass(selectedClass);
    setChosenTitle(selectedTitle);
  };

  return (
    <>
      
      <TopBar />
      
      <HOne
        style={{
          marginBottom: 0,
        }}
      >
        {talkingBusiness.courseTitle}
      </HOne>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          backgroundColor: alwaysWhite(),
          marginTop: "1rem",
          color: alwaysBlack(),
          margin: "1rem auto",
          maxWidth: "95vw",
        }}
      >
        <div>
          {talkingBusiness.modules.map((item, index) => {
            return (
              <>
                <ul
                  style={{
                    maxWidth: "25rem",
                  }}
                >
                  <li
                    style={{
                      backgroundColor: darkGreyColor(),
                      color: lightGreyColor(),
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
                          <li
                            style={{
                              color: darkGreyColor(),
                              backgroundColor: lightGreyColor(),
                              listStyle: "none",
                              padding: "0.2rem",
                              cursor: "pointer",
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
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </>
            );
          })}
        </div>
        <div>
          <BackToHomePage />

          <div>
            {talkingBusiness.modules[chosenModule].classes[
              chosenClass
            ].srcVideos.map((videoItem, videoIndex) => {
              return (
                <div>
                  <h2>{chosenTitle}</h2>
                  <h3 style={{ textAlign: "center" }}>{videoItem.title}</h3>
                  <IFrameVideo src={getVideoEmbedUrl(videoItem.src)} />
                  <p>{videoIndex.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
