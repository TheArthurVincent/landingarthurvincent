import React from "react";
import RankingList from "./RankingList";
import { primaryColor, textTitleFont } from "../../../Styles/Styles";
import WarningText from "../../../Resources/Warning";
import { useUserContext } from "../../../Application/SelectLanguage/SelectLanguage";
import RankingExplanationComponent from "./RankingExplanationComponents/RankingExplanationComponents";
import { HThree } from "../../MyClasses/MyClasses.Styled";

export default function RankingExplanation() {
  const { UniversalTexts } = useUserContext();

  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <p>{UniversalTexts.timelineExplanationText}</p>
      <HThree
        style={{
          textAlign: "center",
          color: primaryColor(),
          fontWeight: 600,
          margin: "1rem 0",
        }}
      >
        {UniversalTexts.score}
      </HThree>
      <RankingExplanationComponent />
      <WarningText text={UniversalTexts.t3000} />
      <HThree
        style={{
          textAlign: "center",
          color: primaryColor(),
          fontWeight: 600,
          margin: "1rem 0",
        }}
      >
        {UniversalTexts.monthlyRanking}
      </HThree>
      <ul>
        <li
          style={{
            fontFamily: textTitleFont(),
            padding: "0.5rem",
            borderRadius: "0 1.05rem ",
            border: "2px groove #FFD51E",
            background: "linear-gradient(to right, #A68B12 0%, #FFD51E 80%)",
            marginBottom: "5px",
            color: "#fff",
          }}
        >
          {UniversalTexts.f1st}
        </li>
        <li
          style={{
            fontFamily: textTitleFont(),
            padding: "0.5rem",
            borderRadius: "0 1.05rem ",
            border: "2px groove #B2B2B2",
            background: "linear-gradient(to right, #555 0%, #999 80%)",
            marginBottom: "5px",
            color: "#fff",
          }}
        >
          {UniversalTexts.s2nd}
        </li>
        <li
          style={{
            fontFamily: textTitleFont(),
            padding: "0.5rem",
            borderRadius: "0 1.05rem ",
            border: "2px groove #693D2B",
            background: "linear-gradient(to right, #693D2B 0%, #B47755 80%)",
            marginBottom: "5px",
            color: "#fff",
          }}
        >
          {UniversalTexts.t3rd}
        </li>
      </ul>
      <div style={{ display: "grid", gap: "1rem", padding: "3px" }}>
        <HThree
          style={{
            textAlign: "center",
            color: primaryColor(),
            fontWeight: 600,
            margin: "1rem 0",
          }}
        >
          {UniversalTexts.uplevel}
        </HThree>
        <RankingList />
      </div>
    </div>
  );
}
