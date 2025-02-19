import React, { useEffect, useState } from "react";
import axios from "axios";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import {
  backDomain,
  getVideoEmbedUrl,
  onLoggOut,
  pathGenerator,
  Xp,
} from "../../Resources/UniversalComponents";
import { HOne, HTwo } from "../../Resources/Components/RouteBox";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { Link } from "react-router-dom";
import {
  alwaysWhite,
  darkGreyColor,
  primaryColor,
  secondaryColor,
  textTitleFont,
  transparentBlack,
} from "../../Styles/Styles";
import Helmets from "../../Resources/Helmets";
import { ImgLesson } from "./Assets/Functions/EnglishActivities.Styled";
import { IFrameVideoBlog } from "../Blog/Blog.Styled";
import VideoLessonModel from "./Assets/LessonsModels/VideoLessonModel";
import SentenceLessonModel from "./Assets/LessonsModels/SentenceLessonModel";
import TextLessonModel from "./Assets/LessonsModels/TextLessonModel";
import MultipleTextsLessonModel from "./Assets/LessonsModels/MultipleTextsLessonModel";
import SelectExercise from "./Assets/LessonsModels/MultipleSelectExercise";
import ImageLessonModel from "./Assets/LessonsModels/ImageLessonModel";
import ExerciseLessonModel from "./Assets/LessonsModels/ExerciseLessonModel";
import DialogueLessonModel from "./Assets/LessonsModels/DialogueLessonModel";
import SingleImageLessonModel from "./Assets/LessonsModels/SingleImageLessonModel";
import ListenAndTranslateLessonModel from "./Assets/LessonsModels/ListenAndTranslateLessonModel";
import TextsWithTranslateLessonModel from "./Assets/LessonsModels/TextWithNoAudio";
import SentenceLessonModelSlide from "./Assets/SlideModels/SentenceLessonModelSlide";
import TextLessonModelSlide from "./Assets/SlideModels/TextLessonModelSlide";
import TextsWithTranslateSlideLessonModel from "./Assets/SlideModels/TextWithNoAudio";
import ExerciseLessonModelLesson from "./Assets/LessonsModels/ExerciseLessonModelExercise";
import ImageLessonModelSlide from "./Assets/SlideModels/ImageLessonModelSlide";
import { CircularProgress } from "@mui/material";
import QandALessonModel from "./Assets/LessonsModels/QandALessonModel";
import QandALessonPersonalModel from "./Assets/LessonsModels/QandALessonPersonalModel";
import NoFlashcardsSentenceLessonModel from "./Assets/LessonsModels/NoFlashcardsSentenceLessonModel";
import AudioSoundTrack from "./Assets/LessonsModels/AudioSoundTrack";

interface EnglishClassCourse2ModelProps {
  headers: MyHeadersType | null;
  classId: any;
  course: any;
  courseTitle: any;
  previousClass: any;
  nextClass: any;
  studentsWhoCompletedIt: any;
  order: number | any;
}

