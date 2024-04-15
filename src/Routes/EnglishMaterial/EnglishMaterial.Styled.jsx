import { styled } from "styled-components";
import {
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
  primaryColor,
  secondaryColor,
  textSecondaryColorContrast,
  transparentBlack,
} from "../../Styles/Styles";

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
    color: ${textSecondaryColorContrast()};
    font-weight: 700;
  }
`;
export const CourseCard = styled.div`
  color: black;
  text-align: center;
  gap: 0.5rem;
  font-size: 10px;
  display: flex;
  background-color: ${lightGreyColor()};
  height: 16rem;
  width: 14rem;
  padding: 1rem 0.2rem;
  flex-direction: column;
  transition: 0.3s;
  img {
    transition: 0.3s;
    filter: grayscale(100%);
  }
  &:hover {
    box-shadow: 2px 2px 10px 1px ${darkGreyColor()};
    img {
      filter: grayscale(0%);
    }
  }
`;
