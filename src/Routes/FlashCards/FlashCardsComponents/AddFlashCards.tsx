import React, { useEffect, useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";
import axios from "axios";
import { backDomain } from "../../../Resources/UniversalComponents";
import { RouteSizeControlBox } from "../../../Resources/Components/RouteBox";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";

const AddFlashCards = ({ headers }: HeadersProps) => {
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [myId, setId] = useState<string>("");
  const [studentID, setStudentID] = useState<string>("");
  const [addCardVisible, setAddCardVisible] = useState<boolean>(false);

  const [frontCard, setFrontCard] = useState<string>("");
  const [backCard, setBackCard] = useState<string>("");
  const [languageFront, setLanguageFront] = useState<string>("en");
  const [languageBack, setLanguageBack] = useState<string>("pt");

  const [frontCard1, setFrontCard1] = useState<string>("");
  const [backCard1, setBackCard1] = useState<string>("");
  const [languageFront1, setLanguageFront1] = useState<string>("en");
  const [languageBack1, setLanguageBack1] = useState<string>("pt");

  const [frontCard2, setFrontCard2] = useState<string>("");
  const [backCard2, setBackCard2] = useState<string>("");
  const [languageFront2, setLanguageFront2] = useState<string>("en");
  const [languageBack2, setLanguageBack2] = useState<string>("pt");

  const [frontCard3, setFrontCard3] = useState<string>("");
  const [backCard3, setBackCard3] = useState<string>("");
  const [languageFront3, setLanguageFront3] = useState<string>("en");
  const [languageBack3, setLanguageBack3] = useState<string>("pt");

  const [frontCard4, setFrontCard4] = useState<string>("");
  const [backCard4, setBackCard4] = useState<string>("");
  const [languageFront4, setLanguageFront4] = useState<string>("en");
  const [languageBack4, setLanguageBack4] = useState<string>("pt");

  const [frontCard5, setFrontCard5] = useState<string>("");
  const [backCard5, setBackCard5] = useState<string>("");
  const [languageFront5, setLanguageFront5] = useState<string>("en");
  const [languageBack5, setLanguageBack5] = useState<string>("pt");

  const [frontCard6, setFrontCard6] = useState<string>("");
  const [backCard6, setBackCard6] = useState<string>("");
  const [languageFront6, setLanguageFront6] = useState<string>("en");
  const [languageBack6, setLanguageBack6] = useState<string>("pt");

  const [frontCard7, setFrontCard7] = useState<string>("");
  const [backCard7, setBackCard7] = useState<string>("");
  const [languageFront7, setLanguageFront7] = useState<string>("en");
  const [languageBack7, setLanguageBack7] = useState<string>("pt");

  const [frontCard8, setFrontCard8] = useState<string>("");
  const [backCard8, setBackCard8] = useState<string>("");
  const [languageFront8, setLanguageFront8] = useState<string>("en");
  const [languageBack8, setLanguageBack8] = useState<string>("pt");

  const [frontCard9, setFrontCard9] = useState<string>("");
  const [backCard9, setBackCard9] = useState<string>("");
  const [languageFront9, setLanguageFront9] = useState<string>("en");
  const [languageBack9, setLanguageBack9] = useState<string>("pt");

  const [frontCard10, setFrontCard10] = useState<string>("");
  const [backCard10, setBackCard10] = useState<string>("");
  const [languageFront10, setLanguageFront10] = useState<string>("en");
  const [languageBack10, setLanguageBack10] = useState<string>("pt");

  const [frontCard11, setFrontCard11] = useState<string>("");
  const [backCard11, setBackCard11] = useState<string>("");
  const [languageFront11, setLanguageFront11] = useState<string>("en");
  const [languageBack11, setLanguageBack11] = useState<string>("pt");

  const [frontCard12, setFrontCard12] = useState<string>("");
  const [backCard12, setBackCard12] = useState<string>("");
  const [languageFront12, setLanguageFront12] = useState<string>("en");
  const [languageBack12, setLanguageBack12] = useState<string>("pt");

  const [frontCard13, setFrontCard13] = useState<string>("");
  const [backCard13, setBackCard13] = useState<string>("");
  const [languageFront13, setLanguageFront13] = useState<string>("en");
  const [languageBack13, setLanguageBack13] = useState<string>("pt");

  const [frontCard14, setFrontCard14] = useState<string>("");
  const [backCard14, setBackCard14] = useState<string>("");
  const [languageFront14, setLanguageFront14] = useState<string>("en");
  const [languageBack14, setLanguageBack14] = useState<string>("pt");

  const [numberOfCards, setNumberOfCards] = useState<number>(0);

  const fetchStudents = async () => {
    setAddCardVisible(true);
    if (myId === "651311fac3d58753aa9281c5") {
      try {
        const response = await axios.get(`${backDomain}/api/v1/students/`, {
          headers: actualHeaders,
        });
        setStudentsList(response.data.listOfStudents);
      } catch (error) {
        alert("Erro ao encontrar alunos");
      }
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { id } = JSON.parse(user);
      setId(id);
    }
  }, []);

  const actualHeaders = headers || {};

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setStudentID(selectedId);
    console.log(selectedId);
  };

  const addNewCard = async () => {
    const newCards = [
      {
        front: { text: frontCard, language: languageFront },
        back: { text: backCard, language: languageBack },
      },
      frontCard1
        ? {
            front: { text: frontCard1, language: languageFront1 },
            back: { text: backCard1, language: languageBack1 },
          }
        : null,
      frontCard2
        ? {
            front: { text: frontCard2, language: languageFront2 },
            back: { text: backCard2, language: languageBack2 },
          }
        : null,
      frontCard3
        ? {
            front: { text: frontCard3, language: languageFront3 },
            back: { text: backCard3, language: languageBack3 },
          }
        : null,
      frontCard4
        ? {
            front: { text: frontCard4, language: languageFront4 },
            back: { text: backCard4, language: languageBack4 },
          }
        : null,
      frontCard5
        ? {
            front: { text: frontCard5, language: languageFront5 },
            back: { text: backCard5, language: languageBack5 },
          }
        : null,
      frontCard6
        ? {
            front: { text: frontCard6, language: languageFront6 },
            back: { text: backCard6, language: languageBack6 },
          }
        : null,
      frontCard7
        ? {
            front: { text: frontCard7, language: languageFront7 },
            back: { text: backCard7, language: languageBack7 },
          }
        : null,
      frontCard8
        ? {
            front: { text: frontCard8, language: languageFront8 },
            back: { text: backCard8, language: languageBack8 },
          }
        : null,
      frontCard9
        ? {
            front: { text: frontCard9, language: languageFront9 },
            back: { text: backCard9, language: languageBack9 },
          }
        : null,
      frontCard10
        ? {
            front: { text: frontCard10, language: languageFront10 },
            back: { text: backCard10, language: languageBack10 },
          }
        : null,
      frontCard11
        ? {
            front: { text: frontCard11, language: languageFront11 },
            back: { text: backCard11, language: languageBack11 },
          }
        : null,
      frontCard12
        ? {
            front: { text: frontCard12, language: languageFront12 },
            back: { text: backCard12, language: languageBack12 },
          }
        : null,
      frontCard13
        ? {
            front: { text: frontCard13, language: languageFront13 },
            back: { text: backCard13, language: languageBack13 },
          }
        : null,
      frontCard14
        ? {
            front: { text: frontCard14, language: languageFront14 },
            back: { text: backCard14, language: languageBack14 },
          }
        : null,
    ];
    console.log(newCards);
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${studentID}`,
        { newCards },
        { headers: actualHeaders }
      );
      setFrontCard("");
      setBackCard("");
      setLanguageFront("en");
      setLanguageBack("pt");
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };

  const languages = ["en", "pt", "it", "fr", "de"];

  const sections = [
    {
      frontCard: frontCard,
      setFrontCard: setFrontCard,
      backCard: backCard,
      setBackCard: setBackCard,
      languageFront: languageFront,
      setLanguageFront: setLanguageFront,
      languageBack: languageBack,
      setLanguageBack: setLanguageBack,
    },
    {
      frontCard: frontCard1,
      setFrontCard: setFrontCard1,
      backCard: backCard1,
      setBackCard: setBackCard1,
      languageFront: languageFront1,
      setLanguageFront: setLanguageFront1,
      languageBack: languageBack1,
      setLanguageBack: setLanguageBack1,
    },
    {
      frontCard: frontCard2,
      setFrontCard: setFrontCard2,
      backCard: backCard2,
      setBackCard: setBackCard2,
      languageFront: languageFront2,
      setLanguageFront: setLanguageFront2,
      languageBack: languageBack2,
      setLanguageBack: setLanguageBack2,
    },
    {
      frontCard: frontCard3,
      setFrontCard: setFrontCard3,
      backCard: backCard3,
      setBackCard: setBackCard3,
      languageFront: languageFront3,
      setLanguageFront: setLanguageFront3,
      languageBack: languageBack3,
      setLanguageBack: setLanguageBack3,
    },
    {
      frontCard: frontCard4,
      setFrontCard: setFrontCard4,
      backCard: backCard4,
      setBackCard: setBackCard4,
      languageFront: languageFront4,
      setLanguageFront: setLanguageFront4,
      languageBack: languageBack4,
      setLanguageBack: setLanguageBack4,
    },
    {
      frontCard: frontCard5,
      setFrontCard: setFrontCard5,
      backCard: backCard5,
      setBackCard: setBackCard5,
      languageFront: languageFront5,
      setLanguageFront: setLanguageFront5,
      languageBack: languageBack5,
      setLanguageBack: setLanguageBack5,
    },
    {
      frontCard: frontCard6,
      setFrontCard: setFrontCard6,
      backCard: backCard6,
      setBackCard: setBackCard6,
      languageFront: languageFront6,
      setLanguageFront: setLanguageFront6,
      languageBack: languageBack6,
      setLanguageBack: setLanguageBack6,
    },
    {
      frontCard: frontCard7,
      setFrontCard: setFrontCard7,
      backCard: backCard7,
      setBackCard: setBackCard7,
      languageFront: languageFront7,
      setLanguageFront: setLanguageFront7,
      languageBack: languageBack7,
      setLanguageBack: setLanguageBack7,
    },
    {
      frontCard: frontCard8,
      setFrontCard: setFrontCard8,
      backCard: backCard8,
      setBackCard: setBackCard8,
      languageFront: languageFront8,
      setLanguageFront: setLanguageFront8,
      languageBack: languageBack8,
      setLanguageBack: setLanguageBack8,
    },
    {
      frontCard: frontCard9,
      setFrontCard: setFrontCard9,
      backCard: backCard9,
      setBackCard: setBackCard9,
      languageFront: languageFront9,
      setLanguageFront: setLanguageFront9,
      languageBack: languageBack9,
      setLanguageBack: setLanguageBack9,
    },
    {
      frontCard: frontCard10,
      setFrontCard: setFrontCard10,
      backCard: backCard10,
      setBackCard: setBackCard10,
      languageFront: languageFront10,
      setLanguageFront: setLanguageFront10,
      languageBack: languageBack10,
      setLanguageBack: setLanguageBack10,
    },
    {
      frontCard: frontCard11,
      setFrontCard: setFrontCard11,
      backCard: backCard11,
      setBackCard: setBackCard11,
      languageFront: languageFront11,
      setLanguageFront: setLanguageFront11,
      languageBack: languageBack11,
      setLanguageBack: setLanguageBack11,
    },
    {
      frontCard: frontCard12,
      setFrontCard: setFrontCard12,
      backCard: backCard12,
      setBackCard: setBackCard12,
      languageFront: languageFront12,
      setLanguageFront: setLanguageFront12,
      languageBack: languageBack12,
      setLanguageBack: setLanguageBack12,
    },
    {
      frontCard: frontCard13,
      setFrontCard: setFrontCard13,
      backCard: backCard13,
      setBackCard: setBackCard13,
      languageFront: languageFront13,
      setLanguageFront: setLanguageFront13,
      languageBack: languageBack13,
      setLanguageBack: setLanguageBack13,
    },
    {
      frontCard: frontCard14,
      setFrontCard: setFrontCard14,
      backCard: backCard14,
      setBackCard: setBackCard14,
      languageFront: languageFront14,
      setLanguageFront: setLanguageFront14,
      languageBack: languageBack14,
      setLanguageBack: setLanguageBack14,
    },
  ];

  return (
    <RouteSizeControlBox className="smooth">
      <section id="addcards">
        {myId === "651311fac3d58753aa9281c5" && (
          <div style={{ display: "grid" }}>
            <ArvinButton
              style={{
                margin: "3rem auto",
                display: "block",
              }}
              color="yellow"
              onClick={fetchStudents}
            >
              Adicionar cartas
            </ArvinButton>
            <div
              style={{
                display: addCardVisible ? "block" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <select
                  onChange={handleStudentChange}
                  name="students"
                  id=""
                  value={studentID}
                >
                  {studentsList.map((student, index) => (
                    <option key={index} value={student.id}>
                      {student.name + " " + student.lastname}
                    </option>
                  ))}
                </select>
                <ArvinButton
                  color="navy"
                  onClick={() => {
                    setNumberOfCards(numberOfCards + 1);
                  }}
                >
                  +
                </ArvinButton>
              </div>
              <div>
                {sections.map((section, index) => (
                  <section
                    style={{
                      display: index <= numberOfCards ? "block" : "none",
                    }}
                    key={index}
                  >
                    {index + 1}
                    <div>
                      <input
                        value={section.frontCard}
                        onChange={(e) => section.setFrontCard(e.target.value)}
                        type="text"
                      />
                      <select
                        value={section.languageFront}
                        onChange={(e) =>
                          section.setLanguageFront(e.target.value)
                        }
                      >
                        {languages.map((language, langIndex) => (
                          <option key={langIndex} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        value={section.backCard}
                        onChange={(e) => section.setBackCard(e.target.value)}
                        type="text"
                      />
                      <select
                        value={section.languageBack}
                        onChange={(e) =>
                          section.setLanguageBack(e.target.value)
                        }
                      >
                        {languages.map((language, langIndex) => (
                          <option key={langIndex} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>
                ))}
              </div>
              <ArvinButton color="green" onClick={addNewCard}>
                Add cards
              </ArvinButton>
            </div>
          </div>
        )}
      </section>
    </RouteSizeControlBox>
  );
};

export default AddFlashCards;