export default function EnglishClassCourse2({
  headers,
  classId,
  studentsWhoCompletedIt,
  previousClass,
  nextClass,
  order,
  courseTitle,
}: EnglishClassCourse2ModelProps) {
  const [studentsList, setStudentsList] = useState<any>([]);
  const [studentID, setStudentID] = useState<string>("");
  const [myId, setId] = useState<string>("");
  const [thePermissions, setPermissions] = useState<string>("");
  const [seeSlides, setSeeSlides] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [theclass, setheClass] = useState<any>({});
  const [classTitle, setClassTitle] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const actualHeaders = headers || {};

  const getClass = async () => {
    setLoading(true);
    const user = localStorage.getItem("loggedIn");
    const { id, permissions } = JSON.parse(user || "");
    setPermissions(permissions);
    if (permissions == "superadmin") {
      fetchStudents();
    }

    if (user) {
      setId(id);
      setStudentID(id);
    }
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/course/${classId}`,
        { headers: actualHeaders }
      );

      var clss = response.data.classDetails;
      setClassTitle(response.data.classDetails.title);
      console.log(response.data.classDetails.studentsWhoCompletedIt, studentID);
      if (response.data.classDetails.studentsWhoCompletedIt.includes(id)) {
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
      }
      setheClass(clss);
      setLoading(false);
    } catch (error) {
      console.log(error, "Erro ao obter aulas");
      onLoggOut();
      setLoading(false);
    }
  };

  const getClassNoLoading = async () => {
    const user = localStorage.getItem("loggedIn");
    const { id, permissions } = JSON.parse(user || "");
    setPermissions(permissions);
    if (permissions == "superadmin") {
      fetchStudents();
    }

    if (user) {
      setId(id);
      setStudentID(id);
    }
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/course/${classId}`,
        { headers: actualHeaders }
      );

      var clss = response.data.classDetails;
      setClassTitle(response.data.classDetails.title);
      console.log(response.data.classDetails.studentsWhoCompletedIt, studentID);
      if (response.data.classDetails.studentsWhoCompletedIt.includes(id)) {
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
      }
      setheClass(clss);
    } catch (error) {
      console.log(error, "Erro ao obter aulas");
    }
  };
  // Função para alternar o estado do switch
  const handleToggle = async (event: any) => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/course/${classId}`,
        { studentID },
        { headers: actualHeaders }
      );
      getClassNoLoading();
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  // Função para alternar o estado do switch
  const verifyCheck = async () => {
    if (theclass.studentsWhoCompletedIt.includes(studentID)) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  useEffect(() => {
    verifyCheck();
  }, [studentID]);

  useEffect(() => {
    getClass();
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === "Escape") {
      setSeeSlides(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const theid = event.target.value;
    setStudentID(theid);
  };
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers: actualHeaders,
      });
      setStudentsList(response.data.listOfStudents);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  const backToCourses = () => {
    window.location.assign(`/english-courses/${pathGenerator(courseTitle)}`);
  };
  const NXTClass = () => {
    window.location.assign(
      `/english-courses/${pathGenerator(courseTitle)}/${nextClass}`
    );
  };
  const PVSClass = () => {
    window.location.assign(
      `/english-courses/${pathGenerator(courseTitle)}/${previousClass}`
    );
  };

  const [showCourses, setShowCourses] = useState(true);
  const [arrow, setArrow] = useState(false);

  const handleShowCourses = () => {
    setShowCourses(!showCourses);
    setArrow(!arrow);
  };

  return (
    <div>
      <Helmets text={classTitle} />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                fontSize: "10px",
                color: primaryColor(),
              }}
              to="/english-courses"
            >
              English Courses
            </Link>{" "}
            <span style={{ color: darkGreyColor() }}>-</span>
            <span
              style={{
                textDecoration: "none",
                fontSize: "10px",
                color: primaryColor(),
                cursor: "pointer",
              }}
              onClick={backToCourses}
            >
              {courseTitle}
            </span>{" "}
            <span style={{ color: darkGreyColor() }}>-</span>
            <span
              style={{
                textDecoration: "none",
                fontStyle: "italic",
                fontSize: "10px",
                color: secondaryColor(),
              }}
            >
              {theclass.title}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              margin: "1rem auto",
              padding: "0 1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {previousClass !== "123456" ? (
              <span
                style={{
                  color: secondaryColor(),
                  cursor: "pointer",
                }}
                onClick={PVSClass}
              >
                <i className="fa fa-arrow-left" aria-hidden="true" />
              </span>
            ) : (
              <span
                style={{
                  fontSize: "10px",
                }}
              >
                No previous class
              </span>
            )}
            <HOne
              style={{
                fontSize: "18px",
              }}
            >
              {`${order + 1}- ${theclass.title}`}{" "}
              <i
                style={{
                  color: "white",
                  backgroundColor: "green",
                  padding: "1px",
                  borderRadius: "50%",
                  margin: "0 0.5rem",
                }}
                className={isCompleted ? `fa fa-check` : `fa fa-circle`}
              />
            </HOne>

            {nextClass !== "123456" ? (
              <span
                style={{
                  color: secondaryColor(),
                  cursor: "pointer",
                }}
                onClick={NXTClass}
              >
                <i className="fa fa-arrow-right" aria-hidden="true" />
              </span>
            ) : (
              <span
                style={{
                  fontSize: "10px",
                }}
              >
                No next class
              </span>
            )}
          </div>
          <label>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggle}
              disabled={loading}
            />
            {loading
              ? "  Atualizando..."
              : isCompleted
              ? "  Completed"
              : "  Not Completed"}
          </label>
          {thePermissions === "superadmin" && (
            <div
              className="box-shadow-white"
              style={{
                height: "3rem",
                padding: "0 10px ",
                backgroundColor: alwaysWhite(),
                position: "fixed",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                minWidth: "100px",
                bottom: 5,
                left: showCourses ? -338 : 3,
                borderRadius: "10px",
              }}
            >
              <select
                onChange={(e) => handleStudentChange(e)}
                value={studentID}
              >
                {studentsList.map((student: any, index: number) => (
                  <option key={index} value={student.id}>
                    {student.name + " " + student.lastname}
                  </option>
                ))}
              </select>
              <ArvinButton color="green" onClick={fetchStudents}>
                <i className="fa fa-refresh" aria-hidden="true" />
              </ArvinButton>

              <span
                style={{
                  fontSize: "10px",
                  marginLeft: "16px",
                }}
              >
                <i
                  className={`fa fa-arrow-${arrow ? "left" : "right"}`}
                  style={{
                    margin: "5px",
                    fontSize: "16px",
                  }}
                  onClick={handleShowCourses}
                  aria-hidden="true"
                />
              </span>
            </div>
          )}
          {theclass.video && (
            <div style={{ margin: "1rem auto 0 auto" }}>
              <IFrameVideoBlog src={getVideoEmbedUrl(theclass.video)} />
            </div>
          )}

          {theclass.description && (
            <p
              style={{
                margin: "1rem 0",
                padding: "0.3rem",
                backgroundColor: "#f9f9f9",
                fontSize: "1.1rem",
                fontFamily: textTitleFont(),
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {theclass.description}
            </p>
          )}
          {theclass.elements &&
            theclass.elements
              .sort((a: any, b: any) => a.order - b.order)
              .map((element: any, index: number) => (
                <div key={index} style={{ margin: "10px 0" }}>
                  {element.subtitle && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <HTwo>{index + 1 + "- " + element.subtitle}</HTwo>
                    </div>
                  )}
                  {element.image && element.subtitle && (
                    <ImgLesson src={element.image} alt={element.subtitle} />
                  )}
                  {element.video && element.subtitle && (
                    <VideoLessonModel element={element} />
                  )}

                  {element.comments && (
                    <p
                      style={{
                        padding: "0.5rem",
                        textAlign: "center",
                        backgroundColor: "#f6f6f6",
                        borderRadius: "1rem",
                        margin: "0.5rem 0",
                        fontStyle: "italic",
                      }}
                    >
                      {element.comments}
                    </p>
                  )}
                  {element.type === "sentences" ? (
                    <SentenceLessonModel
                      mainTag={theclass.mainTag}
                      element={element}
                      studentId={studentID}
                      headers={headers}
                    />
                  ) : element.type === "nfsentences" ? (
                    <NoFlashcardsSentenceLessonModel
                      element={element}
                      headers={headers}
                    />
                  ) : element.type === "text" ? (
                    <TextLessonModel
                      headers={headers}
                      text={element.text ? element.text : ""}
                    />
                  ) : element.type === "html" ? (
                    <div
                      style={{
                        padding: "5px",
                        // display: "grid",
                        justifyContent: "center",
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: element.text }} />
                    </div>
                  ) : element.type === "multipletexts" ? (
                    <MultipleTextsLessonModel
                      headers={headers}
                      element={element}
                    />
                  ) : element.type === "selectexercise" ? (
                    <SelectExercise headers={headers} element={element} />
                  ) : element.type === "images" ? (
                    <ImageLessonModel
                      studentId={studentID}
                      mainTag={theclass.mainTag}
                      id={myId}
                      headers={headers}
                      element={element}
                    />
                  ) : element.type === "exercise" ? (
                    <ExerciseLessonModel
                      headers={headers}
                      item={element.items}
                    />
                  ) : element.type === "qanda" ? (
                    <QandALessonModel
                      headers={headers}
                      studentId={studentID}
                      mainTag={theclass.mainTag}
                      item={element}
                    />
                  ) : element.type === "audiosoundtrack" ? (
                    <AudioSoundTrack
                      headers={headers}
                      text={element.text}
                      src={element.src}
                      studentId={studentID}
                      mainTag={theclass.mainTag}
                      element={element}
                      link={element.link}
                      subtitle={element.subtitle}
                    />
                  ) : element.type === "personalqanda" ? (
                    <QandALessonPersonalModel
                      headers={headers}
                      studentId={studentID}
                      mainTag={theclass.mainTag}
                      item={element}
                    />
                  ) : element.type === "dialogue" ? (
                    <DialogueLessonModel headers={headers} element={element} />
                  ) : element.type === "singleimages" ? (
                    <SingleImageLessonModel
                      headers={headers}
                      element={element}
                    />
                  ) : element.type === "listenandtranslate" ? (
                    <ListenAndTranslateLessonModel
                      headers={headers}
                      element={element}
                    />
                  ) : element.type === "listinenglish" ? (
                    <TextsWithTranslateLessonModel
                      headers={headers}
                      element={element}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
          <div
            style={{
              display: "flex",
              margin: "1rem auto",
              padding: "0 1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {previousClass !== "123456" ? (
              <span
                style={{
                  color: secondaryColor(),
                  cursor: "pointer",
                }}
                onClick={PVSClass}
              >
                <i className="fa fa-arrow-left" aria-hidden="true" />
              </span>
            ) : (
              <span
                style={{
                  fontSize: "10px",
                }}
              >
                No previous class
              </span>
            )}
            {nextClass !== "123456" ? (
              <span
                style={{
                  color: secondaryColor(),
                  cursor: "pointer",
                }}
                onClick={NXTClass}
              >
                <i className="fa fa-arrow-right" aria-hidden="true" />
              </span>
            ) : (
              <span
                style={{
                  fontSize: "10px",
                }}
              >
                No next class
              </span>
            )}
          </div>
          <ArvinButton
            style={{ margin: "1rem auto", display: "block" }}
            onClick={() => {
              setSeeSlides(!seeSlides);
            }}
          >
            See slides
          </ArvinButton>
          {thePermissions === "superadmin" && (
            <label>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={handleToggle}
                disabled={loading}
              />
              {loading
                ? "  Atualizando..."
                : isCompleted
                ? "  Completed"
                : "  Not Completed"}
            </label>
          )}
        </>
      )}
      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {seeSlides && (
        <>
          <div
            onClick={() => {
              setSeeSlides(!seeSlides);
            }}
            style={{
              backgroundColor: transparentBlack(),
              zIndex: 100000000000,
              position: "fixed",
              top: 0,
              left: 0,
              width: "100000000vw",
              height: "100000000vw",
            }}
          />
          <div
            style={{
              padding: "2rem",
              position: "fixed",
              top: 5,
              left: 5,
              width: "94vw",
              border: "1px grey solid",
              borderRadius: "5px",
              height: "97vh",
              zIndex: 10000000000000,
              backgroundColor: "white",
            }}
          >
            <Xp
              style={{ margin: "1rem auto", display: "block" }}
              onClick={() => {
                setSeeSlides(!seeSlides);
              }}
            >
              x
            </Xp>
            <div
              style={{
                height: "75vh",
                overflow: "auto",
              }}
            >
              {theclass.elements
                .sort((a: any, b: any) => a.order - b.order)
                .map((element: any, index: number) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    {element.type === "sentences" ? (
                      <SentenceLessonModelSlide
                        studentId={studentID}
                        element={element}
                        headers={headers}
                      />
                    ) : element.type === "text" ? (
                      <TextLessonModelSlide
                        text={element.text ? element.text : ""}
                      />
                    ) : element.type === "listinenglish" ? (
                      <TextsWithTranslateSlideLessonModel
                        headers={headers}
                        element={element}
                      />
                    ) : element.type === "exercise" ? (
                      <ExerciseLessonModelLesson
                        headers={headers}
                        item={element.items}
                      />
                    ) : element.type === "images" ? (
                      <ImageLessonModelSlide
                        headers={headers}
                        element={element}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
//
