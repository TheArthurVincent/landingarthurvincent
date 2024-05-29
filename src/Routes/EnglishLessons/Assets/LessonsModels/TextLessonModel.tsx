import React, { useState } from "react";
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
  const [isPaused, setIsPaused] = useState<boolean>(false);

  return (
    <div
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      <div>
        {text}
        <button
          className="audio-button"
          onClick={() => {
            readText(text, true);
            setIsPaused(!isPaused);
          }}
        >
          <i
            className={!isPaused ? "fa fa-volume-up" : "fa fa-pause"}
            aria-hidden="true"
          />
        </button>
        <TextAreaLesson />
      </div>
    </div>
  );
}
