import React from "react";
import styled from "styled-components";
import { alwaysWhite, primaryColor, primaryColor2 } from "../../Styles/Styles";

interface ButtonProps {
  firstcolor?: string;
  secondcolor?: string;
  textcolor?: string;
}

export const MyButton = styled.button<ButtonProps>`
  background: linear-gradient(
    to bottom,
    ${(props) => props.firstcolor || primaryColor()} 0%,
    ${(props) => props.secondcolor || props.firstcolor || primaryColor2()} 80%
  );
  color: ${(props) => props.textcolor || alwaysWhite()};
  padding: 5px 1.2rem;
  font-family: Athiti;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: inline;
  max-width: fit-content;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  &:hover {
    border-radius: 18px;
  }

  &:active {
    font-weight: 500;
  }
`;
