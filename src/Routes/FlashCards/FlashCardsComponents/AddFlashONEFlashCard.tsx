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
      {/* <h4>Card {index + 1}</h4> */}
      <article id="front">
        <input
          value={frontCard}
          onChange={(e) => {
            handleFrontCardChange(index, e.target.value);
          }}
          type="text"
        />
        {/* <HTMLEditor
          onChange={(e: any) => handleFrontCardChange(index, e.target.value)}
        /> */}
        <select
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
          value={backCard}
          onChange={(e) => handleBackCardChange(index, e.target.value)}
          type="text"
        />
        {/* <HTMLEditor
          onChange={(e: any) => handleBackCardChange(index, e.target.value)}
        /> */}
        <select
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
