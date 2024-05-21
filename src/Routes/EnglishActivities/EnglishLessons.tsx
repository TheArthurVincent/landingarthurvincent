import React, { useState } from "react";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import EnglishActivities from "./EnglishActivities";
import { lessons } from "./Assets/Functions/ClassesListActivities";
import { HThree } from "../MyClasses/MyClasses.Styled";

export default function EnglishLessons({ headers }: HeadersProps) {
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
    <RouteSizeControlBox className="smooth">
      <Helmets text="Activities" />
      <RouteDiv className="no-print">
        <div
          style={{
            margin: "auto",
            maxWidth: "fit-content",
          }}
        >
          <HOne>Choose a Lesson</HOne>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              gap: "0.5rem",
              justifyContent: "space between",
            }}
          >
            {" "}
            <div>
              <HThree>Difficulty</HThree>
              <select
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
              >
                <option value="">Select Difficulty</option>
                {Object.keys(groupedLessons).map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
            {selectedDifficulty && (
              <div>
                <HThree>Lesson</HThree>
                <select
                  value={selectedLesson?.title || ""}
                  onChange={handleLessonChange}
                >
                  <option value="">Select Lesson</option>
                  {groupedLessons[selectedDifficulty].map(
                    (lesson: any, index: number) => (
                      <option key={index} value={lesson.title}>
                        {lesson.title}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
          </div>
        </div>
      </RouteDiv>

      <RouteDiv>
        {selectedLesson && (
          <div>
            <EnglishActivities theclass={selectedLesson} headers={headers} />
          </div>
        )}
      </RouteDiv>
    </RouteSizeControlBox>
  );
}
