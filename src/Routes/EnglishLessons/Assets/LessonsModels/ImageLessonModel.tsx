import React, { useEffect, useState } from "react";
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
  studentId: string;
}

export default function ImageLessonModel({
  headers,
  id,
  element,
  studentId,
}: ImageLessonModelProps) {
  const actualHeaders = headers || {};

  const addNewCards = async (frontText: string, backText: string) => {
    const newCards = [
      {
        front: {
          text: frontText,
          language: "en",
        },
        back: {
          text: backText,
          language: "pt",
        },
      },
    ];

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${studentId}`,
        { newCards },
        { headers: actualHeaders }
      );
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };
  const addNewCardsInverted = async (frontText: string, backText: string) => {
    const newCards = [
      {
        back: {
          text: frontText,
          language: "en",
        },
        front: {
          text: backText,
          language: "pt",
        },
      },
    ];

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${studentId}`,
        { newCards },
        { headers: actualHeaders }
      );
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };

  
  const [permissions, setPermissions] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions } = JSON.parse(user);
      setPermissions(permissions);
    }
  }, []);
  return (
    <div
      className="sentences"
      style={{
        display: "flex",
        padding: "5px",
        margin: "10px 0",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <UlGridImageLessons>
        {element.images &&
          element.images.map((image: any, i: number) => (
            <LiGridImageLessons key={i}>
              <div>
                <ArvinButton
                  color="white"
                  style={{
                    display: permissions === "superadmin" ? "block" : "none",
                  }}
                  onClick={() =>
                    addNewCardsInverted(image.english, image.portuguese)
                  }
                >
                  Flashcard
                </ArvinButton>
              </div>
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
