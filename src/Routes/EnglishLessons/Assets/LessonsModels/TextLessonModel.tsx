import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import TextAreaLesson from "../Functions/TextAreaLessons";
interface TextLessonModelProps {
  headers: MyHeadersType | null;
  text: string;
}

export default function TextLessonModel({
  headers,
  text,
}: TextLessonModelProps) {
  return (
    <div
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      <div>
        {text}
        <button className="audio-button" onClick={() => readText(text)}>
          <i className="fa fa-volume-up" aria-hidden="true" />
        </button>
        <TextAreaLesson />
      </div>
    </div>
  );
}
