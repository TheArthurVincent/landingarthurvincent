import { styled } from "styled-components";
import {
  primaryColor,
  alwaysWhite,
  textPrimaryColorContrast,
  transparentBlack,
  alwaysBlack,
  lightGreyColor,
} from "../../Styles/Styles";

export const CoursesListContainer = styled.div`
  display: flex;
  height: 100vh;
  border-right: solid 1px ${lightGreyColor()};
  position: fixed;
  top: 0rem;
  z-index: 2;
  transition: left 0.2s ease-out;

  @media (max-width: 1400px) {
    display: none;
  }
`;

export const CoursesListTitleContainer = styled.div`
  color: ${primaryColor()};
  background-color: ${alwaysWhite()};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 63px;
  cursor: pointer;
`;

export const CoursesList = styled.ul`
  padding: 0;
`;

export const CoursesListItem = styled.li`
  background-color: ${alwaysWhite()};
  color: ${alwaysBlack()};
  list-style: none;
  margin: 2px;
  align-items: center;
  padding: 0.2rem 0.5rem;
  display: flex;
  align-items: left;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: ${primaryColor()};
    color: ${textPrimaryColorContrast()};
  }
`;

export const CoursesListInnerContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${lightGreyColor()};
`;

export const Mask = styled.div`
  background-color: ${transparentBlack()};
  width: 10000px;
`;
export const ArrowStyle = styled.span`
  font-weight: 900;
  font-size: 1.2rem;
  margin: 0;
`;
