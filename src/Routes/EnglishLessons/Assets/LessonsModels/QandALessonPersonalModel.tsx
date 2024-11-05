import React, { useEffect, useState } from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import {
  backDomain,
  onLoggOut,
} from "../../../../Resources/UniversalComponents";
import axios from "axios";
import { readText } from "../Functions/FunctionLessons";
import { Tooltip, IconButton, Collapse, Box, Typography } from "@mui/material";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";
import { LiSentence, UlSentences } from "../Functions/EnglishActivities.Styled";

interface QandALessonPersonalModelProps {
  headers: MyHeadersType | null;
  item: any;
  mainTag: string;
  studentId: string;
}

export default function QandALessonPersonalModel({
  headers,
  item,
  mainTag,
  studentId,
}: QandALessonPersonalModelProps) {
  useEffect(() => {
    console.log(item.questions);
  }, []);

  const actualHeaders = headers || {};
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addNewCards = async (
    question: string,
    answer: string,
    criteria?: any
  ) => {
    const QandA = [
      {
        question: {
          text: question,
          language: "en",
        },
        answer: {
          text: answer,
          language: "pt",
        },
        criteria: criteria,
        tags: [mainTag ? mainTag : ""],
      },
    ];

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/answerquestion/${studentId}`,
        { QandA },
        { headers: actualHeaders }
      );
      alert(response.data.messageQandA);
    } catch (error) {
      alert("Error");
      console.log(error);
      onLoggOut();
    }
  };

  return (
    <UlSentences
      grid={1}
      style={{
        padding: "16px",
        margin: "10px 0",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      {item.questions.map((theitem: any, index: number) => (
        <LiSentence key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "bold" }}>{theitem.question}</p>
            </div>
            <Tooltip title="Add to flashcards">
              <ArvinButton
                color="white"
                onClick={() =>
                  addNewCards(
                    theitem.question,
                    theitem.answer,
                    theitem.criteria
                  )
                }
              >
                <i className="fa fa-files-o" aria-hidden="true" />
              </ArvinButton>
            </Tooltip>
            <IconButton
              onClick={() => readText(theitem.question, true)}
              color="primary"
              size="small"
            >
              <i className="fa fa-volume-up" aria-hidden="true" />
            </IconButton>
          </div>
          <Box mt={2}>
            <p>
              <textarea
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "0.5rem",
                  margin: "0",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
                placeholder="Your answer"
                name="Text"
                id=""
                required
              />
            </p>
          </Box>
        </LiSentence>
      ))}
    </UlSentences>
  );
}
