import React from "react";
import { levels } from "./RankingLevelsList";
import {
  ImgResponsive,
  formatNumber,
} from "../../../Resources/UniversalComponents";
export default function RankingList() {
  const theItems = levels();

  return (
    <div style={{ display: "grid" }}>
      <ul
        style={{
          padding: "0.5rem 1rem",
          marginBottom: "5px",
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
                display: index > 7 ? "none" : "flex",
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
                  fontSize: "0.8rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                <p style={{ fontSize: "1.2rem" }}>
                  <i
                    className={theItems[levelNumber].icon}
                    aria-hidden="true"
                  />{" "}
                  Level {index + 1} | {theItems[levelNumber].text}
                </p>
                <p>Total Score: {item.totalScore}</p>

                {/* <p>
                  {index == 0
                    ? "Esforce-se para passar de nível pela PRIMEIRA VEZ"
                    : `${item.discount} de desconto/cashback no mês seguinte à PRIMEIRA QUALIFICAÇÃO.`}
                </p> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
