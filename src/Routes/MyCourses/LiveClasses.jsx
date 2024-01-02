import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link } from "react-router-dom";
import {
  BackToHomePage,
  ButtonButton,
  IFrameVideo,
  backDomain,
  getVideoEmbedUrl,
} from "../../Resources/UniversalComponents";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { lightGreyColor } from "../../Styles/Styles";

export default function MyCourses() {
  const { UniversalTexts } = useUserContext();
  const [courses, setCourses] = useState([]);
  const [moduleTitle, setModuleTitle] = useState("");
  const [courseTitle, setCourseTitle] = useState("Select the type of classes");
  const [loading, setLoading] = useState(false);
  const [allModulesFromTheCourse, setAllModulesFromTheCourse] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [isClassVisible, setIsClassVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [currentClassIndex, setCurrentClassIndex] = useState(0);
  const [seeModules, setSeeModules] = useState(false);

  const back = () => {
    setIsClassVisible(false);
  };
  const selectClass = () => {
    setIsClassVisible(true);
  };

  const navigateToNextClass = () => {
    if (currentClassIndex < allModulesFromTheCourse.length - 1) {
      setCurrentClassIndex(currentClassIndex + 1);
    } else {
      // Se chegou à última aula do módulo, avance para o próximo módulo (se existir)
      const nextModuleIndex =
        allModulesFromTheCourse.findIndex(
          (module) => module.moduleName === moduleTitle
        ) + 1;

      if (nextModuleIndex < allModulesFromTheCourse.length) {
        setCurrentClassIndex(0);
        setModuleTitle(allModulesFromTheCourse[nextModuleIndex].moduleName);
      }
    }
  };

  const navigateToPreviousClass = () => {
    if (currentClassIndex > 0) {
      setCurrentClassIndex(currentClassIndex - 1);
    } else {
      // Se estiver na primeira aula do módulo, volte para a última aula do módulo anterior (se existir)
      const prevModuleIndex =
        allModulesFromTheCourse.findIndex(
          (module) => module.moduleName === moduleTitle
        ) - 1;

      if (prevModuleIndex >= 0) {
        const prevModule = allModulesFromTheCourse[prevModuleIndex];
        setCurrentClassIndex(prevModule.classes.length - 1);
        setModuleTitle(prevModule.moduleName);
      }
    }
  };
  const fetchCoursesTitles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/courses?partner=${1}`
      );
      console.log(response.data);
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error, "Erro ao importar posts");
    }
  };

  const setClass = (
    thetitle,
    thevideoUrl,
    thedescription,
    thegoogleDriveLink,
    moduleName
  ) => {
    setVideoUrl(thevideoUrl);
    setDescription(thedescription);
    setGoogleDriveLink(thegoogleDriveLink);
    setTitle(thetitle);
    setModuleTitle(moduleName);
    selectClass();
  };

  const fetchCourse = async (selectedCourse) => {
    setSeeModules(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/course?courseName=${selectedCourse}`
      );
      console.log(response.data);
      setCourseTitle(selectedCourse);
      setAllModulesFromTheCourse(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error, "Erro ao importar posts");
    }
  };

  useEffect(() => {
    fetchCoursesTitles();
  }, []);

  return (
    <>
      <TopBar />
      <RouteSizeControlBox
        style={{ display: !isClassVisible ? "block" : "none" }}
        className="smooth"
      >
        <RouteDiv>
          <HOne>{UniversalTexts.liveClasses}</HOne>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => fetchCoursesTitles()}>
              <i className="fa fa-refresh" aria-hidden="true"></i>
            </Button>
            <BackToHomePage />
          </span>{" "}
          {loading ? (
            <CircularProgress />
          ) : (
            <div
              style={{
                padding: "1rem",
                display: "flex",
                gap: "1rem",
                margin: "0 1rem",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <Select
                value={courseTitle}
                onChange={(e) => fetchCourse(e.target.value)}
              >
                <MenuItem disabled value="Select the type of classes">
                  Select the type of classes
                </MenuItem>

                {courses.map((course, index) => (
                  <MenuItem key={index} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          <span style={{ display: seeModules ? "block" : "none" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <div
                style={{
                  border: "grey 1px solid",
                  gap: "1rem",
                }}
              >
                <HOne>{courseTitle}</HOne>
                {allModulesFromTheCourse.map((theModule, index) => (
                  <div key={index}>
                    <h2
                      style={{
                        backgroundColor: lightGreyColor(),
                        padding: "1rem",
                      }}
                    >
                      {theModule.moduleName}
                    </h2>
                    {theModule.classes.map((classItem, innerIndex) => (
                      <div style={{}} key={innerIndex}>
                        {classItem.classTitle && (
                          <p
                            onClick={() =>
                              setClass(
                                classItem.classTitle,
                                classItem.videoUrl,
                                classItem.description,
                                classItem.googleDriveLink,
                                theModule.moduleName
                              )
                            }
                            style={{
                              padding: "0.5rem",
                              cursor: "pointer",
                            }}
                          >
                            {classItem.classTitle}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </span>
        </RouteDiv>
      </RouteSizeControlBox>
      <RouteSizeControlBox
        style={{
          display: isClassVisible ? "block" : "none",
          maxWidth: "fit-content",
        }}
      >
        <RouteDiv>
          {title && (
            <HThree style={{ margin: 0, marginBottom: "1rem" }}>{title}</HThree>
          )}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-around",
            }}
          >
            <span>
              <span onClick={() => back()}>
                {ButtonButton(`Voltar aos cursos `)}
              </span>{" "}
              {videoUrl && (
                <IFrameVideo src={getVideoEmbedUrl(videoUrl)} frameBorder="0" />
              )}
              {description && (
                <p
                  style={{
                    padding: "1rem",
                  }}
                >
                  {description}
                </p>
              )}
              {googleDriveLink && (
                <Button>
                  <Link to={googleDriveLink} target="_blank">
                    {" "}
                    Pasta da aula
                  </Link>
                </Button>
              )}
            </span>
            <span>
              {" "}
              {loading ? (
                <CircularProgress />
              ) : (
                <div
                  style={{
                    border: "grey 1px solid",
                    gap: "1rem",
                    fontSize: "0.8rem",
                  }}
                >
                  {allModulesFromTheCourse.map((theModule, index) => (
                    <div key={index}>
                      <h2
                        style={{
                          backgroundColor: lightGreyColor(),
                          padding: "0.3rem",
                        }}
                      >
                        {theModule.moduleName}
                      </h2>
                      {theModule.classes.map((classItem, innerIndex) => (
                        <div style={{}} key={innerIndex}>
                          {classItem.classTitle && (
                            <p
                              onClick={() =>
                                setClass(
                                  classItem.classTitle,
                                  classItem.videoUrl,
                                  classItem.description,
                                  classItem.googleDriveLink,
                                  theModule.moduleName
                                )
                              }
                              style={{
                                padding: "0.5rem",
                                cursor: "pointer",
                              }}
                            >
                              {classItem.classTitle}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </span>
          </div>
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}

// const fetchData = async () => {
//   try {
//     const response = await axios.get(
//       `${backDomain}/api/v1/courseclass?moduleTitle=${moduleTitle}&courseTitle=${courseTitle}`
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error, "Erro ao importar posts");
//   }
// };
