import React, { useState } from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { HThree } from "../../../MyClasses/MyClasses.Styled";
import TextAreaLesson from "../Functions/TextAreaLessons";

interface SelectExerciseProps {
  headers: MyHeadersType | null;
  element: any;
}

const SelectExercise: React.FC<SelectExerciseProps> = ({
  headers,
  element,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});

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

  const getSeeAnswer = (status: string | undefined) => {
    if (status === "correct") return "inline";
    if (status === "incorrect") return "none";
    return "none";
  };
  return (
    <div style={{ padding: "5px", margin: "10px 0" }}>
      {element.subtitle && <HThree>{element.subtitle}</HThree>}
      {element.options && (
        <ol style={{ padding: "5px", margin: "10px 0" }}>
          {element.options.map((option: any, index: number) => (
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
              <span>{option.question}</span>
              <select
                value={selectedOptions[index] || ""}
                onChange={(e) =>
                  handleSelectChange(index, e.target.value, option.correct)
                }
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <option value="">Select</option>
                {Object.values(option.options).map((opt: any, i: number) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span
                style={{
                  display: getSeeAnswer(feedback[index]),
                  fontStyle: "italic",
                }}
              >
                {option.answer}
              </span>
              <TextAreaLesson />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default SelectExercise;
