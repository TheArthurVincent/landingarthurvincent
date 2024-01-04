import React, { useState } from "react";
import {
  HOne,
  HThree,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import nextClasses from "../../assets/mockdata/student.json";
import generalClasses from "../../assets/mockdata/universalcontent.json";
import { Link } from "react-router-dom";
import { ButtonDisapear, linkReset } from "../../Resources/UniversalComponents";
import {
  darkGreyColor,
  primaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import { Button } from "@mui/material";

export function MyCalendar({ headers }) {
  const { UniversalTexts } = useUserContext();
  const [selectedOption, setSelectedOption] = useState("private");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <RouteSizeControlBox className="smooth">
      <RouteDiv>
        <HOne>{UniversalTexts.calendar}</HOne>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "1rem",
          }}
        >
          <Button
            onClick={() => handleOptionChange("private")}
            style={{
              cursor: "pointer",
              minWidth: "8rem",
              padding: "0.5rem",
              backgroundColor:
                selectedOption === "private" ? primaryColor() : darkGreyColor(),
              color: textPrimaryColorContrast(),
            }}
          >
            {UniversalTexts.privateClasses}
          </Button>
          <Button
            onClick={() => handleOptionChange("public")}
            style={{
              cursor: "pointer",
              minWidth: "8rem",
              padding: "0.5rem",
              backgroundColor:
                selectedOption === "public" ? primaryColor() : darkGreyColor(),
              color: textPrimaryColorContrast(),
            }}
          >
            {UniversalTexts.publicClasses}
          </Button>
          <ButtonDisapear
            onClick={() => handleOptionChange("both")}
            style={{
              cursor: "pointer",
              minWidth: "8rem",
              padding: "0.5rem",
              backgroundColor:
                selectedOption === "both" ? primaryColor() : darkGreyColor(),
              color: textPrimaryColorContrast(),
            }}
          >
            {UniversalTexts.bothLists}
          </ButtonDisapear>
        </div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: selectedOption === "both" ? "1fr 1fr" : "1fr",
          }}
        >
          {selectedOption === "private" || selectedOption === "both" ? (
            <div>
              <HTwo style={{ textAlign: "center" }}>
                {UniversalTexts.privateClasses}
              </HTwo>
              {nextClasses.nextClasses.map((item, index) => (
                <div key={index}>
                  <HThree>
                    {item.title} | {item.type} - {item.date} | {item.time}
                  </HThree>
                  <div>
                    <ul>
                      <li>
                        {UniversalTexts.date}: {item.date}
                      </li>
                      <li>
                        {UniversalTexts.time}: {item.time}
                      </li>
                      <li>
                        {UniversalTexts.description}: {item.type}
                      </li>
                      <li>
                        <Link
                          style={linkReset}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {UniversalTexts.accessClassLink}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {selectedOption === "public" || selectedOption === "both" ? (
            <div>
              <HTwo style={{ textAlign: "center" }}>
                {UniversalTexts.publicClasses}
              </HTwo>
              {generalClasses.nextLiveClasses.map((item, index) => (
                <div key={index}>
                  <HThree>
                    {item.title} | {item.type} - {item.date} | {item.time}
                  </HThree>
                  <div>
                    <ul>
                      <li>
                        {UniversalTexts.date}: {item.date}
                      </li>
                      <li>
                        {UniversalTexts.time}: {item.time}
                      </li>
                      <li>
                        {UniversalTexts.description}: {item.type}
                      </li>
                      <li>
                        {" "}
                        {UniversalTexts.password}: {item.password}
                      </li>
                      <li>
                        <Link
                          style={linkReset}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {UniversalTexts.accessClassLink}
                        </Link>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </RouteDiv>
    </RouteSizeControlBox>
  );
}

export default MyCalendar;
