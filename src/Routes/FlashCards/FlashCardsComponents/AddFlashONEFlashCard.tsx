import React from "react";
import HTMLEditor from "../../../Resources/Components/HTMLEditor";

const languages = ["en", "pt", "it", "fr", "de"];

interface AddOneFlashCardProps {
  index: number;
  frontCard: string;
  backCard: string;
  languageFront: string;
  languageBack: string;
  handleFrontCardChange: (index: number, value: string) => void;
  handleBackCardChange: (index: number, value: string) => void;
  handleLanguageFrontChange: (index: number, value: string) => void;
  handleLanguageBackChange: (index: number, value: string) => void;
}

const AddOneFlashCard: React.FC<AddOneFlashCardProps> = ({
  index,
  frontCard,
  backCard,
  languageFront,
  languageBack,
  handleFrontCardChange,
  handleBackCardChange,
  handleLanguageFrontChange,
  handleLanguageBackChange,
}) => {
  return (
    <div>
      <p>Card {index + 1}</p>
      <article id="front">
        <input
          style={{ maxWidth: "120px" }}
          value={frontCard}
          onChange={(e) => {
            handleFrontCardChange(index, e.target.value);
          }}
          type="text"
        />
        <select
          style={{ maxWidth: "120px" }}
          value={languageFront}
          onChange={(e) => handleLanguageFrontChange(index, e.target.value)}
        >
          {languages.map((language, langIndex) => (
            <option key={langIndex} value={language}>
              {language}
            </option>
          ))}
        </select>
      </article>
      <article id="back">
        <input
          style={{ maxWidth: "120px" }}
          value={backCard}
          onChange={(e) => handleBackCardChange(index, e.target.value)}
          type="text"
        />
        <select
          style={{ maxWidth: "120px" }}
          value={languageBack}
          onChange={(e) => handleLanguageBackChange(index, e.target.value)}
        >
          {languages.map((language, langIndex) => (
            <option key={langIndex} value={language}>
              {language}
            </option>
          ))}
        </select>
      </article>
    </div>
  );
};

export default AddOneFlashCard;
