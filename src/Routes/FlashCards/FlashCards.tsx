import React, { useState } from "react";
import {
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import Helmets from "../../Resources/Helmets";
import { HeadersProps } from "../../Resources/types.universalInterfaces";

export function FlashCards({ headers }: HeadersProps) {
  return (
    <RouteSizeControlBox className="smooth">
      <RouteDiv>oioioioioioioioioioi</RouteDiv>
      <Helmets text="Flash Cards Review" />
    </RouteSizeControlBox>
  );
}

export default FlashCards;
