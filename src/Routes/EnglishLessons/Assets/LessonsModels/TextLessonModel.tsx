import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import TextAreaLesson from "../Functions/TextAreaLessons";
interface TextLessonModelProps {
  headers: MyHeadersType | null;
  text: string;
}

export default function TextLessonModel({ text }: TextLessonModelProps) {
  return (
    <div
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      <div>
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <TextAreaLesson />
      </div>
    </div>
  );
}
