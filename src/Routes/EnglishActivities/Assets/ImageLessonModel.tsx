import React from "react";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { readText } from "./Functions/FunctionLessons";
import {
  ImgLesson,
  LiGridImageLessons,
  UlGridImageLessons,
} from "./Functions/EnglishActivities.Styled";
interface ImageLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function ImageLessonModel({
  headers,
  element,
}: ImageLessonModelProps) {
  return (
    <div
      className="sentences"
      style={{
        display: "flex",
        padding: "5px",
        margin: "10px 0",
      }}
    >
      <UlGridImageLessons>
        {element.images &&
          element.images.map((image: any, i: number) => (
            <LiGridImageLessons key={i}>
              <ImgLesson src={image.img} />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontStyle: "italic",
                }}
              >
                <button
                  className="audio-button"
                  onClick={() => readText(image.text)}
                >
                  <i className="fa fa-volume-up" aria-hidden="true" />
                </button>
                <span>{image.text}</span>
              </span>
            </LiGridImageLessons>
          ))}
      </UlGridImageLessons>
    </div>
  );
}
