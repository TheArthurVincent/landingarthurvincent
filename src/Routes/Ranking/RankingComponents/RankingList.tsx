import React from "react";
import { levels } from "./RankingLevelsList";
import { ImgResponsive } from "../../../Resources/UniversalComponents";
export default function RankingList() {
  const theItems = levels();

  return (
    <div style={{ display: "grid" }}>
      <ul
        style={{
          padding: "5px",
          margin: "5px",
        }}
      >
        {theItems.map((item, index) => {
          const levelNumber = index;
          return (
            <li
              key={index}
              style={{
                alignItems: "center",
                background: theItems[levelNumber].color,
                color: theItems[levelNumber].textcolor,
                display: index > 10 ? "none" : "flex",
                justifyContent: "space-around",
                gap: "2rem",
                marginBottom: "1px",
              }}
            >
              <ImgResponsive
                src={theItems[levelNumber].image2}
                alt={theItems[levelNumber].text}
              />
              <div
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  fontSize: "1rem",
                }}
              >
                <p>
                  <i
                    className={theItems[levelNumber].icon}
                    aria-hidden="true"
                  />{" "}
                  Level {index + 1} | {theItems[levelNumber].text}
                </p>
                <p>Total Score: {item.totalScore}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
