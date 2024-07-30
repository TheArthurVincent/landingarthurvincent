import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import TextAreaLesson from "../Functions/TextAreaLessons";
interface ExerciseLessonModelLessonProps {
  headers: MyHeadersType | null;
  item: any;
}

export default function ExerciseLessonModelLesson({
  headers,
  item,
}: ExerciseLessonModelLessonProps) {
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
            <div style={{ fontSize: "1.5rem" }} key={index}>
              {theitem}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
