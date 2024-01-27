import React from "react";
import theitems from "./ranking.json"

export default function RankingList() {

  return (<>
    {theitems.items.map((item, index) => {
      const levelNumber = (
        item.totalScore < 12000 ? 0 :
          item.totalScore < 25000 ? 1 :
            item.totalScore < 40000 ? 2 :
              item.totalScore < 60000 ? 3 :
                item.totalScore < 80000 ? 4 :
                  item.totalScore < 120000 ? 5 :
                    item.totalScore < 240000 ? 6 :
                      item.totalScore < 1200000 ? 7 : 8
      );
      return (
        <div key={index} style={{
          padding: "0.5rem 1rem",
          marginBottom: "1px",
          borderRadius: "1rem",
          display: index > 7 ? "none" : "block",
          background: theitems.items[levelNumber].color,
          color: theitems.items[levelNumber].textcolor,
        }}>
          <span
            style={{ display: "flex", justifyContent: "left", alignItems: "center", gap: "2rem" }}>
            <i
              style={{
                fontSize: "1.5rem",
                width: "1.5rem",
                padding: "0.5rem",
                borderRadius: "50%",
                textAlign: "center",
                backgroundColor: theitems.items[levelNumber].textcolor,
                color: theitems.items[levelNumber].color
              }}
              className={theitems.items[levelNumber].icon} aria-hidden="true" />
            <span style={{
              fontSize: "0.8rem",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem"
            }}>
              <h2          >
                Level {index + 1}{" "}|{" "}
                {" "}{theitems.items[levelNumber].text}
              </h2>
              <p>Score: {item.totalScore}
              </p>
              <p>  Chegou neste nível? Ganhe {item.discount} de desconto/cashback no mês seguinte à <strong>PRIMEIRA QUALIFICAÇÃO</strong>.
              </p>
            </span>
          </span>
        </div>
      );
    })}</>)
}


