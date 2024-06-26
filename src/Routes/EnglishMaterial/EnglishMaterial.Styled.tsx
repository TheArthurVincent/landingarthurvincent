import { styled } from "styled-components";
import {
  alwaysWhite,
  darkGreyColor,
  lightGreyColor,
  primaryColor,
  textSecondaryColorContrast,
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
  font-size: 9px;
  border-radius: 10px;
  font-weight: 800;
  display: flex;
  background-color: ${lightGreyColor()};
  height: 10rem;
  width: 8rem;
  padding: 1rem 0.2rem;
  flex-direction: column;
  transition: 0.3s;

  img {
    filter: grayscale(100%);
    transition: 0.3s;
    border-radius: 0.5rem;
    width: 100%;
    height: auto;
    transform-origin: center;
  }

  &:hover {
    box-shadow: 2px 2px 10px 1px ${darkGreyColor()};
    background-color: ${alwaysWhite()};

    img {
      filter: grayscale(0%);
      transform: scale(1.05);
      border-radius: 0.7rem;
      height: 8rem;
      width: 6rem;
    }
  }
`;
