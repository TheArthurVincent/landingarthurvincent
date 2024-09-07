import { styled } from "styled-components";
import { primaryColor, textSecondaryColorContrast } from "../../Styles/Styles";

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  color: #333;
  padding: 0.2rem;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;

    img {
      transform: scale(1.1);
      filter: grayscale(100%);
    }
  }

  img {
    border-radius: 10px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 1rem;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  p {
    flex-grow: 1;
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
    text-align: left;
  }
`;
