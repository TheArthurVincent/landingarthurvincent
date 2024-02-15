import React, { useState } from "react";
import { Button } from "@mui/material";
import theitems from "../../Ranking/RankingComponents/ranking.json";
import { backDomain } from "../../../Resources/UniversalComponents";
import { useEffect } from "react";
import axios from "axios";
import { NewLevelCardComponent } from "../../../Resources/Components/RouteBox";
import blue from "../../../../public/assets/blue.png";
import black from "../../../../public/assets/black.png";
import orange from "../../../../public/assets/orange.png";
import white from "../../../../public/assets/white.png";
import purple from "../../../../public/assets/purple.png";
import red from "../../../../public/assets/red.png";
import green from "../../../../public/assets/green.png";
import yellow from "../../../../public/assets/yellow.png";
import supreme from "../../../../public/assets/supreme.png";
import { secondaryColor } from "../../../Styles/Styles";

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
        response.data.totalScore >= 12000 && response.data.totalScore < 25000
          ? 1
          : response.data.totalScore >= 25000 &&
            response.data.totalScore < 40000
          ? 2
          : response.data.totalScore >= 40000 &&
            response.data.totalScore < 60000
          ? 3
          : response.data.totalScore >= 60000 &&
            response.data.totalScore < 80000
          ? 4
          : response.data.totalScore >= 80000 &&
            response.data.totalScore < 120000
          ? 5
          : response.data.totalScore >= 120000 &&
            response.data.totalScore < 240000
          ? 6
          : response.data.totalScore >= 240000 &&
            response.data.totalScore < 2000000
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
    <NewLevelCardComponent
      style={{
        borderTop: `solid 4px ${
          totalScore >= 12000 && totalScore < 25000
            ? "#F5BD33"
            : totalScore >= 25000 && totalScore < 40000
            ? "#0C55A5"
            : totalScore >= 40000 && totalScore < 60000
            ? "#B7050B"
            : totalScore >= 60000 && totalScore < 80000
            ? "#ADB762"
            : totalScore >= 80000 && totalScore < 120000
            ? "#FB6E02"
            : totalScore >= 120000 && totalScore < 240000
            ? "#703A74"
            : totalScore >= 240000 && totalScore < 2000000
            ? "#000"
            : totalScore >= 2000000
            ? secondaryColor()
            : "white"
        } `,
        borderBottom: `solid 4px ${
          totalScore >= 12000 && totalScore < 25000
            ? "#F5BD33"
            : totalScore >= 25000 && totalScore < 40000
            ? "#0C55A5"
            : totalScore >= 40000 && totalScore < 60000
            ? "#B7050B"
            : totalScore >= 60000 && totalScore < 80000
            ? "#ADB762"
            : totalScore >= 80000 && totalScore < 120000
            ? "#FB6E02"
            : totalScore >= 120000 && totalScore < 240000
            ? "#703A74"
            : totalScore >= 240000 && totalScore < 2000000
            ? "#000"
            : totalScore >= 2000000
            ? secondaryColor()
            : "white"
        } `,

        borderLeft: `groove 2px ${
          totalScore >= 12000 && totalScore < 25000
            ? "#F5BD33"
            : totalScore >= 25000 && totalScore < 40000
            ? "#0C55A5"
            : totalScore >= 40000 && totalScore < 60000
            ? "#B7050B"
            : totalScore >= 60000 && totalScore < 80000
            ? "#ADB762"
            : totalScore >= 80000 && totalScore < 120000
            ? "#FB6E02"
            : totalScore >= 120000 && totalScore < 240000
            ? "#703A74"
            : totalScore >= 240000 && totalScore < 2000000
            ? "#000"
            : totalScore >= 2000000
            ? secondaryColor()
            : "white"
        } `,
        borderRight: `groove 2px ${
          totalScore >= 12000 && totalScore < 25000
            ? "#F5BD33"
            : totalScore >= 25000 && totalScore < 40000
            ? "#0C55A5"
            : totalScore >= 40000 && totalScore < 60000
            ? "#B7050B"
            : totalScore >= 60000 && totalScore < 80000
            ? "#ADB762"
            : totalScore >= 80000 && totalScore < 120000
            ? "#FB6E02"
            : totalScore >= 120000 && totalScore < 240000
            ? "#703A74"
            : totalScore >= 240000 && totalScore < 2000000
            ? "#000"
            : totalScore >= 2000000
            ? secondaryColor()
            : "white"
        } `,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "7rem",
          height: "7rem",
          margin: "auto",
        }}
      >
        <img
          style={{
            width: "12rem",
            height: "12rem",
            objectFit: "cover",
            top: "50%",
            position: "absolute",
            left: "50%",
            zIndex: 10000,
            transform: "translate(-50%, -40%)",
          }}
          src={
            totalScore >= 12000 && totalScore < 25000
              ? yellow
              : totalScore >= 25000 && totalScore < 40000
              ? blue
              : totalScore >= 40000 && totalScore < 60000
              ? red
              : totalScore >= 60000 && totalScore < 80000
              ? green
              : totalScore >= 80000 && totalScore < 120000
              ? orange
              : totalScore >= 120000 && totalScore < 240000
              ? purple
              : totalScore >= 240000 && totalScore < 2000000
              ? black
              : totalScore >= 2000000
              ? supreme
              : white
          }
          alt="Yellow Image"
        />
        <img
          style={{
            width: "7rem",
            height: "7rem",
            borderRadius: "50%",
            objectFit: "cover",
            position: "absolute",
            top: "17%",
            left: "0%",
          }}
          src={picture}
          alt="Profile Picture"
        />
      </div>
      <div
        style={{
          top: "30%",
          left: "0%",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            alignItems: "center",
          }}
        >
          <i
            style={{

              fontSize: "1.8rem",
              marginBottom: "5px",
            }}
            className={items[level].icon}
            aria-hidden="true"
          />
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginTop: "0.5rem",

            }}
          >
            <i
              onClick={() => seeScore(_StudentId)}
              style={{
                cursor: "pointer",
                color: "#fff",
                fontSize: "0.8rem",
                margin: "0",
              }}
              className="fa fa-refresh"
              aria-hidden="true"
            />
            <div>
              <p>Total Score: {totalScore}</p>
              <p>Monthly Score: {monthlyScore}</p>
            </div>
          </div>
        </div>
      </div>
    </NewLevelCardComponent>
  );
}

export default LevelCard;
{
  /* <LevelCardComponent
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
        <div>
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
        </div>
      </LevelCardComponent> */
}
