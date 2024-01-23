import React from "react";
import theitems from "./ranking.json"

export default function RankingList() {

  return (<div
    style={{ display: "flex" }}
  >
    <div>
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
            backgroundColor: "white",
            padding: "0.5rem",
            maxHeight: "16rem",
            marginBottom: "0.5rem",
            textAlign: "center",
            maxWidth: "15rem",
            alignItems: "center",
            justifyContent: "space-evenly",
            display: index > 7 ? "none" : "flex",
            background: `linear-gradient(to bottom, black 0%, ${theitems.items[levelNumber].color} 50%)`,
            color: theitems.items[levelNumber].textcolor,
          }}>
            <span style={{ fontSize: "0.5rem", display: "flex", alignItems: "center", textAlign: "left", justifyContent: "space-between", gap: "1rem" }}>
              <h2>
                Level: {index + 1}-{" "}
                <i className={theitems.items[levelNumber].icon} aria-hidden="true" />
                {" "}{" "}{" "}{" "}{theitems.items[levelNumber].text}
              </h2>
              <p>  Total Score: {item.totalScore}
              </p>
            </span>
          </div>
        );
      })}
    </div>
  </div>
  );
}


