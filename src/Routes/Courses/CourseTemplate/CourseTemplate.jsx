import React from "react";
import { useUserContext } from "../../../Application/SelectLanguage/SelectLanguage";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../../Resources/Components/RouteBox";
import ListOfCourses from "../../../assets/mockdata/universalcontent.json";

export default function CourseTemplate({ classTitle }) {
  const { UniversalTexts } = useUserContext();
  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <HOne>{classTitle}</HOne>
      </RouteDiv>
    </RouteSizeControlBox>
  );
}
