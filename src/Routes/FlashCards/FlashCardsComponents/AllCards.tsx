import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  backDomain,
  formatDateBr,
} from "../../../Resources/UniversalComponents";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { CircularProgress } from "@mui/material";

const AllCards = ({ headers }: HeadersProps) => {
  const [myId, setId] = useState<string>("");
  const [addCardVisible, setAddCardVisible] = useState<boolean>(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const actualHeaders = headers || {};
  
  const [studentsList, setStudentsList] = useState<any>([]);
  const [studentID, setStudentID] = useState<string>("");
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
    setAddCardVisible(!addCardVisible);
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers: actualHeaders,
      });
      setStudentsList(response.data.listOfStudents);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    const { id, permissions } = JSON.parse(user || "");
    if (permissions == "superadmin") {
      fetchStudents();
    }

    if (user) {
      setId(id);
      setStudentID(id);
      getNewCards(id);
    }
  }, []);

  return (
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
        <ArvinButton onClick={() => getNewCards(myId)}>
          <i className="fa fa-refresh" aria-hidden="true" />
        </ArvinButton>
        {myId === "651311fac3d58753aa9281c5" && (
          <div
            style={{
              display: "inline",
            }}
          >
            <select onChange={handleStudentChange} value={studentID}>
              {studentsList.map((student: any, index: number) => (
                <option key={index} value={student.id}>
                  {student.name + " " + student.lastname}
                </option>
              ))}
            </select>
            <ArvinButton color="green" onClick={fetchStudents}>
              <i className="fa fa-refresh" aria-hidden="true" />
              <i className="fa fa-user" aria-hidden="true" />
            </ArvinButton>
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
              <div>Next Review: {formatDateBr(card.reviewDate)}</div>
              <div>Reviewed {card.numberOfReviews} times</div>
              <div>Review Rate: {card.reviewRate}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCards;
