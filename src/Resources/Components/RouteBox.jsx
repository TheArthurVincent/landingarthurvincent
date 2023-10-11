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
  max-width: 1700px;
  min-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  @media (max-width: 900px) {
    max-width: 800px;
  }
  @media (max-width: 750px) {
    max-width: 500px;
    h1,
    h2,
    h3,
    p,
    ul,
    li {
      font-size: 1rem;
    }
  }
`;

export const HOne = styled.h1`
  background-color: ${textSecondaryColorContrast()};
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
  font-size: 1.4rem;
  font-weight: 500;
  color: ${alwaysBlack()};
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
  @media (max-width: 650px) {
    padding: 3px;
    margin: 3px;
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
    margin: 5px;
    max-width: 400px;
  }
`;

export const BackgroundClickBlog = styled.div`
  position: fixed;
  z-index: 5;
  background-color: ${transparentWhite()};
  height: 10000vh;
  width: 10000vw;
`;
