import { styled } from "styled-components";
import {
  primaryContrast,
  secondaryColor,
  textSecondaryColorContrast,
  transparentBg,
} from "../../Styles/Styles";

export const TopBarContainer = styled.header`
  display: flex;
  top: 0;
  width: 100vw;
  background-color: ${primaryContrast()};
  justify-content: space-evenly;
  align-items: center;
  padding: 0.4rem 4rem;
  z-index: 6;
`;

export const TopBarNavigation = styled.div`
  text-align: center;
  gap: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  @media (max-width: 1030px) {
    display: none;
  }
`;

export const TopBarNavigationBurger = styled.div`
  position: fixed;
  flex-direction: column;
  top: 4rem;
  z-index: 3;
  list-style: none;
  left: 1rem;
  gap: 1rem;
  text-align: left;
  background-color: ${primaryContrast()};
  padding: 1rem;
  display: none;
`;

export const BackgroundClick = styled.div`
  position: fixed;
  display: none;
  left: -30rem;
  z-index: 2;
  background-color: ${transparentBg()};
  min-height: 1000vh;
  min-width: 1000vw;
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
  @media (max-width: 1030px) {
    display: none;
  }
`;

export const Hamburguer = styled.div`
  display: none;
  color: ${textSecondaryColorContrast()};
  font-weight: 900;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: ${secondaryColor()};
  }
  @media (max-width: 1030px) {
    display: block;
  }
`;
