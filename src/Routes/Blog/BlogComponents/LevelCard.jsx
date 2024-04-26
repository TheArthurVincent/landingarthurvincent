import React, { useState } from "react";
import theitems from "../../Ranking/RankingComponents/ranking.json";
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
import blue from "../../../../public/assets/blue.png";
import black from "../../../../public/assets/black.png";
import orange from "../../../../public/assets/orange.png";
import white from "../../../../public/assets/white.png";
import purple from "../../../../public/assets/purple.png";
import red from "../../../../public/assets/red.png";
import green from "../../../../public/assets/green.png";
import yellow from "../../../../public/assets/yellow.png";
import supreme from "../../../../public/assets/supreme.png";
import { CircularProgress } from "@mui/material";
export function LevelCard({ headers, _StudentId, picture }) {
  const items = theitems.levels;
  const [totalScore, setTotalScore] = useState(0);
  const [monthlyScore, setMonthlyScore] = useState(0);
  const [level, setLevel] = useState(9);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState("none");
  const [color, setColor] = useState("");
  const seeScore = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/score/${id}`, {
        headers,
      });

      setTotalScore(response.data.totalScore);
      setMonthlyScore(response.data.monthlyScore);
      var newValue = updateScore(response.data.totalScore);
      console.log("newValue", newValue.level);
      document.body.style.backgroundImage = `url(${
        items[newValue.level].background
      })`;
      setLevel(newValue.level);
      setColor(newValue.color);
      setShowCard("block");
      setLoading(false);
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
    <NewLevelCardComponent
      style={{
        border: `groove 3px ${color} `,
      }}
    >
      <DivCardLevel>
        <LevelCardLevel
          style={{ display: showCard }}
          src={
            totalScore >= 10000 && totalScore < 20000
              ? yellow
              : totalScore >= 20000 && totalScore < 35000
              ? blue
              : totalScore >= 35000 && totalScore < 50000
              ? red
              : totalScore >= 50000 && totalScore < 65000
              ? green
              : totalScore >= 65000 && totalScore < 80000
              ? orange
              : totalScore >= 80000 && totalScore < 100000
              ? purple
              : totalScore >= 100000 && totalScore < 2000000
              ? black
              : totalScore >= 2000000
              ? supreme
              : white
          }
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
                  color: color,
                }}
              />
            ) : (
              <div>
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
