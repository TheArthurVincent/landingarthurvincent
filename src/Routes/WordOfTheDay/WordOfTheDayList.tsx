import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Button, Tooltip } from "@mui/material";

import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { backDomain, formatDate } from "../../Resources/UniversalComponents";
import { readText } from "../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { textTitleFont } from "../../Styles/Styles";

interface WordOfTheDayListRv {
  headers: MyHeadersType | null;
}

const WordOfTheDayList = ({ headers }: WordOfTheDayListRv) => {
  const [myId, setId] = useState<string>("");
  const [words, setWords] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { id } = JSON.parse(user);
      setId(id);
    }
  }, []);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/wordoftheday`);
      setWords(response.data.words);
      console.log(response.data.words);
    } catch (error: any) {
      alert(error.response?.data?.error || "Error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <RouteDiv>
      <HOne>Word of the Day</HOne>

      {words.map((wordItem: any) => (
        <div key={wordItem._id} style={{ marginBottom: "20px" }}>
          <HTwo>
            {wordItem.word} - {wordItem.translatedWord}
          </HTwo>
          <p>
            <strong>Date:</strong> {formatDate(wordItem.date)}
          </p>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div>
              <p>
                <strong>{wordItem.sentence}</strong>
              </p>
              <p>{wordItem.translatedSentence}</p>
            </div>

            <ArvinButton
              onClick={() => readText(wordItem.sentence, false, "en")}
            >
              <i className="fa fa-volume-up" aria-hidden="true" />
            </ArvinButton>
          </div>
          <a
            href={`https://youglish.com/pronounce/${wordItem.word}/english/us`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-volume-up" aria-hidden="true" /> Hear
            Pronunciation on YouGlish
          </a>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {wordItem.studentsWhoDidIt.map((word: any, index: number) => {
              return (
                <Tooltip title={word.fullName}>
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={word.photo}
                  alt={word.photo}
                />
                </Tooltip>
              );
            })}
          </div>{" "}
        </div>
      ))}
    </RouteDiv>
  );
};

export default WordOfTheDayList;
