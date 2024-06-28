import React, { useState } from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { HThree } from "../../../MyClasses/MyClasses.Styled";
import TextAreaLesson from "../Functions/TextAreaLessons";

interface Option {
  option: string;
  status: string;
  reason: string;
}

interface Exercise {
  question: string;
  options: Option[];
  answer: string;
}

interface SelectExerciseProps {
  headers: MyHeadersType | null;
  element: {
    subtitle: string;
    options: Exercise[];
  };
}

const SelectExercise: React.FC<SelectExerciseProps> = ({
  headers,
  element,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleSelectChange = (
    index: number,
    value: string,
    correctAnswer: string
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: value,
    }));
    setFeedback((prev) => ({
      ...prev,
      [index]: value === correctAnswer ? "correct" : "incorrect",
    }));
  };

  const getFeedbackColor = (status: string | undefined) => {
    if (status === "correct") return "lightgreen";
    if (status === "incorrect") return "lightcoral";
    return "white";
  };

  const toggleShowAllAnswers = () => {
    setShowAllAnswers(!showAllAnswers);
  };

  return (
    <div style={{ padding: "5px", margin: "10px 0" }}>
      {element.subtitle && <HThree>{element.subtitle}</HThree>}
      {element.options && (
        <ol style={{ padding: "5px", margin: "10px 0" }}>
          {element.options.map((exercise: Exercise, index: number) => (
            <li
              key={index}
              className="exercise"
              style={{
                listStyle: "none",
                marginBottom: "15px",
                backgroundColor: getFeedbackColor(feedback[index]),
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <span style={{ fontWeight: 800 }}>{index + 1} | </span>
              <span>{exercise.question}</span>
              <select
                value={selectedOptions[index] || ""}
                onChange={(e) =>
                  handleSelectChange(
                    index,
                    e.target.value,
                    exercise.options.find((opt) => opt.status === "right")
                      ?.option || ""
                  )
                }
                style={{ marginLeft: "10px", marginRight: "10px" }}
                disabled={feedback[index] === "correct"}
              >
                <option value="">Select</option>
                {exercise.options.map((opt: Option, i: number) => (
                  <option key={i} value={opt.option}>
                    {opt.option}
                  </option>
                ))}
              </select>
              <span
                style={{
                  fontStyle: "italic",
                }}
              >
                {selectedOptions[index] ===
                  exercise.options.find((opt) => opt.status === "right")
                    ?.option && (
                  <span style={{ color: "green" }}> - Correct!</span>
                )}
                {selectedOptions[index] !==
                  exercise.options.find((opt) => opt.status === "right")
                    ?.option && (
                  <span style={{ color: "red" }}> - Incorrect!</span>
                )}
              </span>
              <TextAreaLesson />
            </li>
          ))}
        </ol>
      )}
      <button onClick={toggleShowAllAnswers} style={{ marginTop: "10px" }}>
        Explanation
      </button>
      {showAllAnswers && (
        <div>
          {element.options.map((exercise: Exercise, index: number) => (
            <div key={index} style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                {index + 1}. {exercise.question}
              {" "}  <span style={{ fontStyle: "italic" }}>{exercise.answer}</span>
              </div>
              {exercise.options.map((opt: Option, i: number) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "5px",
                    color: opt.status === "right" ? "green" : "red",
                  }}
                >
                  {opt.reason}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectExercise;
