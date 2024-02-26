import React, { useEffect, useState } from "react";
import { RouteDiv } from "../../../Resources/Components/RouteBox";
import { backDomain } from "../../../Resources/UniversalComponents";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import theitems from "./ranking.json";
import blue from "../../../../public/assets/bl.jpg";
import black from "../../../../public/assets/b.jpg";
import orange from "../../../../public/assets/o.jpg";
import white from "../../../../public/assets/w.jpg";
import purple from "../../../../public/assets/p.jpg";
import red from "../../../../public/assets/r.jpg";
import green from "../../../../public/assets/g.jpg";
import yellow from "../../../../public/assets/y.jpg";

export default function StudentsRanking({ headers }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${backDomain}/api/v1/scoresranking/`, {
        headers,
      });
      setStudents(response.data.listOfStudents);
      setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <Button onClick={() => fetchStudents()}>
        <i className="fa fa-refresh" aria-hidden="true"></i>
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        students.map((item, index) => {
          const levelNumber =
            item.totalScore >= 10000 && item.totalScore < 20000
              ? 1
              : item.totalScore >= 20000 && item.totalScore < 35000
              ? 2
              : item.totalScore >= 35000 && item.totalScore < 50000
              ? 3
              : item.totalScore >= 50000 && item.totalScore < 65000
              ? 4
              : item.totalScore >= 65000 && item.totalScore < 80000
              ? 5
              : item.totalScore >= 80000 && item.totalScore < 100000
              ? 6
              : item.totalScore >= 100000 && item.totalScore < 2000000
              ? 7
              : item.totalScore >= 2000000
              ? 8
              : 0;
          return (
            <Tooltip
              key={index}
              title="A pontuação mensal mínima para concorrer é 3000."
            >
              <h2
                style={{
                  backgroundColor:
                    item.monthlyScore >= 3000 ? "green" : "orange",
                  color: "white",
                  padding: "0.5rem",
                  margin: 0,
                  fontSize: "0.8rem",
                }}
              >
                {item.monthlyScore >= 3000
                  ? "Running for prize!"
                  : "Not running for prize yet!"}
              </h2>
              <RouteDiv
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  maxHeight: "16rem",
                  marginBottom: "0.5rem",
                  fontSize: "13px",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  display: "flex",
                  border: `solid 3px ${
                    item.monthlyScore >= 3000 ? "green" : "orange"
                  }`,
                  backgroundImage: `
                ${
                  item.totalScore >= 10000 && item.totalScore < 20000
                    ? `url(${yellow})`
                    : item.totalScore >= 20000 && item.totalScore < 35000
                    ? `url(${blue})`
                    : item.totalScore >= 35000 && item.totalScore < 50000
                    ? `url(${red})`
                    : item.totalScore >= 50000 && item.totalScore < 65000
                    ? `url(${green})`
                    : item.totalScore >= 65000 && item.totalScore < 80000
                    ? `url(${orange})`
                    : item.totalScore >= 80000 && item.totalScore < 100000
                    ? `url(${purple})`
                    : item.totalScore >= 100000 && item.totalScore < 2000000
                    ? `url(${black})`
                    : item.totalScore >= 2000000
                    ? `url(${black})`
                    : `url(${white})`
                }`,
                  color: theitems.items[levelNumber].textcolor,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <h1
                    style={{
                      fontWeight: 600,
                      margin: 0,
                      padding: "5px",
                      fontSize: "1.1rem",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    #{index + 1} | {item.name}
                  </h1>
                  <img
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                      border: "solid 0.2rem #555",
                      margin: "0.9rem",
                      borderRadius: "50%",
                    }}
                    src={item.picture}
                  />
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    padding: "0.5rem",
                    borderRadius: "1rem 0",
                    color: theitems.items[levelNumber].color,
                    backgroundColor:
                      theitems.items[levelNumber].backgroundColor,
                  }}
                >
                  <h2>
                    <i
                      className={theitems.items[levelNumber].icon}
                      aria-hidden="true"
                    />{" "}
                    {theitems.items[levelNumber].text}
                  </h2>
                  <p>Total Score: {item.totalScore}</p>
                  <p>Monthly Score: {item.monthlyScore}</p>
                </div>
              </RouteDiv>
            </Tooltip>
          );
        })
      )}
    </div>
  );
}
