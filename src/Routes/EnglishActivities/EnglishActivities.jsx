import React from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import { ClassCard } from "./EnglishActivities.Styled";
import { pathGenerator } from "../../Resources/UniversalComponents";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import EnglishActivity from "./EnglishActivity";
import { verifyToken } from "../../App";
import { activityRoutes, cardStyle } from "./ClassesListActivities";

export default function EnglishActivities({ headers }) {
  const { UniversalTexts } = useUserContext();

  return (
    <>
      <Routes>
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
      </Routes>
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
          <RouteDiv>
            <HOne>{UniversalTexts.englishMaterial}</HOne>
            <Outlet />
            <div>
              <nav style={cardStyle}>
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
              </nav>
            </div>
          </RouteDiv>
        </RouteSizeControlBox>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}
