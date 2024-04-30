import React from "react";
import RankingList from "./RankingList";
import { primaryColor } from "../../../Styles/Styles";
import {
  IFrameVideoInstructions,
  ImgResponsive2,
  getVideoEmbedUrl,
} from "../../../Resources/UniversalComponents";
import WarningText from "../../../Resources/Warning";
import { useUserContext } from "../../../Application/SelectLanguage/SelectLanguage";

export default function RankingExplanation() {
  const { UniversalTexts } = useUserContext();

  const h3 = {
    textAlign: "center",
    color: primaryColor(),
    fontWeight: 600,
    margin: "1rem 0",
  };
  return (
    <>
      <p>{UniversalTexts.timelineExplanationText}</p>
      <h3 style={h3}>{UniversalTexts.score}</h3>
      <div
        style={{
          margin: "auto",
          display: "grid",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          alignContent: "center",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <ImgResponsive2
          src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/Levels%20_1%20(1).png?updatedAt=1709316937391"
          alt="class"
        />
        <ImgResponsive2
          src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/Levels%20_1%20(3).png?updatedAt=1709318003761"
          alt="anki"
        />
        <ImgResponsive2
          src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/groupclassesscore.png?updatedAt=1709216354830"
          alt="group"
        />
        <ImgResponsive2
          src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/othersscore.png?updatedAt=1709216354890"
          alt="others"
        />
      </div>
      <WarningText text={UniversalTexts.t3000} />
      <h3 style={h3}>{UniversalTexts.monthlyRanking}</h3>
      <ul>
        <li
          style={{
            fontFamily: "Athiti",
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
            fontFamily: "Athiti",
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
            fontFamily: "Athiti",
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
      <div style={{ display: "grid", gap: "2rem", padding: "3px" }}>
        <h3 style={h3}>{UniversalTexts.uplevel}</h3>
        <IFrameVideoInstructions
          src={getVideoEmbedUrl("https://vimeo.com/913456514?share=copy")}
        />
        <RankingList />
      </div>
    </>
  );
}
