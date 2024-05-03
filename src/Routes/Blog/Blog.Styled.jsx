import { styled } from "styled-components";
import { alwaysWhite, lightGreyColor } from "../../Styles/Styles";

export const DivModal = styled.div`
  position: fixed;
  z-index: 100;
  background-color: ${alwaysWhite()};
  padding: 1rem;
  width: 50vw;
  height: 30rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 2px 10px 4px #ccc;
`;

export const InternDivModal = styled.div`
  display: grid;
  gap: 2px;
  margin: auto;
`;

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
