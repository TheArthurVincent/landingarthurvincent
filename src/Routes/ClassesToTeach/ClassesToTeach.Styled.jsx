import { styled } from "styled-components";
import {
  lightGreyColor,
  primaryColor,
  secondaryColor,
  secondaryContrast,
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
    color: ${secondaryContrast()};
    font-weight: 700;
  }
`;
export const CourseCard = styled.div`
  color: black;
  text-align: center;
  display: flex;
  background-color: #fff;
  height: 20rem;
  width: 15rem;
  padding: 1rem 0.2rem;
  flex-direction: column;
  border-radius: 0.5rem;
  transition: 0.1s;
  img {
    filter: grayscale(100%);
    transition: filter 0.1s;
  }
  &:hover {
    border-radius: 0.7rem;
    img {
      filter: grayscale(0%);
    }
    h3 {
      background-color: #000;
      transition: 0.1s;
    }
  }
`;
