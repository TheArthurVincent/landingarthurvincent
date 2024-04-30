import styled from "styled-components";
import { darkGreyColor, secondaryColor } from "./Styles/Styles";

export const All = styled.div`
  & *::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  & *::-webkit-scrollbar-track {
    background: ${darkGreyColor()};
  }

  & *::-webkit-scrollbar-thumb {
    background-color: ${secondaryColor()};
  }
`;


export function authorizationToken() {
  const headers = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("authorization")}`,
    },
  };
  return headers.headers.authorization.split(" ")[1];
}
