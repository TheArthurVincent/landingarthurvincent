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
        <HOne>{theclass.title}</HOne>
        {theclass.image && (
          <ImgLesson src={theclass.image} alt={theclass.title} />
        )}{" "}
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
              <HTwo>Comments</HTwo>
              <textarea className="comments" />
            </div>
          ))}
        <HTwo>Homework</HTwo>
        <textarea className="comments" />
      </div>
    </RouteSizeControlBox>
  );
}
