import React from "react";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { readText } from "./Functions/FunctionLessons";
import { HThree } from "../../MyClasses/MyClasses.Styled";
interface TextLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function MultipleTextsLessonModel({
  headers,
  element,
}: TextLessonModelProps) {
  return (
    <div
      style={{
        padding: "5px",
        margin: "10px 0",
      }}
    >
      {element.subtitle && (
        <div>
          {element.subtexts &&
            element.subtexts.map((text: any, index: number) => {
              return (
                <div key={index}>
                  {text.subtexttitle && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="audio-button"
                        onClick={() => readText(text.text)}
                      >
                        <i className="fa fa-volume-up" aria-hidden="true" />
                      </button>
                      <HThree>{text.subtexttitle}</HThree>
                    </div>
                  )}
                  {text.text && (
                    <>
                      {" "}
                      <p
                        style={{
                          marginBottom: "2rem",
                        }}
                      >
                        {text.text}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      )}
      {element.text && <div>{element.text}</div>}
    </div>
  );
}
