import React from "react";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { CourseItem, CoursesList } from "./Courses.Styled";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import generalClasses from "../../assets/mockdata/universalcontent.json";
import { IFrameVideo } from "../../Resources/UniversalComponents";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { transparentBg } from "../../Styles/Styles";

function CourseTemplate({
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
  const { UniversalTexts } = useUserContext();
  return <RouteSizeControlBox>oi</RouteSizeControlBox>;
}

export default Courses;
