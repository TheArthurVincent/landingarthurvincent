import React from "react";
import { TextField, Select, MenuItem, Box } from "@mui/material";

export const languages = ["en", "pt", "it", "fr", "de"];

interface AddOneFlashCardProps {
  index: number;
  frontCard: string;
  backCard: string;
  languageFront: string;
  languageBack: string;
  backComments: string;
  handleCommentsBack: (index: number, value: string) => void;
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
  backComments,
  handleCommentsBack,
  handleFrontCardChange,
  handleBackCardChange,
  handleLanguageFrontChange,
  handleLanguageBackChange,
}) => {
  return (
    <>
      <Box>
        <p>Card #{index + 1}</p>
        <article id="front">
          <TextField
            style={{ margin: "1px" }}
            value={frontCard}
            placeholder="front"
            onChange={(e) => {
              handleFrontCardChange(index, e.target.value);
            }}
            type="text"
          />
          <Select
            style={{ margin: "1px" }}
            value={languageFront}
            onChange={(e) => handleLanguageFrontChange(index, e.target.value)}
          >
            {languages.map((language, langIndex) => (
              <MenuItem key={langIndex} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </article>
        <article id="back">
          <TextField
            style={{ margin: "1px" }}
            placeholder="back"
            value={backCard}
            onChange={(e) => handleBackCardChange(index, e.target.value)}
            type="text"
          />
          <Select
            style={{ margin: "1px" }}
            value={languageBack}
            onChange={(e) => handleLanguageBackChange(index, e.target.value)}
          >
            {languages.map((language, langIndex) => (
              <MenuItem key={langIndex} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </article>
        <TextField
          style={{ margin: "1px" }}
          placeholder="comments"
          value={backComments}
          onChange={(e) => handleCommentsBack(index, e.target.value)}
          type="text"
        />
      </Box>
    </>
  );
};

export default AddOneFlashCard;
