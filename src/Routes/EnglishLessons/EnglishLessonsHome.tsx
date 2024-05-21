import React, { useState } from "react";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import { lessons } from "./Assets/Functions/ClassesListActivities";
import { HThree } from "../MyClasses/MyClasses.Styled";
import EnglishLessonsRender from "./Assets/EnglishLessonsRender";
import { primaryColor } from "../../Styles/Styles";

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

  return (
    <RouteSizeControlBox className="smooth" style={{ maxWidth: "40rem" }}>
      <Helmets text="Activities" />
      <RouteDiv
        className="no-print"
        style={{
          position: "fixed",
          backgroundColor: primaryColor(),
          right: 0,
        }}
      >
        <div
          style={{
            margin: "auto",
            maxWidth: "fit-content",
          }}
        >
          <div
            style={{
              display: "grid",
              textAlign: "center",
              gap: "0.5rem",
            }}
          >
            {" "}
            <div>
              <select
                style={{
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
      </RouteDiv>

      <RouteDiv>
        {selectedLesson && (
          <div>
            <EnglishLessonsRender theclass={selectedLesson} headers={headers} />
          </div>
        )}
      </RouteDiv>
    </RouteSizeControlBox>
  );
}
