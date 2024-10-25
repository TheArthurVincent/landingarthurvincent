import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  backDomain,
  formatDateBr,
  Xp,
} from "../../../Resources/UniversalComponents";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { CircularProgress } from "@mui/material";
import { languages } from "./AddFlashONEFlashCard";
import { readText } from "../../EnglishLessons/Assets/Functions/FunctionLessons";

const AllCards = ({ headers }: HeadersProps) => {
  const [myId, setId] = useState<string>("");
  const [addCardVisible, setAddCardVisible] = useState<boolean>(false);
  const [cards, setCards] = useState([]);
  const [fCards, setFCards] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newFront, setNewFront] = useState<string>("");
  const [newBack, setNewBack] = useState<string>("");
  const [newLGFront, setNewLGFront] = useState<string>("");
  const [newLGBack, setNewLGBack] = useState<string>("");
  const [cardIdToEdit, setCardIdToEdit] = useState<string>("");
  const [newBackComments, setNewBackComments] = useState<string>("");
  const [studentsList, setStudentsList] = useState<any>([]);
  const [perm, setPermissions] = useState<string>("");
  const [studentID, setStudentID] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    const { id, permissions } = JSON.parse(user || "");
    setPermissions(permissions);
    if (permissions == "superadmin") {
      fetchStudents();
    }

    if (user) {
      setId(id);
      setStudentID(id);
      getNewCards(id);
    }
  }, []);

  const actualHeaders = headers || {};

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStudentID(event.target.value);
    getNewCards(event.target.value);
  };

  const getNewCards = async (id?: any) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/cards/${id}`, {
        headers: actualHeaders,
      });
      const list = response.data.allFlashCards;
      setCards(list);
      setFCards(list);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao obter cards");
      setLoading(false);
    }
  };
  const [category, setCategory] = useState("");
  const fetchStudents = async () => {
    setLoadingStudents(true);
    setAddCardVisible(!addCardVisible);
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers: actualHeaders,
      });
      setStudentsList(response.data.listOfStudents);
      setLoadingStudents(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  /////////////////

  const handleSeeModal = async (cardId: string) => {
    setShowModal(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcardfindone/${studentID}`,
        {
          params: { cardId },
          headers: actualHeaders,
        }
      );
      const newf = response.data.flashcard.front.text;
      const newb = response.data.flashcard.back.text;
      const newlf = response.data.flashcard.front.language;
      const newlb = response.data.flashcard.back.language;
      const newIDcard = response.data.flashcard._id;
      const newComments = response.data.flashcard.backComments;

      setNewBackComments(newComments);
      setNewFront(newf);
      setNewBack(newb);
      setNewLGFront(newlf);
      setNewLGBack(newlb);
      setCardIdToEdit(newIDcard);
    } catch (error) {
      console.log(error, "Erro ao obter cards");
    }
  };
  const handleEditCard = async (cardId: string) => {
    setShowModal(true);
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/flashcard/${studentID}`,
        {
          newFront,
          newBack,
          newLGBack,
          newLGFront,
          newBackComments,
        },
        {
          params: { cardId },
          headers: actualHeaders,
        }
      );
      getNewCards(studentID);
      setShowModal(false);
    } catch (error) {
      console.log(error, "Erro ao obter cards");
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/flashcard/${studentID}`,
        {
          params: { cardId },
          headers: actualHeaders,
        }
      );
      getNewCards(studentID);
      setShowModal(false);
    } catch (error) {
      console.log(error, "Erro ao apagar cards");
    }
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  ///////////////////////

  return (
    <>
      <div
        style={{
          margin: "auto",
          maxWidth: "40rem",
        }}
      >
        <>
          {" "}
          <select
            id="category-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              const filteredCards = fCards.filter((c: any) =>
                c.tags.includes(e.target.value)
              );
              if (e.target.value !== "nofilter") {
                setCards(filteredCards);
              } else {
                getNewCards(studentID);
              }
            }}
          >
            <option value="nofilter">Ver todos os cards</option>
            <option value="vocabulary">Vocabulário</option>
            <option value="modal">Modal verbs</option>
            <option value="possessive">Possessivos</option>
            <option value="question">Question words</option>
            <option value="irregularpast">Irregular Past</option>
            <option value="did">Did & Didn't</option>
            <option value="do">Do & Does</option>
            <option value="dont">Don't & Doesn't</option>
            <option value="presentperfect">Present Perfect</option>
            <option value="pastperfect">Past Perfect</option>
            <option value="be">To be</option>
            <option value="travel">Viagem</option>
            <option value="bodyparts">Partes do corpo</option>
            <option value="businessenglish">Inglês para negócios</option>
            <option value="family">Família</option>
            <option value="animals">Animais</option>
            <option value="fruits">Frutas</option>
            <option value="food">Comida</option>
            <option value="colors">Cores</option>
            <option value="house">Casa</option>
            <option value="supermarket">Supermercado</option>
            <option value="weather">Clima</option>
            <option value="clothes">Roupas</option>
            <option value="time">Horários</option>
            <option value="daysanddates">Dias e Datas</option>
            <option value="car">Carro</option>
            <option value="road">Estrada</option>
            <option value="personality">Personalidade</option>
            <option value="nature">Natureza</option>
            <option value="numbers">Números</option>
            <option value="transportation">Transporte</option>
            <option value="office">Escritório</option>
            <option value="diseases">Doenças</option>
            <option value="professions">Profissões</option>
            <option value="weather">Clima</option>
          </select>
        </>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <ArvinButton onClick={() => getNewCards(studentID)}>
            <i className="fa fa-refresh" aria-hidden="true" />
          </ArvinButton>
          {perm === "superadmin" && (
            <div
              style={{
                display: "inline",
              }}
            >
              {loadingStudents ? (
                <CircularProgress />
              ) : (
                <select onChange={handleStudentChange} value={studentID}>
                  {studentsList.map((student: any, index: number) => (
                    <option key={index} value={student.id}>
                      {student.name + " " + student.lastname}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div
            style={{
              padding: "5px",
              overflowX: "auto",
              backgroundColor: "#eee",
              maxHeight: "50vh",
            }}
          >
            {cards.map((card: any, index: number) => (
              <div
                key={index}
                style={{
                  padding: "1rem",
                  margin: "5px",
                  backgroundColor: "#fff",
                }}
              >
                <div>
                  {perm === "superadmin" && (
                    <ArvinButton
                      onClick={() => {
                        handleSeeModal(card._id);
                      }}
                      color="yellow"
                    >
                      <i className="fa fa-edit" aria-hidden="true" />
                    </ArvinButton>
                  )}
                  {card.front.language && card.front.language !== "pt" && (
                    <button
                      className="audio-button"
                      onClick={() =>
                        readText(card.front.text, true, card.front.language)
                      }
                    >
                      <i className="fa fa-volume-up" aria-hidden="true" />
                    </button>
                  )}
                  <div
                    style={{
                      fontWeight: 600,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: card.front.text,
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: card.back.text,
                    }}
                  />
                  {card.back.language && card.back.language !== "pt" && (
                    <button
                      className="audio-button"
                      onClick={() =>
                        readText(card.back.text, true, card.back.language)
                      }
                    >
                      <i className="fa fa-volume-up" aria-hidden="true" />
                    </button>
                  )}
                </div>
                <br />
                <div
                  style={{
                    fontStyle: "italic",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: card.backComments,
                  }}
                />
                <br />
                <br />
                <div>Reviewed {Math.round(card.numberOfReviews)} times</div>
                <br />
                <div>Review Rate: {card.reviewRate.toFixed(1)}</div>
                <div>Listening Rate: {card.listeningRate.toFixed(1)}</div>

                <div>Easy Reviews: {card.easyReviews}</div>
                <div>
                  Tags:{" "}
                  {card.tags.map((thetag: string, index: number) => {
                    return (
                      <span
                        style={{
                          fontStyle: "italic",
                        }}
                        key={index}
                      >
                        {thetag};{" "}
                      </span>
                    );
                  })}
                </div>

                {perm == "superadmin" && (
                  <div>
                    Review Rate Total: {card.reviewRate}
                    <br />
                    Listening Rate Total: {card.listeningRate}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
          top: 0,
          left: 0,
          display: showModal ? "block" : "none",
          width: "1000000px",
          height: "1000000px",
          position: "fixed",
        }}
        onClick={handleHideModal}
      />
      <div
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: "white",
          padding: "1rem",
          position: "fixed",
          top: "40%",
          left: "40%",
          boxShadow: "1px 1px 10px black",
        }}
        id="modal"
      >
        <Xp onClick={handleHideModal}>X</Xp>
        <article id="front">
          <input
            style={{ maxWidth: "120px" }}
            value={newFront}
            onChange={(e) => {
              setNewFront(e.target.value);
            }}
            type="text"
          />
          <select
            style={{ maxWidth: "120px" }}
            value={newLGFront}
            onChange={(e) => setNewLGFront(e.target.value)}
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
            value={newBack}
            onChange={(e) => setNewBack(e.target.value)}
            type="text"
          />
          <select
            style={{ maxWidth: "120px" }}
            value={newLGBack}
            onChange={(e) => setNewLGBack(e.target.value)}
          >
            {languages.map((language, langIndex) => (
              <option key={langIndex} value={language}>
                {language}
              </option>
            ))}
          </select>
          <br />
          <input
            style={{ maxWidth: "120px" }}
            value={newBackComments}
            onChange={(e) => setNewBackComments(e.target.value)}
            type="text"
          />
          <div>
            <ArvinButton
              onClick={() => handleDeleteCard(cardIdToEdit)}
              color="red"
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </ArvinButton>

            <ArvinButton
              onClick={() => handleEditCard(cardIdToEdit)}
              color="green"
            >
              <i className="fa fa-folder" aria-hidden="true" />
            </ArvinButton>
          </div>
        </article>
      </div>
    </>
  );
};

export default AllCards;
