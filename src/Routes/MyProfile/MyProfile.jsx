import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { BackToHomePage, logout24h } from "../../Resources/UniversalComponents";
import TopBar from "../../Application/TopBar/TopBar";
import { alwaysBlack } from "../../Styles/Styles";

export function MyProfile() {
  const [user, setUser] = useState({});
  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(getLoggedUser);
  }, []);
  useEffect(() => {
    logout24h();
  }, []);

  const { UniversalTexts } = useUserContext();
  return (
    <>
      <TopBar />
      <RouteSizeControlBox style={{ maxWidth: "fit-content" }}>
        <RouteDiv>
          <HOne>{UniversalTexts.myProfile}</HOne>
          <BackToHomePage />
          <ul style={{ color: alwaysBlack(), padding: "0.2rem" }}>
            <li>
              {UniversalTexts.name}: {user.name} {user.lastname}
            </li>
            <li>
              {UniversalTexts.document}: {user.doc}
            </li>
            <li>
              {UniversalTexts.phoneNumber}: {user.phoneNumber}
            </li>
            <li>
              {UniversalTexts.dateOfBirth}: {user.dateOfBirth}
            </li>
            <li>
              {UniversalTexts.email}: {user.email}
            </li>
            <li>
              {UniversalTexts.username}: {user.username}
            </li>
          </ul>
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}

export default MyProfile;
