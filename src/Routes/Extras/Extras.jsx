import React, { useEffect } from "react";
import {
  RouteDiv,
  HOne,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  BackToHomePage,
  IFrameVideo,
  logout24h,
} from "../../Resources/UniversalComponents";
import { transparentWhite } from "../../Styles/Styles";
import TopBar from "../../Application/TopBar/TopBar";
import { HThree } from "../MyClasses/MyClasses.Styled";

export function Extras() {
  useEffect(() => {
    logout24h();
  }, []);

  const { UniversalTexts } = useUserContext();

  const contentExtras = [
    {
      instruction: "Como estudar",
      url: "https://player.vimeo.com/video/852643150",
      explanation:
        "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ",
    },
    {
      instruction: "Como usar o Anki",
      url: "https://player.vimeo.com/video/852643150",
      explanation:
        "Lo2rem2 Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem ",
    },
    {
      instruction: "Termos e condições",
      url: "https://player.vimeo.com/video/852643150",
      explanation:
        "Lo2rem2 Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem ",
    },
    {
      instruction: "Aulas ao vivo",
      url: "https://player.vimeo.com/video/852643150",
      explanation:
        "Lo2rem2 Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem Lo2rem ",
    },
  ];
  return (
    <>
      <TopBar />
      <RouteSizeControlBox>
        <RouteDiv>
          <HOne>{UniversalTexts.extras}</HOne> <BackToHomePage />
          {contentExtras.map((item, index) => (
            <div key={index}>
              <HThree>{item.instruction}</HThree>
              <div style={{ textAlign: "center" }}>
                <IFrameVideo src={item.url} frameBorder="0" />
              </div>
              <div
                style={{
                  backgroundColor: transparentWhite(),
                  padding: "1rem",
                  overflow: "auto",
                  maxHeight: "14rem",
                }}
              >
                <p>{item.explanation}</p>
              </div>
            </div>
          ))}
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}

export default Extras;
