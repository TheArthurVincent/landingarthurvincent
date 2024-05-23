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
  z-index: 6;
  position: fixed;
  background-color: ${alwaysWhite()};
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  padding: 5px;
  box-shadow: 1px 1px 10px 1px #555;
  width: 100vw;
  @media print {
    display: none;
  }
`;  

export const TopBarNavigation = styled.div`
  text-align: center;
  gap: 2rem;
  display: flex;
  z-index: 4;
  font-size:13px;
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
  top: 0.1rem;
  left: 0.1rem;
  z-index: 6000000;
  list-style: none;
  gap: 1rem;
  text-align: left;
  background-color: ${primaryColor()};
  padding: 1rem 0.5rem;
  display: none;
  &.smooth {
    animation-name: slideInLeft;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
  }
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
