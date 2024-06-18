import { styled } from "styled-components";
import {
  primaryColor,
  alwaysWhite,
  textPrimaryColorContrast,
  transparentBlack,
  alwaysBlack,
  lightGreyColor,
  darkGreyColor,
} from "../../../Styles/Styles";

export const CoursesListContainer = styled.div`
  display: flex;
  height: 100vh;
  border-right: solid 1px ${lightGreyColor()};
  position: fixed;
  top: 0rem;
  z-index: 10000000000000000;
  transition: left 0.3s ease-out;

  @media (max-width: 600px) {
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
  paddingleft: 10px;
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
    background-color: ${alwaysWhite()};
    color: ${alwaysBlack()};
  }
`;

export const CoursesListInnerContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  max-height: 99vh;
  background-color: ${lightGreyColor()};
  overflow-y: auto;
  padding: 2px;
  justify-content: space-between;
`;

export const ArrowStyle = styled.span`
  font-weight: 900;
  font-size: 1.2rem;
  margin: 0;
`;
