import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { BackToHomePage } from "../../Resources/UniversalComponents";
import TopBar from "../../Application/TopBar/TopBar";
import { alwaysBlack, primaryColor } from "../../Styles/Styles";
import { Link } from "react-router-dom";

export function MyProfile() {
  const [user, setUser] = useState({});
  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(getLoggedUser);
  }, []);
 


  const { UniversalTexts } = useUserContext();
  return (
    <>
      <TopBar />
      <RouteSizeControlBox className="smooth" style={{ maxWidth: "fit-content" }}>
        <RouteDiv>
          <HOne>{UniversalTexts.myProfile}</HOne>
          <BackToHomePage />
          <ul style={{ color: alwaysBlack(), padding: "0.2rem" }}>
            <li style={{ marginBottom: "0.3rem" }}>
              {UniversalTexts.name}: {user.name} {user.lastname}
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              {UniversalTexts.document}: {user.doc}
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              {UniversalTexts.phoneNumber}: {user.phoneNumber}
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              {UniversalTexts.dateOfBirth}: {user.dateOfBirth}
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              {UniversalTexts.email}: {user.email}
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              {UniversalTexts.username}: {user.username}
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              <Link
                style={{ backgroundColor: primaryColor(), padding: "2px" }}
                target="_blank"
                to={user.googleDriveLink}
              >
                <span
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  {UniversalTexts.googleDriveLink}
                </span>
              </Link>
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              {UniversalTexts.ankiEmail}: {user.ankiEmail}
            </li>
            <li style={{ marginBottom: "0.3rem" }}>
              {UniversalTexts.ankiPassword}: {user.ankiPassword}
            </li>
          </ul>
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}

export default MyProfile;
