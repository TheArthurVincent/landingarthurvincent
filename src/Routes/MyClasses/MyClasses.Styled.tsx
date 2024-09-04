import { styled } from "styled-components";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
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
  margin: 0.5rem 0;
  color: ${primaryColor()};
  @media (max-width: 900px) {
    margin: 10px auto;
  }
  @media (max-width: 500px) {
    max-width: 22rem;
  }
`;

export const HThreeModule = styled.h3`
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  cursor: pointer;
  color: ${primaryColor()};
  background-color: #f8f8f8;
  border-left: 5px solid ${primaryColor()};
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.1s ease, color 0.3s ease;

  &:hover {
    color: ${secondaryColor()};
  }

  @media (max-width: 900px) {
    font-size: 1.1rem;
    padding: 0.5rem;
    margin: 0.75rem 0;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
`;

export const H3FAQ = styled.h3`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: ${primaryColor()};
  color: ${textPrimaryColorContrast()};
  @media (max-width: 900px) {
    margin: 10px auto;
  }
  @media (max-width: 500px) {
    max-width: 22rem;
  }
  &:hover {
    background-color: ${alwaysBlack()};
    color: ${secondaryColor()};
    transition: 0.2s;
  }
`;
export const DivAppear = styled.div`
  &.smooth {
    animation-name: slideUpDown;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }
`;

export const ClassBox = styled.div`
  display: grid;
  gap: 0.5rem;
  justify-content: space-evenly;
  padding-bottom: 4rem;
  border-bottom: solid 1px ${primaryColor()};
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const TransectionMenu = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
