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

const AllCards = ({ headers }: HeadersProps) => {
  const [myId, setId] = useState<string>("");
  const [addCardVisible, setAddCardVisible] = useState<boolean>(false);
  const [cards, setCards] = useState([]);
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
      setLoading(false);
    } catch (error) {
      console.log("Erro ao obter cards");
      setLoading(false);
    }
  };

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

  function getReviewDate(card: any) {
    const reviewDate = new Date(card.reviewDate);
    const today = new Date();

    // Zera a hora para comparar apenas as datas
    today.setHours(0, 0, 0, 0);

    // Se a data for anterior a hoje, retorna a data de hoje
    if (reviewDate < today) {
      return formatDateBr(today);
    }

    // Caso contrário, retorna a data original formatada
    return formatDateBr(reviewDate);
  }
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
                <div>Review Rate: {card.reviewRate}</div>
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
