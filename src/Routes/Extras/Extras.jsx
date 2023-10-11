import React, { useEffect } from "react";
import {
  RouteDiv,
  HOne,
  RouteSizeControlBox,
  HTwo,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  BackToHomePage,
  IFrameVideo,
  logout24h,
} from "../../Resources/UniversalComponents";
import generalClasses from "../../assets/mockdata/universalcontent.json";
import { transparentWhite } from "../../Styles/Styles";
import TopBar from "../../Application/TopBar/TopBar";

export function Extras() {
  useEffect(() => {
    logout24h();
  }, []);

  const { UniversalTexts } = useUserContext();

  return (
    <>
      <TopBar />
      <RouteSizeControlBox>
        <RouteDiv>
          <HOne>{UniversalTexts.extras}</HOne> <BackToHomePage />
          {generalClasses.contentExtras.map((item, index) => (
            <div key={index}>
              <HTwo>{item.instruction}</HTwo>
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
