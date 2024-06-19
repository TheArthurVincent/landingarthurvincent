import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { TextareaAutosize } from "@mui/material";
import TextAreaLesson from "../Functions/TextAreaLessons";
interface TextsWithTranslateLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function TextsWithTranslateLessonModel({
  element,
}: TextsWithTranslateLessonModelProps) {
  return (
    <ul
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      {element.audios &&
        element.audios.map((audio: any, index: number) => {
          return (
            <>
              <div key={index}>{audio.enusAudio}</div>
              <TextAreaLesson/>
            </>
          );
        })}
    </ul>
  );
}
