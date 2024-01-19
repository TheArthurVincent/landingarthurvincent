import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { BackToHomePage, backDomain } from "../../Resources/UniversalComponents";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";



export default function Ranking({ headers }) {
  const { UniversalTexts } = useUserContext();
  const [students, setStudents] = useState([]);
  const [level, setLevel] = useState(9);
  const [loading, setLoading] = useState(true);


  const items = [
    {
      level: 1,
      icon: "fa fa-star",
      color: "#eee",
      textcolor: "black",
      text: "White Belt"
    },
    {
      level: 2,
      icon: "fa fa-moon-o",
      color: "#FAF477",
      textcolor: "black",
      text: "Yellow Belt"
    },
    {
      level: 3,
      icon: "fa fa-globe",
      color: "#2F0092",
      textcolor: "white",
      text: "Blue Belt"
    },
    {
      level: 4,
      icon: "fa fa-sun-o",
      color: "#FA1000",
      textcolor: "white",
      text: "Red Belt"
    },
    {
      level: 5,
      icon: "fa fa-bolt",
      color: "#58B000",
      textcolor: "white",
      text: "Green Belt"
    },
    {
      level: 6,
      icon: "fa fa-skyatlas",
      color: "#FA6001",
      textcolor: "white",
      text: "Orange Belt"
    },
    {
      level: 7,
      icon: "fa fa-moon-o",
      color: "#8A4C9E",
      textcolor: "white",
      text: "Purple Belt"
    },
    {
      level: 8,
      icon: "fa fa-superpowers",
      color: "#555",
      textcolor: "white",
      text: "Black Belt"
    },

    {
      level: 9,
      icon: "fa fa-edit",
      color: "#789",
      textcolor: "white",
      text: "SUPREME"
    },
    {
      level: 10,
      icon: <CircularProgress />,
      color: "#000",
      textcolor: "black",
      text: <CircularProgress />
    },
  ];


  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/scoresranking/`, {
        headers,
      });
      console.log(response.data.listOfStudents)
      setStudents(response.data.listOfStudents);
      // setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };
  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <>
      <TopBar />

      <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
        <RouteDiv>
          <HOne>RANKING</HOne>
          <BackToHomePage />
          <Button
            onClick={() => fetchStudents()}
          >
            <i
              className="fa fa-refresh" aria-hidden="true"></i>
          </Button>
          {students.map((item, index) => {
            return <RouteDiv key={index}
              style={{
                backgroundColor: "white",
                padding: "0.5rem",
                maxHeight: "16rem",
                minWidth: "9.5rem",
                fontSize: "13px",
                textAlign: "center",
                background: `linear-gradient(to bottom, black 0%, ${items[0].color} 50%)`,
                color: items[0].textcolor,
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <i className={items[0].icon} aria-hidden="true" />
                <h2>
                  {items[0].text}
                </h2>
              </div>
              <img
                style={{
                  width: "5rem",
                  height: "5rem",
                  objectFit: "cover",
                  border: "solid 0.2rem #555",
                  margin: "0.9rem",
                  borderRadius: "50%"
                }}
                src={item.picture}
              />
              <p
                style={{
                  fontWeight: 800,
                  marginBottom: "9px"
                }}
              >
                {item.name} {item.lastName}
              </p>
              <span>
                <p>
                  Total Score: {item.totalScore}
                </p>
                <p>
                  Monthly Score: {item.monthlyScore}
                </p>

              </span>
            </RouteDiv>
          })}


        </RouteDiv>
      </RouteSizeControlBox>

    </>
  );
}
