import { styled } from "styled-components";
import {
  primaryColor,
  primaryContrast,
  secondaryColor,
  secondaryContrast,
  textPrimaryColorContrast,
  transparentBg,
} from "../../Styles/Styles";

export const RouteSizeControlBox = styled.div`
  max-width: 1700px;
  min-width: 500px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 900px) {
    max-width: 800px;
  }
  @media (max-width: 800px) {
    max-width: 700px;
  }
  @media (max-width: 650px) {
    max-width: 500px;
    h1,
    h2,
    h3,
    p,
    ul,
    li {
      font-size: 0.9rem;
    }
  }
`;

export const HOne = styled.h1`
  background-color: ${primaryColor()};
  font-size: 1.3rem;
  padding: 0rem 1rem;
  margin: 0;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  color: ${textPrimaryColorContrast()};
  @media (max-width: 650px) {
    margin: 3px;
  }
`;
export const BlogPostTitle = styled.h4`
  /* background-color: ${secondaryContrast()}; */
  box-shadow: 2px 2px 3px 0px #aaa;
  font-weight: 400;
  padding: 0rem 0.5rem;
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.5rem;
  color: ${primaryColor()};
  @media (max-width: 650px) {
    margin: 3px;
  }
`;

export const HTwo = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  @media (max-width: 650px) {
    padding: 3px;
    margin: 3px;
  }
`;

export const HThree = styled.h3`
  padding: 0.5rem;
  background-color: ${primaryContrast()};
  color: ${secondaryContrast()};
  @media (max-width: 650px) {
    padding: 3px;
    margin: 3px;
  }
`;

export const RouteDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: ${transparentBg()};
  color: ${secondaryContrast()};
  box-shadow: 2px 2px 3px 0px #aaa;
  padding: 0.5rem;
  margin: 0.5rem 0;
  @media (max-width: 650px) {
    padding: 5px;
    margin: 5px;
  }
`;
