import { styled } from "styled-components";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  primaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";

export const EventsCardsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const EventsCard = styled.div`
  display: grid;
  gap: 0.5rem;
  max-width: 25rem;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
  background-color: ${lightGreyColor()};
`;

export const TitleChangeSize = styled.span`
  font-size: 1.2rem;
  @media (max-width: 800px) {
    font-size: 0.8rem;
  }
`;

export const SpanDisapear = styled.span`
  padding: 3px;
  font-size: 1rem;
  font-weight: 400;
  padding: "0.2rem 0.6rem";
  @media (max-width: 900px) {
    display: none;
  }
`;

export const Disapear = styled.span`
  @media (max-width: 900px) {
    display: none;
  }
`;
export const DivPost = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  max-width: 650px;
`;
