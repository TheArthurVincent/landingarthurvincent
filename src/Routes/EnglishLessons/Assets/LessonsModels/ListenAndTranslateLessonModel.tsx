import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import TextAreaLesson from "../Functions/TextAreaLessons";
interface ListenAndTranslateLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function ListenAndTranslateLessonModel({
  headers,
  element,
}: ListenAndTranslateLessonModelProps) {
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
              <span>{audio.ptbrText}</span>
              <button
                className="audio-button"
                onClick={() => readText(audio.enusAudio)}
              >
                <i className="fa fa-volume-up" aria-hidden="true" />
              </button>
              <TextAreaLesson />
            </div>
          );
        })}
    </div>
  );
}
