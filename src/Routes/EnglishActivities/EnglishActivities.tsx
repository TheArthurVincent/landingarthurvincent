import React, { useState } from "react";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import { ClassCard } from "./Assets/EnglishActivities.Styled";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import EnglishActivity from "./Assets/EnglishActivity";
import { verifyToken } from "../../App";
import { activityRoutes, cardStyle } from "./Assets/ClassesListActivities";
import Helmets from "../../Resources/Helmets";
import { pathGenerator } from "../../Resources/UniversalComponents";
import { Login } from "@mui/icons-material";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { HeadersProps } from "../../Resources/types.universalInterfaces";

export default function EnglishActivities({ headers }:HeadersProps) {
  const { UniversalTexts } = useUserContext();
  const [text, setText] = useState<string>("I am your best friend");

  const readText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Define o idioma como inglês americano
      speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };
  

  return (
    <>
      {/* <Routes>
        {activityRoutes.map((activity, index) => {
          return (
            <Route
              key={index}
              path={pathGenerator(activity.title)}
              element={
                verifyToken() ? (
                  <EnglishActivity
                    title={activity.title}
                    url={activity.url}
                    questions={activity.questions}
                    headers={headers}
                  />
                ) : (
                  <Login />
                )
              }
            />
          );
        })}
      </Routes> */}
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
          <div
            id="list"
            style={{
              border: "solid 1px",
              borderRadius: "10px",
              padding: "1rem ",
              backgroundColor: "white",
            }}
          >
            <HOne>Aula</HOne>
            <HTwo>Subtexto da aula #1</HTwo>
            <div
              className="sentences"
              style={{
                border: "solid 1px",
                padding: "5px",
                margin: "10px 0",
              }}
            >
              <HThree>Sentences</HThree>
              <ul
                style={{
                  border: "solid 1px",
                  padding: "1rem ",
                }}
              >
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Hello!</strong> <button onClick={() => readText("Hello!")}>click</button>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Olá!</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Hi</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Oi</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>How are you?</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Como você está?</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>I’m fine</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Estou bem</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>I’m good</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Estou bem</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>I’m doing well.</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Estou indo bem</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Good morning!</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Bom dia!</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Good afternoon!</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Boa tarde!</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Good evening!</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Boa noite!</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Good night!</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>Boa noite!</span>
                </li>
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Nice to meet you!</strong>
                  <br />
                  <span style={{ fontStyle: "italic" }}>
                    Prazer em conhecê-lo!
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="sentences"
              style={{
                border: "solid 1px",
                padding: "5px",
                margin: "10px 0",
              }}
            >
              <HThree>Text</HThree>
              <div>
                {text}
                <button onClick={() => readText(text)}>Read Text</button>
              </div>
            </div>
          </div>
          <Helmets text="Activities" />
          <RouteDiv>
            <HOne>{UniversalTexts.englishMaterial}</HOne>
            <Outlet />
            <div>
              {/* <nav style={cardStyle}>
                {activityRoutes.map((activity, index) => {
                  {
                    return (
                      <NavLink key={index} to={pathGenerator(activity.title)}>
                        <ClassCard>
                          {activity.title && (
                            <p style={{ fontSize: "0.7rem" }}>
                              {activity.title}
                            </p>
                          )}
                          {activity.img && (
                            <img
                              style={{
                                height: "120px",
                                width: "120px",
                                objectFit: "cover",
                                objectPosition: "left",
                              }}
                              src={activity.img}
                              alt=""
                            />
                          )}
                        </ClassCard>
                      </NavLink>
                    );
                  }
                })}
              </nav> */}
            </div>
          </RouteDiv>
        </RouteSizeControlBox>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}
