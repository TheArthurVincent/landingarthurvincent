import React from "react";
import { useUserContext } from "../../../../Application/SelectLanguage/SelectLanguage";
import {
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../../../Styles/Styles";
import {
  GridRankingExplanation,
  GridRankingExplanationCard,
  listOfCriteria,
} from "../ListOfCriteria";

export default function RankingExplanationComponent() {
  const { UniversalTexts } = useUserContext();
  return (
    <GridRankingExplanation>
      {listOfCriteria.map((criteria, index) => (
        <GridRankingExplanationCard key={index}>
          <h3
            style={{
              color: primaryColor(),
              padding: "5px",
              borderRadius: "5px",
              border: "black solid 2px",
              backgroundColor: "white",
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
                backgroundColor: criteria.color,
                color: "white",
                padding: "10px",
                transform: criteria.transform ? criteria.transform : "none",
              }}
              className={criteria.icon}
              aria-hidden="true"
            />{" "}
            <span style={{ fontFamily: "Athiti" }}> {criteria.title}</span>
          </h3>
          <div>
            {criteria.score.map((score, index) => (
              <p
                key={index}
                style={{
                  backgroundColor: primaryColor(),
                  color: textPrimaryColorContrast(),
                  display: "grid",
                  gridTemplateColumns: "1fr 0.6fr",
                  alignItems: "center",
                  margin: "5px",
                  padding: "5px",
                  borderRadius: "15px",
                  gap: "5px",
                }}
              >
                {score.description}{" "}
                <span
                  style={{
                    backgroundColor: score.color,
                    color: textSecondaryColorContrast(),
                    fontSize: "1.1rem",
                    fontFamily: "Athiti",
                    fontWeight: 600,
                    padding: "5px",
                    top:"*15px",
                    borderRadius: "12px",
                  }}
                >
                  {score.score}
                </span>
              </p>
            ))}
          </div>
          {criteria.comment && (
            <div
              style={{
                backgroundColor: "#ddd",
                borderRadius: "10px",
                textAlign: "center",
                padding: "5px",
                fontStyle: "italic",
              }}
            >
              {criteria.comment}
            </div>
          )}
        </GridRankingExplanationCard>
      ))}
    </GridRankingExplanation>
  );
}
