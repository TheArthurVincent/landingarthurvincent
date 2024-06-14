import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import {
  ImgLesson,
  LiGridImageLessons,
  UlGridImageLessons,
} from "../Functions/EnglishActivities.Styled";
import TextAreaLesson from "../Functions/TextAreaLessons";
import axios from "axios";
import { backDomain } from "../../../../Resources/UniversalComponents";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";
interface ImageLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
  id: string;
}

export default function ImageLessonModel({
  headers,
  id,
  element,
}: ImageLessonModelProps) {
  const actualHeaders = headers || {};

  const addNewCards = async (frontText: string, backText: string) => {
    const newCards = [
      {
        front: {
          text: frontText,
          language: "pt",
        },
        back: {
          text: backText,
          language: "en",
        },
      },
    ];
    console.log(newCards);

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${id}`,
        { newCards },
        { headers: actualHeaders }
      );
      console.log(response);

      console.log(newCards);
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };
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
              <ArvinButton
                color="white"
                onClick={() => addNewCards(image.portuguese, image.english)}
              >
                <i className="fa fa-copy" aria-hidden="true" />
              </ArvinButton>
              <ImgLesson src={image.img} />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontStyle: "italic",
                  marginTop: "1.3rem",
                }}
              >
                <button
                  className="audio-button"
                  onClick={() => readText(image.text, true)}
                >
                  <i className="fa fa-volume-up" aria-hidden="true" />
                </button>
                <span>{image.text}</span>
              </span>
              <TextAreaLesson />
            </LiGridImageLessons>
          ))}
      </UlGridImageLessons>
    </div>
  );
}
