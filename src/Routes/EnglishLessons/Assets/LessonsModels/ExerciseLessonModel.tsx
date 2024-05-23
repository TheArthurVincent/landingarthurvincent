import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import TextAreaLesson from "../Functions/TextAreaLessons";
interface ExerciseLessonModelProps {
  headers: MyHeadersType | null;
  item: any;
}

export default function ExerciseLessonModel({
  headers,
  item,
}: ExerciseLessonModelProps) {
  return (
    <div
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      <div>
        {item.map((theitem: string, index: number) => {
          return (
            <div key={index}>
              {" "}
              {theitem}
              <button
                className="audio-button"
                onClick={() => readText(theitem)}
              >
                <i className="fa fa-volume-up" aria-hidden="true" />
              </button>
              <br />
              <TextAreaLesson />
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
