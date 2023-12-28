import { styled } from "styled-components";
import {
  primaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
  alwaysWhite,
  alwaysBlack,
  transparentWhite,
} from "../../Styles/Styles";

export const RouteSizeControlBox = styled.div`
  min-width: 1200px;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  @media (max-width: 900px) {
    max-width: 750px;
  }
  @media (max-width: 800px) {
    max-width: 650px;
    margin-left: auto;
    margin-right: auto;
    h1,
    h2,
    h3,
    p,
    ul,
    li {
      font-size: 1rem;
    }
  }
  @media (max-width: 700px) {
    max-width: 550px;
  }
  @media (max-width: 600px) {
    max-width: 450px;
  }
  &.smooth {
    animation-name: slideInLeft;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
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
export const BlogPostTitle = styled.div`
  font-weight: 400;
  background-color: ${primaryColor()};
  padding: 0rem 0.5rem;
  margin: 0.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.5rem;
  color: ${textPrimaryColorContrast()};
  @media (max-width: 650px) {
    margin: 3px;
  }
`;

export const HTwo = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.6rem;
  margin-bottom: 1rem;
  color: ${alwaysBlack()};
  @media (max-width: 1700px) {
    text-align: center;
    margin-top: 1rem;
  }
  @media (max-width: 650px) {
    padding: 3px;
    margin: 3px;
    font-size: 1rem;
  }
`;

export const HThree = styled.h3`
  padding: 0.5rem;
  background-color: ${textPrimaryColorContrast()};
  color: ${textSecondaryColorContrast()};
  @media (max-width: 750px) {
    padding: 3px;
    margin: 5px;
  }
`;

export const RouteDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5rem;
  background-color: ${alwaysWhite()};
  color: ${alwaysBlack()};
  padding: 0.5rem;
  margin: 0.5rem 0;

  @media (max-width: 750px) {
    padding: 5px;
    max-width: 600px;
  }
  @media (max-width: 610px) {
    max-width: 600px;
  }
  @media (max-width: 550px) {
    max-width: 500px;
  }
  @media (max-width: 450px) {
    max-width: 400px;
  }
  @media (max-width: 350px) {
    max-width: 300px;
  }
  @media (max-width: 300px) {
    max-width: 250px;
  }
`;

export const BackgroundClickBlog = styled.div`
  position: fixed;
  z-index: 5;
  background-color: ${transparentWhite()};
  height: 10000vh;
  width: 10000vw;
`;
