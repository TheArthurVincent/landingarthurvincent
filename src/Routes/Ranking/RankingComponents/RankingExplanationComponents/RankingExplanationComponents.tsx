import React from "react";
import {
  primaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
  textTitleFont,
} from "../../../../Styles/Styles";
import {
  GridRankingExplanation,
  GridRankingExplanationCard,
  listOfCriteria,
} from "../ListOfCriteria";
import { HThree } from "../../../MyClasses/MyClasses.Styled";

export default function RankingExplanationComponent() {
  return (
    <GridRankingExplanation>
      {listOfCriteria.map((criteria, index) => (
        <GridRankingExplanationCard key={index}>
          <HThree
            style={{
              color: primaryColor(),
              padding: "5px",
              borderRadius: "6px",
              border: "black solid 2px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-around",
              fontSize: "1rem",
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
            <span style={{ fontFamily: textTitleFont() }}> {criteria.title}</span>
          </HThree>
          <div>
            {criteria.score.map((score, index) => (
              <p
                key={index}
                style={{
                  height:"fit-content",
                  backgroundColor: primaryColor(),
                  color: textPrimaryColorContrast(),
                  display: "grid",
                  gridTemplateColumns: "1fr 0.6fr",
                  alignItems: "center",
                  margin: "5px",
                  padding: "5px",
                  borderRadius: "6px",
                  gap: "5px",
                }}
              >
                {score.description}{" "}
                <span
                  style={{
                    backgroundColor: score.color,
                    color: textSecondaryColorContrast(),
                    fontFamily: textTitleFont(),
                    fontWeight: 600,
                    padding: "5px",
                    top: "*15px",
                    borderRadius: "6px",
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
                borderRadius: "6px",
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
