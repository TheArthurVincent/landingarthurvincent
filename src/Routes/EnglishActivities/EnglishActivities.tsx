import React from "react";
import {
  HOne,
  HTwo,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { ImgLesson } from "./Assets/Functions/EnglishActivities.Styled";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import TextLessonModel from "./Assets/TextLessonModel";
import SentenceLessonModel from "./Assets/SentenceLessonModel";
import MultipleTextsLessonModel from "./Assets/MultipleTextsLessonModel";
import ImageLessonModel from "./Assets/ImageLessonModel";
import { lessons } from "./Assets/Functions/ClassesListActivities";

import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import { pathGenerator } from "../../Resources/UniversalComponents";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import ExerciseLessonModel from "./Assets/ExerciseLessonModel";

interface EnglishActivitiesModelProps {
  headers: MyHeadersType | null;
  theclass: any;
}

export default function EnglishActivities({
  headers,
  theclass,
}: EnglishActivitiesModelProps) {
  return (
    <RouteSizeControlBox className="smooth" style={{ maxWidth: "40rem" }}>
      <Helmets text="Activities" />
      <div
        style={{
          borderRadius: "10px",
          padding: "1rem ",
          backgroundColor: "white",
        }}
      >
        <HOne>{lessons[0].title}</HOne>
        {lessons[0].image && (
          <ImgLesson src={lessons[0].image} alt={lessons[0].title} />
        )}
        {lessons[0].elements
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
                  sentences={element.sentences}
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
                <ImageLessonModel headers={headers} element={element} />
              ) : element.type === "exercise" ? (
                <ExerciseLessonModel headers={headers} item={element.items} />
              ) : (
                <></>
              )}
              <textarea className="comments" />
            </div>
          ))}
        <HTwo>Homework</HTwo>
        <textarea className="comments" rows={20} cols={1}></textarea>
      </div>
    </RouteSizeControlBox>
  );
}
