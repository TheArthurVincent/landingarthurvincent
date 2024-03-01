import { styled } from "styled-components";
import {
  secondaryColor,
  textSecondaryColorContrast,
  transparentBlack,
  primaryColor,
  alwaysWhite,
} from "../../Styles/Styles";

export const TopBarContainer = styled.header`
  top: 0;
  background-color: ${alwaysWhite()};
  justify-content: space-evenly;
  align-items: center;
  z-index: 6;
  display: flex;
  width: 100vw;
`;

export const TopBarNavigation = styled.div`
  text-align: center;
  gap: 2rem;
  display: flex;
  z-index: 4;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  @media (max-width: 1200px) {
    display: none;
  }
`;

export const TopBarNavigationBurger = styled.div`
  position: fixed;
  flex-direction: column;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 6;
  list-style: none;
  gap: 1rem;
  text-align: left;
  background-color: ${primaryColor()};
  padding: 1rem;
  display: none;
`;

export const BackgroundClick = styled.div`
  position: fixed;
  display: none;
  left: -30rem;
  z-index: 5;
  background-color: ${transparentBlack()};
  min-height: 10000vh;
  min-width: 10000vw;
`;

export const LinkItem = styled.li`
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  &:active {
    font-weight: 600;
  }
`;

export const LogoStyle = styled.div`
  display: block;
  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Hamburguer = styled.div`
  display: none;
  color: ${secondaryColor()};
  font-weight: 900;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: ${textSecondaryColorContrast()};
  }
  @media (max-width: 1200px) {
    display: block;
  }
`;
