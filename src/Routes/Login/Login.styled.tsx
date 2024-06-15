import styled from "styled-components";
import { alwaysBlack, alwaysWhite } from "../../Styles/Styles";

export const SideLoginForm = styled.div`
  // background-color: ${alwaysWhite()};
  display: grid;
  max-width: 400px;
  margin-left: auto;
  height: 100vh;
  transition: all 0.5s ease;
  @media (max-width: 900px) {
    margin-right: auto;
    min-width: 100vw;
    background-color: rgba(250, 250, 250, 0.9);
  }
  @media (max-width: 400px) {
    min-width: none;
    background-color: rgba(250, 250, 250, 1);
    height: 120vh;
    min-width: 120vw;
  }
`;

export const TextLoginPage = styled.div`
  font-size: 5rem;
  font-style: italic;
  font-weight: 800;
  margin: auto;
  text-align: center;
  color: ${alwaysWhite()};
  text-shadow: 3px 0 ${alwaysBlack()}, -3px 0 ${alwaysBlack()},
    0 3px ${alwaysBlack()}, 0 -3px ${alwaysBlack()}, 5px 5px ${alwaysBlack()},
    -5px -5px ${alwaysBlack()}, 5px -5px ${alwaysBlack()},
    -5px 5px ${alwaysBlack()};
  transition: all 0.5s ease;
  @media (max-width: 900px) {
    display: none;
  }
`;
