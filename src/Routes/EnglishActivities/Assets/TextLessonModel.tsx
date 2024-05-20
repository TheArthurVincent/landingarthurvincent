import React from "react";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
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
      {text && <div>{text}</div>}
    </div>
  );
}
