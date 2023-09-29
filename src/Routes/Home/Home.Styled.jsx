import { styled } from "styled-components";
import { lightGreyColor, primaryColor, secondaryContrast } from "../../Styles/Styles";

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
