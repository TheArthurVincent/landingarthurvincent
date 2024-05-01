import React from "react";
import { useUserContext } from "../../../../Application/SelectLanguage/SelectLanguage";
import {
  secondaryColor,
  textSecondaryColorContrast,
} from "../../../../Styles/Styles";

export default function RankingExplanationComponent() {
  const { UniversalTexts } = useUserContext();

  

  return (
    <div
      style={{
        padding: "5px",
        border: "1px solid",
        borderRadius: "5px",
        width: "25rem",
      }}
    >
      <h3
        style={{
          backgroundColor: "rgb(230, 160, 32)",
          color: "#eee",
          padding: "5px",
          borderRadius: "5px",
          border: "black solid 2px",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "1.5rem",
          fontWeight: 1000,
          alignItems: "center",
        }}
      >
        {" "}
        <i
          style={{
            borderRadius: "50%",
            backgroundColor: "black",
            padding: "10px",
          }}
          className="fa fa-book"
          aria-hidden="true"
        />{" "}
        <span
          style={{
            fontFamily: "Athiti",
          }}
        >
          {" "}
          Aula particular
        </span>
      </h3>
      <div style={{ display: "grid", gap: "5px", padding: "5px" }}>
        <p
          style={{
            padding: "5px",
          }}
        >
          Homework Realizado:{" "}
          <span
            style={{
              backgroundColor: secondaryColor(),
              color: textSecondaryColorContrast(),
              fontSize: "1.1rem",
              fontFamily: "Athiti",
              fontWeight: 600,
              padding: "5px",
              borderRadius: "12px",
            }}
          >
            + 625
          </span>
        </p>
        <p
          style={{
            padding: "5px",
          }}
        >
          Prova:{" "}
          <span
            style={{
              backgroundColor: secondaryColor(),
              color: textSecondaryColorContrast(),
              fontSize: "1.1rem",
              fontFamily: "Athiti",
              fontWeight: 600,
              padding: "5px",
              borderRadius: "12px",
            }}
          >
            + 625
          </span>
        </p>
      </div>
      <span>
        **(A prova pode ser realizada em Março/Junho/Setembro/Dezembro):{" "}
      </span>
    </div>
  );
}
