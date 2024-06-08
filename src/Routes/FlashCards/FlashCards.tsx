import React, { useEffect } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import Helmets from "../../Resources/Helmets";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import { readText } from "../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { secondaryColor, secondaryColor2 } from "../../Styles/Styles";

export function FlashCards({ headers }: HeadersProps) {
  const reviewDay = new Date();
  useEffect(() => {
    console.log(reviewDay);
  }, [reviewDay]);

  const cards = [
    {
      front: { text: "Hi", side: "front", language: "en" },
      back: { text: "Oi", side: "back", language: "pt" },
      reviewDate: new Date(),
    },
    // {
    //   front: { text: "Hi", side: "front", language: "en" },
    //   back: { text: "Oi", side: "back", language: "pt" },
    //   reviewDate: new Date(),
    // },
    // {
    //   front: { text: "Hi", side: "front", language: "en" },
    //   back: { text: "Oi", side: "back", language: "pt" },
    //   reviewDate: new Date(),
    // },
    // {
    //   front: { text: "Hi", side: "front", language: "en" },
    //   back: { text: "Oi", side: "back", language: "pt" },
    //   reviewDate: new Date(),
    // },
  ];

  return (
    <RouteSizeControlBox className="smooth">
      <RouteDiv>
        <HOne>Flash Cards</HOne>
        {cards.map((card, index) => (
          <div key={index}>
            <div
              style={{ maxWidth: "10rem", margin: "auto", textAlign: "center" }}
            >
              <div style={{ borderBottom: "1px solid #ccc", padding: "2rem" }}>
                {card.front.text}
                {card.front.language === "en" && (
                  <button
                    className="audio-button"
                    onClick={() => readText(card.front.text, true)}
                  >
                    <i className="fa fa-volume-up" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div style={{ padding: "1rem" }}>
                {card.back.text}
                {card.back.language === "en" && (
                  <button
                    className="audio-button"
                    onClick={() => readText(card.back.text, true)}
                  >
                    <i className="fa fa-volume-up" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>{" "}
            <div
              style={{ justifyContent: "center", display: "flex", gap: "5px" }}
            >
              <div>
                <ArvinButton type="red">Hard</ArvinButton>
                <p style={{ fontSize: "10px", textAlign: "center" }}>10 dias</p>
              </div>
              <div>
                <ArvinButton type="navy">Medium</ArvinButton>
                <p style={{ fontSize: "10px", textAlign: "center" }}>10 dias</p>
              </div>
              <div>
                <ArvinButton type="green">Easy</ArvinButton>
                <p style={{ fontSize: "10px", textAlign: "center" }}>10 dias</p>
              </div>
            </div>
          </div>
        ))}
      </RouteDiv>
      <Helmets text="Flash Cards Review" />
    </RouteSizeControlBox>
  );
}

export default FlashCards;
