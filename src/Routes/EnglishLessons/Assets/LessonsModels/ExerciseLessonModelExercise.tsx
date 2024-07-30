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
      <div>
        {item.map((theitem: string, index: number) => {
          return (
            <div style={{ fontSize: "1.5rem" }} key={index}>
              {theitem}
              <HTMLJustWrite onChange={handleHWDescriptionChange} />
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
