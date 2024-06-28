import React, { useState } from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { HThree } from "../../../MyClasses/MyClasses.Styled";
import TextAreaLesson from "../Functions/TextAreaLessons";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";
import { lightGreyColor } from "../../../../Styles/Styles";

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
  const [showStatus, setShowStatus] = useState(false);

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
    if (showAllAnswers) {
      if (status === "correct") return "lightgreen";
      if (status === "incorrect") return "lightcoral";
    }
    return "white"; // cor padrão quando não estiver mostrando todas as respostas
  };
  const allOptionsSelected = () => {
    return element.options.every(
      (exercise, index) => selectedOptions[index] !== undefined
    );
  };

  const toggleShowAllAnswers = () => {
    setShowAllAnswers(!showAllAnswers);
    setShowStatus(true);
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
                // disabled={feedback[index] === "correct"}
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
                  display: showStatus ? "block" : "none",
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
      <ArvinButton
        onClick={toggleShowAllAnswers}
        style={{ marginTop: "10px" }}
        disabled={!allOptionsSelected()}
      >
        Explanation
      </ArvinButton>
      {showAllAnswers && (
        <div>
          {element.options.map((exercise: Exercise, index: number) => (
            <div key={index} style={{ margin: "10px" }}>
              <div style={{ margin: "5px", fontWeight: "bold" }}>
                {index + 1}. {exercise.question}{" "}
                <span style={{ fontStyle: "italic" }}>{exercise.answer}</span>
              </div>
              {exercise.options.map((opt: Option, i: number) => (
                <div
                  key={i}
                  style={{
                    margin: "20px 0",
                    color: opt.status === "right" ? "green" : "red",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: lightGreyColor(),
                      padding: "5px",
                      marginRight: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {opt.option}
                  </span>{" "}
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
