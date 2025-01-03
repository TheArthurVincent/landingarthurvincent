import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
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
              {theitem}
              <br />
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
