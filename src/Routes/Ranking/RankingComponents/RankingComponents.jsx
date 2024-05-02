import styled from "styled-components";
import { alwaysWhite, lightGreyColor, primaryColor, textPrimaryColorContrast } from "../../../Styles/Styles";

export const FlexAdjust = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  @media (max-width: 800px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const Disapear = styled.span`
  @media (max-width: 800px) {
    display: none;
  }
`;
export const CenterRightToggle = styled.p`
  text-align: right;
  @media (max-width: 800px) {
    text-align: center;
  }
`;

export const DivHover = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-family: Athiti;
  padding: 0.5rem 0;
  margin: 2px auto;
    background-color: ${alwaysWhite()};
    padding: 5px 10px;
  border: solid 1px ${lightGreyColor()};
  &:hover {
    background-color: ${lightGreyColor()};
    transition: 0.2s;
  }
  @media (max-width: 800px) {
    justify-content: center;
    flex-direction: column;
  }
`;


export const abreviateName = (word) => {
  const words = word.split(" ");
  const lastWord = words[words.length - 1];
  return lastWord;
};