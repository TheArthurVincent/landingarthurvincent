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
  background-color: #eee;
  padding: 3rem;
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
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  color: black;
  gap: 0.5rem;
  background-color: #f1f1f1;
  font-size: 9px;
  border-radius: 10px;
  font-size: 0.8rem;
  text-align: end;
  width: 100%;
  padding: 0.2rem;
  transition: 0.3s;
  p {
    margin-right: 2rem;
  }
  img {
    filter: grayscale(0%);
    transition: 0.1s;
    border-radius: 50%;
    transform: rotate(2deg);
    width: 100%;
    height: auto;
    transform-origin: center;
    margin: auto;
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    object-position: center center;
  }

  &:hover {
    background-color: ${alwaysWhite()};

    img {
      filter: grayscale(100%);
      transform: rotate(0deg);
      border-radius: 5px;
    }
  }
`;
