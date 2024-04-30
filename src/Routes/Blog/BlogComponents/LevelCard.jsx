import React, { useState } from "react";
import {
  backDomain,
  formatNumber,
  updateScore,
} from "../../../Resources/UniversalComponents";
import { useEffect } from "react";
import axios from "axios";
import {
  DivCardLevel,
  LevelCardLevel,
  LevelCardPhotoLevel,
  NewLevelCardComponent,
  TextLevelCard,
} from "../../../Resources/Components/RouteBox";
import { CircularProgress } from "@mui/material";
import { levels } from "../../Ranking/RankingComponents/RankingLevelsList";
export function LevelCard({ headers, _StudentId, picture }) {
  const [totalScore, setTotalScore] = useState(0);
  const [monthlyScore, setMonthlyScore] = useState(0);
  const [level, setLevel] = useState(9);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState("none");

  const items = levels();

  const seeScore = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/score/${id}`, {
        headers,
      });
      setTotalScore(response.data.totalScore);
      setMonthlyScore(response.data.monthlyScore);
      var newValue = updateScore(response.data.totalScore);
      document.body.style.backgroundImage = `url(${
        items[newValue.level].background
      })`;
      const levelDone = newValue.level;
      setLevel(levelDone);
      setShowCard("block");
      setLoading(false);
    } catch (error) {
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
              <div
                style={{
                  color: items[level].textcolor,
                }}
              >
                <p>Total Score: {formatNumber(totalScore)}</p>
                <p>Monthly Score: {formatNumber(monthlyScore)}</p>
              </div>
            )}
          </div>
        </div>
      </TextLevelCard>
    </NewLevelCardComponent>
  );
}

export default LevelCard;
