import React, { useState } from "react";
import { Button } from "@mui/material";
import theitems from "../../Ranking/RankingComponents/ranking.json";
import { backDomain } from "../../../Resources/UniversalComponents";
import { useEffect } from "react";
import axios from "axios";
import { LevelCardComponent } from "../../../Resources/Components/RouteBox";

export function LevelCard({ headers, _StudentId, picture, name, lastName }) {
  const items = theitems.items;
  const [totalScore, setTotalScore] = useState(0);
  const [monthlyScore, setMonthlyScore] = useState(0);
  const [level, setLevel] = useState(9);

  const seeScore = async (id) => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/score/${id}`, {
        headers,
      });
      setTotalScore(response.data.totalScore);
      setMonthlyScore(response.data.monthlyScore);
      setLevel(
        response.data.totalScore >= 12000 &&
          response.data.totalScore < 24999 &&
          response.data.monthlyScore >= 3000
          ? 1
          : response.data.totalScore >= 25000 &&
            response.data.totalScore < 39999 &&
            response.data.monthlyScore >= 3000
          ? 2
          : response.data.totalScore >= 40000 &&
            response.data.totalScore < 59999 &&
            response.data.monthlyScore >= 3000
          ? 3
          : response.data.totalScore >= 60000 &&
            response.data.totalScore < 79999 &&
            response.data.monthlyScore >= 3000
          ? 4
          : response.data.totalScore >= 80000 &&
            response.data.totalScore < 119999 &&
            response.data.monthlyScore >= 3000
          ? 5
          : response.data.totalScore >= 120000 &&
            response.data.totalScore < 239999 &&
            response.data.monthlyScore >= 3000
          ? 6
          : response.data.totalScore >= 240000 &&
            response.data.totalScore < 1999999 &&
            response.data.monthlyScore >= 3000
          ? 7
          : response.data.totalScore >= 2000000
          ? 8
          : 0
      );
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setTimeout(() => {
      seeScore(getLoggedUser.id);
    }, 300);
  }, []);

  return (
    <LevelCardComponent
      style={{
        background: `linear-gradient(to bottom, black 0%, ${items[level].color} 50%)`,
        color: items[level].textcolor,
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
        <i className={items[level].icon} aria-hidden="true" />
        <h2>{items[level].text}</h2>
      </div>
      <img
        style={{
          width: "5rem",
          height: "5rem",
          objectFit: "cover",
          border: "solid 0.2rem #555",
          margin: "auto",
          borderRadius: "50%",
        }}
        src={picture}
      />
      <p
        style={{
          fontWeight: 800,
          marginBottom: "9px",
        }}
      >
        {name} {lastName}
      </p>
      <span>
        <p>Total Score: {totalScore}</p>
        <p>Monthly Score: {monthlyScore}</p>
        <Button
          onClick={() => seeScore(_StudentId)}
          style={{
            color: items[level].textcolor,
          }}
        >
          <i className="fa fa-refresh" aria-hidden="true"></i>
        </Button>
      </span>
    </LevelCardComponent>
  );
}

export default LevelCard;
