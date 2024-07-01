import React, { useEffect, useState } from "react";
import { HTwo, RouteDiv } from "../../../Resources/Components/RouteBox";
import { ImgLesson } from "./Functions/EnglishActivities.Styled";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import TextLessonModel from "./LessonsModels/TextLessonModel";
import SentenceLessonModel from "./LessonsModels/SentenceLessonModel";
import MultipleTextsLessonModel from "./LessonsModels/MultipleTextsLessonModel";
import ImageLessonModel from "./LessonsModels/ImageLessonModel";
import ExerciseLessonModel from "./LessonsModels/ExerciseLessonModel";
import DialogueLessonModel from "./LessonsModels/DialogueLessonModel";
import ListenAndTranslateLessonModel from "./LessonsModels/ListenAndTranslateLessonModel";
import SingleImageLessonModel from "./LessonsModels/SingleImageLessonModel";
import axios from "axios";
import {
  backDomain,
  getVideoEmbedUrl,
  pathGenerator,
} from "../../../Resources/UniversalComponents";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { IFrameVideoBlog } from "../../Blog/Blog.Styled";
import Helmets from "../../../Resources/Helmets";
import VideoLessonModel from "./LessonsModels/VideoLessonModel";
import CoursesSideBar from "../CoursesSideBar/CoursesSideBar";
import {
  alwaysWhite,
  darkGreyColor,
  primaryColor,
  secondaryColor,
} from "../../../Styles/Styles";
import TextsWithTranslateLessonModel from "./LessonsModels/TextWithNoAudio";
import { Link } from "react-router-dom";
import SentenceLessonModelSlide from "./SlideModels/SentenceLessonModelSlide";
import TextLessonModelSlide from "./SlideModels/TextLessonModelSlide";
import TextsWithTranslateSlideLessonModel from "./SlideModels/TextWithNoAudio";
import ImageLessonModelSlide from "./SlideModels/ImageLessonModelSlide";
import SelectExercise from "./LessonsModels/MultipleSelectExercise";

interface EnglishLessonsRenderModelProps {
  headers: MyHeadersType | null;
  theclass: any;
  course: any;
  courseTitle: string;
  back: any;
  module: string;
  pthtt: string;
  previousclass: any;
  nextclass: any;
  order: number | any;
}

export default function EnglishLessonsRender({
  headers,
  theclass,
  course,
  previousclass,
  nextclass,
  module,
  back,
  order,
  courseTitle,
}: EnglishLessonsRenderModelProps) {
  const [studentsList, setStudentsList] = useState<any>([]);
  const [studentID, setStudentID] = useState<string>("");
  const [myId, setId] = useState<string>("");
  const [thePermissions, setPermissions] = useState<string>("");
  const [seeSlides, setSeeSlides] = useState<boolean>(false);

  const PC = previousclass ? pathGenerator(previousclass.title) : null;
  const NC = nextclass ? pathGenerator(nextclass.title) : null;

  useEffect(() => {
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
  }, []);

  const actualHeaders = headers || {};

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
    window.location.assign(`/english-courses/${back}`);
  };

  const previousClass = () => {
    window.location.assign(
      `/english-courses/${pathGenerator(courseTitle)}/${PC}`
    );
  };
  const nextClass = () => {
    window.location.assign(
      `/english-courses/${pathGenerator(courseTitle)}/${NC}`
    );
  };
  const [showCourses, setShowCourses] = useState(true);
  const [arrow, setArrow] = useState(false);

  const handleShowCourses = () => {
    setShowCourses(!showCourses);
    setArrow(!arrow);
  };

  return (
    <>
      <RouteDiv>
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
            {module}
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
        <CoursesSideBar courses={course} />
        <Helmets text={theclass.title} />
        <div
          style={{
            display: "flex",
            margin: "1rem auto",
            padding: "0 1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {previousclass ? (
            <span
              style={{
                color: secondaryColor(),
                cursor: "pointer",
              }}
              onClick={previousClass}
            >
              <i className="fa fa-arrow-left" aria-hidden="true" />
            </span>
          ) : (
            <span>No previous class</span>
          )}
          <h1>{`${order}- ${theclass.title}`}</h1>
          {nextclass ? (
            <span
              style={{
                color: secondaryColor(),
                cursor: "pointer",
              }}
              onClick={nextClass}
            >
              <i className="fa fa-arrow-right" aria-hidden="true" />
            </span>
          ) : (
            <span>No next class</span>
          )}
        </div>
        {thePermissions === "superadmin" && (
          <div
            style={{
              height: "3rem",
              padding: "0 10px ",
              backgroundColor: alwaysWhite(),
              boxShadow: "1px 1px 10px 2px grey",
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
            <select onChange={(e) => handleStudentChange(e)} value={studentID}>
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
        {theclass.image && (
          <ImgLesson src={theclass.image} alt={theclass.title} />
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
              fontFamily: "Athiti",
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
                )}{" "}
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
                    id={myId}
                    studentId={studentID}
                    element={element}
                    headers={headers}
                  />
                ) : element.type === "text" ? (
                  <TextLessonModel
                    headers={headers}
                    text={element.text ? element.text : ""}
                  />
                ) : element.type === "html" ? (
                  <div>
                    <div
                      dangerouslySetInnerHTML={{ __html: element.text }}
                    />
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
                    id={myId}
                    headers={headers}
                    element={element}
                  />
                ) : element.type === "exercise" ? (
                  <ExerciseLessonModel headers={headers} item={element.items} />
                ) : element.type === "dialogue" ? (
                  <DialogueLessonModel headers={headers} element={element} />
                ) : element.type === "singleimages" ? (
                  <SingleImageLessonModel headers={headers} element={element} />
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
        {thePermissions === "superadmin" && (
          <ArvinButton
            onClick={() => {
              setSeeSlides(!seeSlides);
            }}
          >
            See slides
          </ArvinButton>
        )}
        <div
          style={{
            display: "flex",
            margin: "1rem auto",
            padding: "0 1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {previousclass ? (
            <span
              style={{
                color: secondaryColor(),
                cursor: "pointer",
              }}
              onClick={previousClass}
            >
              <i className="fa fa-arrow-left" aria-hidden="true" />
            </span>
          ) : (
            <span>No previous class</span>
          )}
          {nextclass ? (
            <span
              style={{
                color: secondaryColor(),
                cursor: "pointer",
              }}
              onClick={nextClass}
            >
              <i className="fa fa-arrow-right" aria-hidden="true" />
            </span>
          ) : (
            <span>No next class</span>
          )}
        </div>
      </RouteDiv>
      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {thePermissions === "superadmin" && seeSlides && (
        <RouteDiv
          style={{
            maxWidth: "95vw",
            padding: "2.2rem",
            marginTop: "20rem",
          }}
        >
          {theclass.elements
            .sort((a: any, b: any) => a.order - b.order)
            .map((element: any, index: number) => (
              <div key={index} style={{ margin: "10px 0" }}>
                {element.type === "sentences" ? (
                  <SentenceLessonModelSlide
                    id={myId}
                    studentId={studentID}
                    element={element}
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
                ) : element.type === "images" ? (
                  <ImageLessonModelSlide headers={headers} element={element} />
                ) : (
                  <></>
                )}
              </div>
            ))}
        </RouteDiv>
      )}
    </>
  );
}
//
