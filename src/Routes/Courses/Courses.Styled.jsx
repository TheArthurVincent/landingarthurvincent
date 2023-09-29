

import { styled } from "styled-components";
import { lightGreyColor, primaryColor, secondaryContrast } from "../../Styles/Styles";

export const CoursesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const CourseItem = styled.div`
  background-color: ${lightGreyColor()};
  padding: 3rem;
  text-align: center;
  border: none;
  color: ${primaryColor()};
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: ${primaryColor()};
    color: ${secondaryContrast()};
    font-weight: 700;
  }
`;
