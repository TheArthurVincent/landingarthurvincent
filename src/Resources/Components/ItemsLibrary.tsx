import styled from "styled-components";
import {
  alwaysWhite,
  primaryColor,
  primaryColor2,
  secondaryColor,
  secondaryColor2,
} from "../../Styles/Styles";

interface ButtonProps {
  firstcolor?: string;
  secondcolor?: string;
  textcolor?: string;
}

interface ArvinButtonProps {
  type?: string;
  cursor?: string;
}

export const ArvinButton = styled.button<ArvinButtonProps>`
  min-width: 80px;
  background: linear-gradient(
    to left,
    ${(props) =>
        props.type === "red"
          ? "red"
          : props.type === "green"
          ? secondaryColor()
          : props.type === "blue"
          ? "blue"
          : props.type === "orange"
          ? "orange"
          : props.type === "purple"
          ? "purple"
          : props.type === "yellow"
          ? "#FFD700"
          : props.type === "pink"
          ? "#FF69B4"
          : props.type === "grey"
          ? "#eee"
          : primaryColor()}
      0%,
    ${(props) =>
        props.type === "red"
          ? "#fa7a71"
          : props.type === "green"
          ? secondaryColor2()
          : props.type === "blue"
          ? "#87CEFA"
          : props.type === "orange"
          ? "#FFA500"
          : props.type === "purple"
          ? "#DDA0DD"
          : props.type === "grey"
          ? "#aaa"
          : props.type === "yellow"
          ? "#B8860B" // Yellow darker gradient
          : props.type === "pink"
          ? "#C71585" // Pink darker gradient
          : primaryColor2()}
      50%
  );
  color: ${alwaysWhite()};
  padding: 5px 1.2rem;
  font-family: Athiti;
  border-radius: 10px;
  border: none;
  cursor: ${(props) =>
    props.cursor === "not-allowed" ? "not-allowed" : "pointer"};
  display: inline;
  max-width: fit-content;
  font-weight: 600;

  &:hover {
    background: linear-gradient(
      to left,
      ${(props) =>
          props.type === "red"
            ? "red"
            : props.type === "green"
            ? secondaryColor()
            : props.type === "blue"
            ? "blue"
            : props.type === "orange"
            ? "orange"
            : props.type === "purple"
            ? "purple"
            : props.type === "yellow"
            ? "#FFD700" // Yellow darker shade
            : props.type === "pink"
            ? "#FF69B4" // Pink darker shade
            : primaryColor()}
        0%,
      ${(props) =>
          props.type === "red"
            ? "#FA7A71"
            : props.type === "green"
            ? secondaryColor2()
            : props.type === "blue"
            ? "#87CEFA"
            : props.type === "orange"
            ? "#FFA500"
            : props.type === "purple"
            ? "#DDA0DD"
            : props.type === "yellow"
            ? "#B8860B" // Yellow darker gradient
            : props.type === "pink"
            ? "#C71585" // Pink darker gradient
            : primaryColor2()}
        100%
    );
    box-shadow: 1px 1px 10px 1px #aaa;
    border-radius: 12px;
  }

  &:active {
    font-weight: 500;
    box-shadow: inset 1px 1px 10px 1px #ddd;
  }
`;

export const MyButton = styled.button<ButtonProps>`
  background: linear-gradient(
    to left,
    ${(props) => props.firstcolor || primaryColor()} 0%,
    ${(props) => props.secondcolor || props.firstcolor || primaryColor2()} 50%
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
  &:hover {
    background: linear-gradient(
      to left,
      ${(props) => props.firstcolor || primaryColor()} 0%,
      ${(props) => props.secondcolor || props.firstcolor || primaryColor2()}
        100%
    );

    box-shadow: 1px 1px 10px 1px #aaa;
    border-radius: 12px;
  }

  &:active {
    font-weight: 500;
    box-shadow: inset 1px 1px 10px 1px #ddd;
  }
`;
