import React from "react";
import { levels } from "./RankingLevelsList";
export default function RankingList() {
  const theItems = levels();

  return (
    <div style={{ display: "grid" }}>
      {theItems.map((item, index) => {
        const levelNumber = index;
        return (
          <div
            key={index}
            style={{
              padding: "0.5rem 1rem",
              marginBottom: "5px",
              display: index > 7 ? "none" : "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "0rem 3rem",
              background: theItems[levelNumber].color,
              border: `groove 5px ${theItems[levelNumber].color}`,
              color: theItems[levelNumber].textcolor,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <img
                src={theItems[levelNumber].image2}
                alt={theItems[levelNumber].text}
                style={{ maxWidth: "20rem" }}
              />

              <span
                style={{
                  fontSize: "0.8rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                <h2 style={{ fontSize: "1.5rem" }}>
                  <i
                    className={theItems[levelNumber].icon}
                    aria-hidden="true"
                  />{" "}
                  Level {index + 1} | {theItems[levelNumber].text}
                </h2>
                <p>Total Score: {item.totalScore}</p>

                <p>
                  {index == 0
                    ? "Esforce-se para passar de nível pela PRIMEIRA VEZ"
                    : `${item.discount} de desconto/cashback no mês seguinte à{" "}
                    <strong>PRIMEIRA QUALIFICAÇÃO</strong>.`}
                </p>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
