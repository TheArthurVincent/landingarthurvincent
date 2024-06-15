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
import { RouteDivNotes } from "./Assets/Functions/EnglishActivities.Styled";

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

  const [homework, setHomework] = useState<string>("");
  const handleHomeworkChange = (htmlContent: string) => {
    setHomework(htmlContent);
  };

  return (
    <RouteDiv className="smooth">
      <Helmets text="Activities" />
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          minWidth: "50vw",
          borderRadius: "5px",
        }}
      >
        <select
          style={{
            width: "8rem",
            fontFamily: "Athiti",
            margin: "3px",
          }}
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
        >
          <option hidden value="">
            Select Category
          </option>
          {groupedLessons &&
            Object.keys(groupedLessons).map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
        </select>
        <select
          value={selectedLesson?.title || ""}
          onChange={handleLessonChange}
          disabled={selectedDifficulty ? false : true}
          style={{
            backgroundColor: "white",
            cursor: selectedDifficulty ? "auto" : "not-allowed",
            width: "8rem",
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
                  {lesson.order + "- " + lesson.title}
                </option>
              ))}
        </select>
      </div>
      {selectedLesson && (
        <div id="pdf-content">
          <EnglishLessonsRender theclass={selectedLesson} headers={headers} />
        </div>
      )}
    </RouteDiv>
  );
  /* <div className="do-print">
        <HOne>Notes</HOne>
        <div
          style={{
            padding: "2rem",
          }}
          dangerouslySetInnerHTML={{ __html: newDescription }}
        />
        <HOne>Homework</HOne>
        <div
          style={{
            padding: "2rem",
          }}
          dangerouslySetInnerHTML={{ __html: homework }}
        />
      </div>
      <div>
        <RouteDivNotes className="no-print">
    
          <HOne>Notes</HOne>
          <HTMLEditor onChange={handleDescriptionChange} />
          <HOne>Homework</HOne>
          <HTMLEditor onChange={handleHomeworkChange} />
        </RouteDivNotes>
      </div> */
}
