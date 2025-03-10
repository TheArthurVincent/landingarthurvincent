import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";
interface DialogueLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function DialogueLessonModel({
  element,
  headers,
}: DialogueLessonModelProps) {
  function isEven(val: number) {
    return val % 2 === 0;
  }

  return (
    <div
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      {element.subtitle && (
        <div>
          {element.dialogue &&
            element.dialogue.map((text: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 0.06fr",
                  }}
                >
                  <p
                    className="shadow"
                    style={{
                      padding: "1rem",
                      margin: "5px",
                      fontStyle: "italic",
                      borderRadius: "6px",
                      textAlign: isEven(index) ? "left" : "right",
                      backgroundColor: isEven(index) ? "#c7dfb6" : "#c9dbf1",
                    }}
                  >
                    {text}
                  </p>
                  <ArvinButton
                    className="audio-button"
                    onClick={() =>
                      readText(text, true, "en", isEven(index) ? true : false)
                    }
                  >
                    <i className="fa fa-volume-up" aria-hidden="true" />
                  </ArvinButton>
                </div>
              );
            })}
        </div>
      )}
      {element.text && <div>{element.text}</div>}
    </div>
  );
}
