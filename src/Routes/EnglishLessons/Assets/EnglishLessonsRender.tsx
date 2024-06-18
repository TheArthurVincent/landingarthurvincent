import React, { useEffect, useState } from "react";
import { HOne, HTwo } from "../../../Resources/Components/RouteBox";
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
} from "../../../Resources/UniversalComponents";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { IFrameVideoBlog } from "../../Blog/Blog.Styled";
import Helmets from "../../../Resources/Helmets";
import VideoLessonModel from "./LessonsModels/VideoLessonModel";
import CoursesSideBar from "../CoursesSideBar/CoursesSideBar";

interface EnglishLessonsRenderModelProps {
  headers: MyHeadersType | null;
  theclass: any;
  course: any;
}

export default function EnglishLessonsRender({
  headers,
  theclass,
  course,
}: EnglishLessonsRenderModelProps) {
  const [studentsList, setStudentsList] = useState<any>([]);
  const [studentID, setStudentID] = useState<string>("");
  const [myId, setId] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    const { id, permissions } = JSON.parse(user || "");
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

  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "1rem ",
        backgroundColor: "white",
      }}
    >
      <CoursesSideBar courses={course} />

      <Helmets text={theclass.title} />
      <HOne style={{ marginTop: "3rem" }}>{theclass.title}</HOne>
      {myId === "651311fac3d58753aa9281c5" && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 0,
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
            <i className="fa fa-user" aria-hidden="true" />
          </ArvinButton>
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
      {theclass.elements
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
                <HTwo>{element.subtitle}</HTwo>
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
            ) : element.type === "multipletexts" ? (
              <MultipleTextsLessonModel headers={headers} element={element} />
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
            ) : (
              <></>
            )}
          </div>
        ))}
    </div>
  );
}
//
