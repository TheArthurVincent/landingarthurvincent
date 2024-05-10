import React from "react";
import { HOne, RouteDiv, RouteSizeControlBox } from "../../Resources/Components/RouteBox";
import { BackToHomePage } from "../../Resources/UniversalComponents";

export default function NotFound() {
  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <BackToHomePage />
        <HOne>Page Not Found!</HOne>
      </RouteDiv>
    </RouteSizeControlBox>
  );
}
