import React, { useState } from "react";
import { primaryColor, secondaryColor, textTitleFont } from "../../../../Styles/Styles";
import HTMLEditor from "../../../../Resources/Components/HTMLEditor";
import HTMLJustWrite from "../../../../Resources/Components/HTMLJustWrite";

interface SentenceLessonModelProps {
  element: any;
  id: string;
  studentId: string;
}

export default function SentenceLessonModelSlide({
  element,
}: SentenceLessonModelProps) {
  const [newHWDescription, setNewHWDescription] = useState("");
  const handleHWDescriptionChange = (htmlContent: any) => {
    setNewHWDescription(htmlContent);
  };
  return (
    <ul
      style={{
        alignItems: "center",
        display: "grid",
        gap: "30rem",
        marginBottom: " 40rem",
      }}
    >
      {element.sentences &&
        element.sentences.map((sentence: any, i: number) => (
          <li
            style={{
              listStyle: "none",
            }}
            key={i}
          >
            <strong
              style={{
                fontFamily: textTitleFont(),
                fontSize: "3rem",
                color: !sentence.portuguese ? secondaryColor() : primaryColor(),
              }}
            >
              {sentence.english}
            </strong>
            <br />
            <span
              style={{
                fontSize: "2.5rem",
                fontStyle: "italic",
              }}
            >
              {sentence.portuguese}
            </span>
            <br />
            <HTMLJustWrite onChange={handleHWDescriptionChange} />
          </li>
        ))}
    </ul>
  );
}
