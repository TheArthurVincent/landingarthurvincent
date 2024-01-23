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
import RankingList from "./RankingList";



export default function Ranking({ headers }) {
  const [students, setStudents] = useState([]);
  const [level, setLevel] = useState(9);
  const [loading, setLoading] = useState(true);


  const items = [
    {
      level: 1,
      icon: "fa fa-star",
      color: "#eee",
      textcolor: "black",
      text: "White Belt",
      totalScore: 0
    },
    {
      level: 2,
      icon: "fa fa-moon-o",
      color: "#FAF477",
      textcolor: "black",
      text: "Yellow Belt",
      totalScore: 12000
    },
    {
      level: 3,
      icon: "fa fa-globe",
      color: "#2F0092",
      textcolor: "white",
      text: "Blue Belt",
      totalScore: 25000,
    },
    {
      level: 4,
      icon: "fa fa-sun-o",
      color: "#FA1000",
      textcolor: "white",
      text: "Red Belt",
      totalScore: 40000,
    },
    {
      level: 5,
      icon: "fa fa-bolt",
      color: "#58B000",
      textcolor: "white",
      text: "Green Belt",
      totalScore: 60000,
    },
    {
      level: 6,
      icon: "fa fa-skyatlas",
      color: "#FA6001",
      textcolor: "white",
      text: "Orange Belt",
      totalScore: 80000,
    },
    {
      level: 7,
      icon: "fa fa-moon-o",
      color: "#8A4C9E",
      textcolor: "white",
      text: "Purple Belt",
      totalScore: 120000,
    },
    {
      level: 8,
      icon: "fa fa-superpowers",
      color: "#555",
      textcolor: "white",
      text: "Black Belt",
      totalScore: 240000,
    },

    {
      level: 9,
      icon: "fa fa-edit",
      color: "#789",
      textcolor: "white",
      text: "SUPREME",
      totalScore: 1200000
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
    setLoading(true);

    try {
      const response = await axios.get(`${backDomain}/api/v1/scoresranking/`, {
        headers,
      });
      console.log(response.data.listOfStudents)
      setStudents(response.data.listOfStudents);
      setLoading(false);
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
          <HOne>MONTHLY RANKING</HOne>
          <Button
            onClick={() => fetchStudents()}
          >
            <i
              className="fa fa-refresh" aria-hidden="true"></i>
          </Button>
          <div
            style={{ display: "flex" ,justifyContent:"space-between"}}
          >
            <span>
              {
                loading ? <CircularProgress /> :
                  students.map((item, index) => {
                    const levelNumber = (
                      item.totalScore < 12000 ? 0 :
                        item.totalScore < 25000 ? 1 :
                          item.totalScore < 40000 ? 2 :
                            item.totalScore < 60000 ? 3 :
                              item.totalScore < 80000 ? 4 :
                                item.totalScore < 120000 ? 5 :
                                  item.totalScore < 240000 ? 6 :
                                    item.totalScore < 1200000 ? 7 : 8)
                    return <RouteDiv key={index}
                      style={{
                        backgroundColor: "white",
                        padding: "0.5rem",
                        maxHeight: "16rem",
                        minWidth: "50rem",
                        marginBottom: "0.5rem",
                        fontSize: "13px",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        display: "flex",
                        background: `linear-gradient(to bottom, black 0%, ${items[levelNumber].color} 50%)`,
                        color: items[levelNumber].textcolor,
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          color: "white",
                        }}
                      >

                        <h1
                          style={{
                            fontWeight: 800,
                            marginBottom: "9px"
                          }}
                        >
                          {index + 1}
                          {" "}|{" "}
                          {item.name}
                        </h1>
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

                      </div>

                      <span
                        style={{ fontSize: "1rem" }}
                      >
                        {item.monthlyScore >= 3000 && <h2
                          style={{ backgroundColor: "green", color: "white", padding: "0.5rem", marginBottom: "0.5rem", fontSize: "1rem" }}
                        >Running for prize!</h2>}
                        <h2>
                          <i className={items[levelNumber].icon} aria-hidden="true" />
                          {" "}{" "}{" "}{" "}{items[levelNumber].text}
                        </h2>
                        <p>
                          Total Score: {item.totalScore}
                        </p>
                        <p>
                          Monthly Score: {item.monthlyScore}
                        </p>

                      </span>
                    </RouteDiv>
                  })}
            </span>
            <RankingList />
          </div>

        </RouteDiv>
      </RouteSizeControlBox>

    </>
  );
}


