import { styled } from "styled-components";
import {
  lightGreyColor,
  primaryColor,
  primaryContrast,
  secondaryContrast,
} from "../../Styles/Styles";

export const EventsCardsContainer = styled.div`
  display: grid;
  gap: 1rem;
  justify-content: center;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const EventsCard = styled.div`
  display: grid;
  gap: 1rem;
  justify-content: center;
  text-align: center;
  padding: 1rem 0;
  background-color: ${lightGreyColor()};
`;

export const HThree = styled.h3`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: ${secondaryContrast()};
  color: ${primaryContrast()};
  @media (max-width: 700px) {
    background-color: ${lightGreyColor()};
  }
`;

export const ClassBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  justify-content: space-evenly;
  padding-bottom: 4rem;
  border-bottom: solid 1px ${primaryColor()};
  @media (max-width: 1700px) {
    grid-template-columns: 1fr;
  }
`;

export const TransectionMenu = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
