import React, { useEffect, useState } from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import { LiSentence, UlSentences } from "../Functions/EnglishActivities.Styled";

interface NoFlashcardsSentenceLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
  selectedVoice: any;
}

export default function NoFlashcardsSentenceLessonModel({
  headers,
  element,
  selectedVoice,
}: NoFlashcardsSentenceLessonModelProps) {
  const actualHeaders = headers || {};

  return (
    <UlSentences grid={element.grid}>
      {element.sentences &&
        element.sentences.map((sentence: any, i: number) => (
          <LiSentence key={i}>
            <strong>{sentence.english}</strong>
            <span
              className="audio-button"
              onClick={() => {
                readText(sentence.english, true, "en", selectedVoice);
              }}
            >
              <i className="fa fa-volume-up" aria-hidden="true" />
            </span>
            <br />
            <span style={{ fontStyle: "italic" }}>{sentence.portuguese}</span>
          </LiSentence>
        ))}
    </UlSentences>
  );
}
