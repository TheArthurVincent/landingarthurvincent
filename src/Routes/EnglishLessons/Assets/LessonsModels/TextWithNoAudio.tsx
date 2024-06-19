import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import TextAreaLesson from "../Functions/TextAreaLessons";
interface TextsWithTranslateLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function TextsWithTranslateLessonModel({
  headers,
  element,
}: TextsWithTranslateLessonModelProps) {
  return (
    <div
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      {element.audios &&
        element.audios.map((audio: any, index: number) => {
          return (
            <div key={index}>
              <span>{audio.enusAudio}</span>
            </div>
          );
        })}
    </div>
  );
}
