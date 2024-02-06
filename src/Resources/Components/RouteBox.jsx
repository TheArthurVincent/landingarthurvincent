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
  max-width: 1000px;
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
export const BlogSideBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.51rem;
  min-width: 9.5rem;
  max-width: 9.5rem;
  @media (max-width: 900px) {
    flex-direction: row;
  }
`;
export const OverFlow = styled.div`
  max-height: 15rem,
  overflow: auto,
  @media (max-width: 500px) {
    max-height: 2rem,
    font-size: 0.6rem;
    max-width:10ch;
}
  `;
export const BlogRouteSizeControlBox = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  max-width: 1000px;
  gap: 0.5rem;
  @media (max-width: 900px) {
    flex-direction: column-reverse;
    justify-content: center;
    max-width: 500px;
  }
  @media (max-width: 800px) {
    max-width: 500px;
    margin-left: 10px;
    margin-right: 10px;
    h1,
    h2,
    h3,
    p,
    ul,
    li {
      font-size: 1rem;
    }
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
  font-size: 1.2rem;
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
  background-color: ${alwaysWhite()};
  color: ${alwaysBlack()};
  padding: 0.5rem;
  margin: 0;

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

export const NextTutoringsDiv = styled.div`
  margin-right: auto;
  margin-left: auto;
  background-color: ${alwaysWhite()};
  color: ${alwaysBlack()};
  padding: 0.5rem;
  margin: 0 auto;
  min-width: 260px;
`;
export const NextLive = styled.div`
  background-color: ${alwaysWhite()};
  padding: 0.5rem;
  min-width: 260px;
  @media (max-width: 500px) {
    min-width: 160px;
  }
`;

export const LevelCardComponent = styled.div`
  padding: 8px;
  display: grid;
  text-align: center;
  background-color: white;
  min-width: 155px;
  font-size: 12px;
  justify-content: center;
  text-align: center;
`;

export const BackgroundClickBlog = styled.div`
  position: fixed;
  z-index: 5;
  background-color: ${transparentWhite()};
  height: 10000vh;
  width: 10000vw;
`;
