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
  Xp,
} from "../../../Resources/UniversalComponents";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { IFrameVideoBlog } from "../../Blog/Blog.Styled";
import Helmets from "../../../Resources/Helmets";
import VideoLessonModel from "./LessonsModels/VideoLessonModel";
import CoursesSideBar, {
  truncateTitle,
} from "../CoursesSideBar/CoursesSideBar";
import {
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
  primaryColor,
  secondaryColor,
  transparentBlack,
} from "../../../Styles/Styles";
import TextsWithTranslateLessonModel from "./LessonsModels/TextWithNoAudio";
import { Link } from "react-router-dom";
import SentenceLessonModelSlide from "./SlideModels/SentenceLessonModelSlide";
import TextLessonModelSlide from "./SlideModels/TextLessonModelSlide";
import TextsWithTranslateSlideLessonModel from "./SlideModels/TextWithNoAudio";
import ImageLessonModelSlide from "./SlideModels/ImageLessonModelSlide";
import SelectExercise from "./LessonsModels/MultipleSelectExercise";
import { Tooltip } from "@mui/material";

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
  const [description, setDescription] = useState<string>("");

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
            <span
              style={{
                fontSize: "10px",
              }}
            >
              No previous class
            </span>
          )}
          <h1
            style={{
              fontSize: "15px",
            }}
          >{`${order + 1}- ${truncateTitle(theclass.title, 30)}`}</h1>
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
            <span
              style={{
                fontSize: "10px",
              }}
            >
              No next class
            </span>
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
                  <div
                    style={{
                      padding: "1rem",
                      display: "grid",
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
        {/*   <div id="comment-section">
           <form action="">
            <h3>Leave a comment!</h3>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              style={{ width: "98%", height: "50px", padding: "8px" }}
            />{" "}
            <ArvinButton>Send</ArvinButton>
          </form>
         <h3>Comments</h3>
          <ul>
            {theclass.studentsComments.length > 0
              ? theclass.studentsComments.map(
                  (comment: any, indexx: number) => {
                    return (
                      <li
                        key={indexx}
                        style={{
                          padding: "2px 8px",
                          marginTop: "8px",
                          borderRadius: "10px",
                          border: "1px solid #f1f1f1",
                          backgroundColor: "#f1f1f1",
                          listStyle: "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Athiti",
                            fontWeight: 800,
                            fontSize: "1.2rem",
                          }}
                        >
                          {comment.studentName}
                        </span>
                        <span>
                          {comment.likes >= 0 && (
                            <span style={{ margin: "0 1rem" }}>
                              {" "}
                              <i
                                style={{ cursor: "pointer" }}
                                className={"fa fa-thumbs-up"}
                                aria-hidden="true"
                              />{" "}
                              {comment.likes}
                            </span>
                          )}
                          <Tooltip title="Answer/Responda">
                            <ArvinButton color="green">
                              <i className="fa fa-commenting " />
                            </ArvinButton>
                          </Tooltip>
                          <Tooltip title="Edit/Editar">
                            <ArvinButton>
                              <i className="fa fa-pencil" />
                            </ArvinButton>
                          </Tooltip>
                          <Tooltip title="Delete/Apagar">
                            <ArvinButton color="red">
                              <i className="fa fa-trash" />
                            </ArvinButton>
                          </Tooltip>{" "}
                        </span>
                        <br />
                        {comment.comment}
                        {comment.answers.length > 0 && (
                          <>
                            <h3
                              style={{
                                textAlign: "center",
                              }}
                            >
                              Answers:
                            </h3>
                            <ul
                              style={{
                                margin: "5px",
                              }}
                            >
                              {comment.answers.map((asw: any, idxx: number) => {
                                return (
                                  <li
                                    style={{
                                      listStyle: "inside square",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      padding: "3px",
                                      marginTop: "15px",
                                      border: "1px solid #fefefe",
                                      borderRadius: "5px",
                                      backgroundColor: "#fefefe",
                                    }}
                                    key={idxx + indexx}
                                  >
                                    <span style={{ maxWidth: "80%" }}>
                                      <span
                                        style={{
                                          fontFamily: "Athiti",
                                          fontWeight: 800,
                                          fontSize: "1.1rem",
                                        }}
                                      >
                                        {asw.studentName}
                                      </span>
                                      {asw.likes >= 0 && (
                                        <span
                                          style={{
                                            margin: "0 1rem",
                                          }}
                                        >
                                          {" "}
                                          <i
                                            style={{ cursor: "pointer" }}
                                            className={"fa fa-thumbs-up"}
                                            aria-hidden="true"
                                          />{" "}
                                          {asw.likes}
                                        </span>
                                      )}
                                      <br />
                                      <span
                                        style={{
                                          fontStyle: "italic",
                                        }}
                                      >
                                        {asw.comment}

                                        <br />
                                      </span>
                                    </span>
                                    <span>
                                      <Tooltip title="Edit/Editar">
                                        <ArvinButton>
                                          <i className="fa fa-pencil" />
                                        </ArvinButton>
                                      </Tooltip>
                                      <Tooltip title="Delete/Apagar">
                                        <ArvinButton color="red">
                                          <i className="fa fa-trash" />
                                        </ArvinButton>
                                      </Tooltip>{" "}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </>
                        )}
                      </li>
                    );
                  }
                )
              : "No comments"}
          </ul> 
        </div> */}
        {thePermissions === "superadmin" && (
          <ArvinButton
            style={{ margin: "1rem auto", display: "block" }}
            onClick={() => {
              setSeeSlides(!seeSlides);
            }}
          >
            See slides
          </ArvinButton>
        )}
      </RouteDiv>

      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {/* Teacher */}
      {thePermissions === "superadmin" && seeSlides && (
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
              top: 10,
              left: 10,
              width: "94vw",
              border: "1px grey solid",
              borderRadius: "1rem",
              marginTop: "2rem",
              height: "84vh",
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
    </>
  );
}
//
