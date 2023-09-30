import React from "react";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { IFrameVideo } from "../../Resources/UniversalComponents";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { transparentBg } from "../../Styles/Styles";
import { Link, Route } from "react-router-dom";
import PhrasalVerbs from "./PhrasalVerbs/PhrasalVerbs";

export function CourseTemplate({
  courseTitle,
  percentageCourse,
  moduleTitle,
  classTitle,
  isConcluded,
  url,
  description,
}) {
  const { UniversalTexts } = useUserContext();

  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <HOne>{courseTitle}</HOne>
        <div>{percentageCourse}</div>
        <HTwo>{moduleTitle}</HTwo>
        <HThree>{classTitle}</HThree>
        <div>{isConcluded}</div>
        <IFrameVideo src={url} frameBorder="0" />
        <HTwo>{UniversalTexts.comments}</HTwo>
        <div
          style={{
            backgroundColor: transparentBg(),
            padding: "1rem",
            overflow: "auto",
            maxHeight: "14rem",
          }}
        >
          <p style={{ maxWidth: "80ch" }}>{description}</p>
        </div>
      </RouteDiv>
    </RouteSizeControlBox>
  );
}

export function Courses() {
  return (
    <RouteSizeControlBox>
      <Link to="/phrasal-verbs">here</Link>
    </RouteSizeControlBox>
  );
}

export default Courses;
