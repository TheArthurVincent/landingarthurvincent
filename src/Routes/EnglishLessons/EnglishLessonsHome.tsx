import React, { useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import { lessons } from "./Assets/Functions/ClassesListActivities";
import EnglishLessonsRender from "./Assets/EnglishLessonsRender";
import HTMLEditor from "../../Resources/Components/HTMLEditor";
import { LessonSizeControlBox } from "./Assets/Functions/EnglishActivities.Styled";

export default function EnglishLessonsHome({ headers }: HeadersProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const groupedLessons = lessons.reduce((acc: any, lesson: any) => {
    if (!acc[lesson.type]) {
      acc[lesson.type] = [];
    }
    acc[lesson.type].push(lesson);
    return acc;
  }, {});

  const handleDifficultyChange = (event: any) => {
    setSelectedDifficulty(event.target.value);
    setSelectedLesson(null);
  };

  const handleLessonChange = (event: any) => {
    const lesson = groupedLessons[selectedDifficulty].find(
      (lesson: any) => lesson.title === event.target.value
    );
    setSelectedLesson(lesson);
  };
  const [newDescription, setNewDescription] = useState<string>("");
  const handleDescriptionChange = (htmlContent: string) => {
    setNewDescription(htmlContent);
  };
  return (
    <LessonSizeControlBox className="smooth">
      <Helmets text="Activities" />
      <div
        className="do-print"
        style={{
          padding: "2rem",
        }}
        dangerouslySetInnerHTML={{ __html: newDescription }}
      />
      <RouteDiv
        className="no-print"
        style={{
          backgroundColor: "white",
          transition: "right 0.3s ease",
        }}
      >
        <HOne>Notes</HOne>
        <div
          style={{
            margin: "auto",
            maxWidth: "fit-content",
          }}
        >
          <div
            style={{
              display: "flex",
              textAlign: "center",
              gap: "0.5rem",
            }}
          >
            {" "}
            <div>
              <select
                style={{
                  backgroundColor: "white",

                  width: "10rem",
                  fontFamily: "Athiti",
                }}
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
              >
                <option hidden value="">
                  Select Difficulty
                </option>
                {groupedLessons &&
                  Object.keys(groupedLessons).map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <select
                value={selectedLesson?.title || ""}
                onChange={handleLessonChange}
                disabled={selectedDifficulty ? false : true}
                style={{
                  backgroundColor: "white",
                  cursor: selectedDifficulty ? "auto" : "not-allowed",
                  width: "10rem",
                  fontFamily: "Athiti",
                }}
              >
                <option hidden value="">
                  Select Lesson
                </option>
                {groupedLessons[selectedDifficulty] &&
                  groupedLessons[selectedDifficulty]
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((lesson: any, index: number) => (
                      <option key={index} value={lesson.title}>
                        {lesson.title}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>
        <HTMLEditor onChange={handleDescriptionChange} />
      </RouteDiv>
      <RouteDiv>
        {selectedLesson && (
          <div>
            <EnglishLessonsRender theclass={selectedLesson} headers={headers} />
          </div>
        )}
      </RouteDiv>
    </LessonSizeControlBox>
  );
}
