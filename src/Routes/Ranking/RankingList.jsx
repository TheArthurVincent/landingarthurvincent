import React from "react";
import { CircularProgress } from "@mui/material";

export default function RankingList() {

  const items = [
    {
      level: 1,
      icon: "fa fa-star",
      color: "#eee",
      textcolor: "black",
      text: "White Belt",
      totalScore: 0
    },
    {
      level: 2,
      icon: "fa fa-moon-o",
      color: "#FAF477",
      textcolor: "black",
      text: "Yellow Belt",
      totalScore: 12000
    },
    {
      level: 3,
      icon: "fa fa-globe",
      color: "#2F0092",
      textcolor: "white",
      text: "Blue Belt",
      totalScore: 25000,
    },
    {
      level: 4,
      icon: "fa fa-sun-o",
      color: "#FA1000",
      textcolor: "white",
      text: "Red Belt",
      totalScore: 40000,
    },
    {
      level: 5,
      icon: "fa fa-bolt",
      color: "#58B000",
      textcolor: "white",
      text: "Green Belt",
      totalScore: 60000,
    },
    {
      level: 6,
      icon: "fa fa-skyatlas",
      color: "#FA6001",
      textcolor: "white",
      text: "Orange Belt",
      totalScore: 80000,
    },
    {
      level: 7,
      icon: "fa fa-moon-o",
      color: "#8A4C9E",
      textcolor: "white",
      text: "Purple Belt",
      totalScore: 120000,
    },
    {
      level: 8,
      icon: "fa fa-superpowers",
      color: "#555",
      textcolor: "white",
      text: "Black Belt",
      totalScore: 240000,
    },

    {
      level: 9,
      icon: "fa fa-edit",
      color: "#789",
      textcolor: "white",
      text: "SUPREME",
      totalScore: 1200000
    },
    {
      level: 10,
      icon: <CircularProgress />,
      color: "#000",
      textcolor: "black",
      text: <CircularProgress />
    },
  ];

  return (<div
    style={{ display: "flex" }}
  >
    <div>
      {items.map((item, index) => {
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
            background: `linear-gradient(to bottom, black 0%, ${items[levelNumber].color} 50%)`,
            color: items[levelNumber].textcolor,
          }}>
            <span style={{ fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <h2>
                {index +1}-{" "}
                <i className={items[levelNumber].icon} aria-hidden="true" />
                {" "}{" "}{" "}{" "}{items[levelNumber].text}
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


