import React, { useState } from "react";
import {
  RouteDiv,
  HOne,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  BackToHomePage,
  IFrameVideo,
  getVideoEmbedUrl,
} from "../../Resources/UniversalComponents";
import { transparentWhite } from "../../Styles/Styles";
import TopBar from "../../Application/TopBar/TopBar";
import { DivAppear, H3FAQ } from "../MyClasses/MyClasses.Styled";
import { Input } from "@mui/material";
import { contentExtras } from "./ExtrasContent";

export function Extras({ headers }) {
  const { UniversalTexts } = useUserContext();

  const [expandedItem, setExpandedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContent = contentExtras.filter((item) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      item.instruction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags &&
        item.tags.some((tag) =>
          tag.toLowerCase().includes(lowerCaseSearchQuery)
        ))
    );
  });

  const handleItemClick = (index) => {
    setExpandedItem((prevExpandedItem) =>
      prevExpandedItem === index ? null : index
    );
  };

  return (
    <>
      <TopBar />
      <RouteSizeControlBox style={{ maxWidth: "700px" }} className="smooth">
        <RouteDiv>
          <HOne>{UniversalTexts.extras}</HOne> <BackToHomePage />
          <Input
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 1rem",
            }}
            type="text"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div
            style={{
              height: "40rem",
              overflow: "auto",
            }}
          >
            {filteredContent.map((item, index) => (
              <div key={index}>
                {item.instruction && (
                  <H3FAQ
                    style={{ cursor: "pointer" }}
                    onClick={() => handleItemClick(index)}
                  >
                    {item.instruction}
                  </H3FAQ>
                )}
                {expandedItem === index && (
                  <DivAppear>
                    {item.url && (
                      <div style={{ textAlign: "center" }}>
                        <IFrameVideo
                          src={getVideoEmbedUrl(item.url)}
                          frameBorder="0"
                        />
                      </div>
                    )}
                    {item.explanation && (
                      <div
                        style={{
                          backgroundColor: transparentWhite(),
                          padding: "1rem",
                        }}
                      >
                        <div>{item.explanation}</div>
                      </div>
                    )}
                  </DivAppear>
                )}
              </div>
            ))}
          </div>
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}

export default Extras;
