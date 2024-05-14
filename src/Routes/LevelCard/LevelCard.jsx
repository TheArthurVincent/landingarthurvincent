import React, { useState, useEffect } from "react";
import { levels } from "../Ranking/RankingComponents/RankingLevelsList";
import {
  backDomain,
  formatNumber,
  updateScore,
} from "../../Resources/UniversalComponents";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import {
  LevelCardLevel,
  LevelCardPhotoLevel,
  DivCardLevel,
  TextLevelCard,
  NewLevelCardComponent,
} from "./LevelCard.Styled";

export function LevelCard({ headers, _StudentId, picture }) {
  const [totalScore, setTotalScore] = useState(0);
  const [monthlyScore, setMonthlyScore] = useState(0);
  const [level, setLevel] = useState(9);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState("none");

  const items = levels();

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    if (getLoggedUser.id) {
      setTimeout(() => {
        seeScore(getLoggedUser.id);
      }, 100);
    } else {
      window.location.assign("/login");
    }
  }, []);

  const seeScore = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/score/${id}`, {
        headers,
      });
      setTotalScore(response.data.totalScore);
      setMonthlyScore(response.data.monthlyScore);
      var newValue = updateScore(response.data.totalScore);
      const levelDone = newValue.level;
      setLevel(levelDone);
      setShowCard("block");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewLevelCardComponent
      style={{
        border: `groove 3px ${items[level].color} `,
      }}
    >
      <DivCardLevel>
        <LevelCardLevel
          style={{ display: showCard }}
          src={items[level].image}
          alt="card"
        />
        <LevelCardPhotoLevel src={picture} alt="Profile Picture" />
      </DivCardLevel>
      <TextLevelCard>
        <div
          style={{
            display: showCard,
          }}
        >
          <i
            style={{
              fontSize: "1.5rem",
            }}
            className={items[level].icon}
            aria-hidden="true"
          />
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <i
              onClick={() => seeScore(_StudentId)}
              style={{
                display: showCard,
                cursor: "pointer",
                color: "#fff",
                fontSize: "0.8rem",
                margin: "0",
              }}
              className="fa fa-refresh"
              aria-hidden="true"
            />
            {loading ? (
              <CircularProgress
                style={{
                  color: items[level].color,
                }}
              />
            ) : (
              <div>
                <p style={{ color: "#fff" }}>
                  Total Score: {formatNumber(totalScore)}
                </p>
                <p style={{ color: "#fff" }}>
                  Monthly Score: {formatNumber(monthlyScore)}
                </p>
              </div>
            )}
          </div>
        </div>
      </TextLevelCard>
    </NewLevelCardComponent>
  );
}

export default LevelCard;
