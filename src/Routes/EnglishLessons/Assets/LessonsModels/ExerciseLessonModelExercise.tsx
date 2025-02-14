import React, { useState } from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import HTMLJustWrite from "../../../../Resources/Components/HTMLJustWrite";
interface ExerciseLessonModelLessonProps {
  headers: MyHeadersType | null;
  item: any;
}

export default function ExerciseLessonModelLesson({
  headers,
  item,
}: ExerciseLessonModelLessonProps) {
  const [newHWDescription, setNewHWDescription] = useState("");
  const handleHWDescriptionChange = (htmlContent: any) => {
    setNewHWDescription(htmlContent);
  };
  return (
    <div
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      <ol>
        {item.map((theitem: string, index: number) => {
          return (
            <li style={{ fontSize: "1.5rem" }} key={index}>
              {theitem}
            </li>
          );
        })}{" "}
      </ol>
    </div>
  );
}
