import React, { useEffect, useState } from "react";
import {
  alwaysWhite,
  primaryColor,
  textPrimaryColorContrast,
} from "../../../Styles/Styles";
import axios from "axios";
import {
  Disapear,
  DivHover,
  backDomain,
  formatDate,
} from "../../../Resources/UniversalComponents";
import { Button } from "@mui/material";

export default function RankingTimeline({
  timeline,
  headers,
  display,
  position,
  id,
  name,
}) {
  const [localTimeline, setLocalTimeline] = useState([]);

  const seeScore = async (id) => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/score/${id}`, {
        headers,
      });
      setLocalTimeline(response.data.scoreTimeline);
      console.log(response.data, localTimeline);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  useEffect(() => {
    seeScore(id);
  }, []);

  return (
    <div
      style={{
        display: display,
        position: position,
        top: "10%",
        borderRadius: "1rem",
        left: "30%",
        color: primaryColor(),
        backgroundColor: textPrimaryColorContrast(),
        padding: "1rem",
      }}
    >
      <Button onClick={() => seeScore(id)}>
        <i className="fa fa-refresh" aria-hidden="true"></i>
      </Button>
      <span
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "0.5rem" }}>{name}</h1>
        <p
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            fontWeight: 900,
            display: position === "fixed" ? "block" : "none",
          }}
        >
          x
        </p>
      </span>
      <div
        style={{
          maxHeight: "25rem",
          margin: "auto",
          maxWidth: "50rem",
          overflow: "auto",
          padding: "1rem",
          fontWeight: 600,
          border: "solid 1px grey",
        }}
      >
        {localTimeline.map((item, index) => {
          const variables = {
            type:
              item.type == "Anki"
                ? "fa fa-star-o"
                : item.type == "Homework"
                ? "fa fa-book"
                : item.type == "Extra activity"
                ? "fa fa-users"
                : item.type == "Live Class"
                ? "fa fa-graduation-cap"
                : "fa fa-pencil",
            color:
              item.type == "Anki"
                ? "#01BCFF"
                : item.type == "Homework"
                ? "#E6A020"
                : item.type == "Extra activity"
                ? "#123"
                : item.type == "Live Class"
                ? "#753"
                : "#123",
          };

          return (
            <DivHover key={index}>
              <div>
                <div
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                    gap: "10px",
                    fontFamily: "Athiti",
                    padding: "0.5rem 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <i
                      color=""
                      style={{
                        backgroundColor: variables.color,
                        color: "white",
                        padding: "0.5rem",
                        borderRadius: "50%",
                        fontWeight: 700,
                        transform: "rotate(-25deg)",
                      }}
                      className={variables.type}
                      aria-hidden="true"
                    />{" "}
                    <span>{item.type}</span>
                  </div>
                  <span>
                    <Disapear>
                      {formatDate(item.date)} | {item.description} |{" "}
                    </Disapear>
                    <span
                      style={{
                        color: alwaysWhite(),
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        backgroundColor: item.score < 0 ? "red" : "green",
                      }}
                    >
                      {" "}
                      {item.score}{" "}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    textAlign: "center",
                  }}
                ></div>
              </div>
            </DivHover>
          );
        })}
      </div>
    </div>
  );
}
