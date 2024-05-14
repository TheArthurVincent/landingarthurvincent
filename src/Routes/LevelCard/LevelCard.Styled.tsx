import styled, { keyframes } from "styled-components";
import React from "react";

const spinAnimation = keyframes`
0% {
  transform: translate(-50%, -40%) rotate(0deg);
}
100% {
  transform: translate(-50%, -40%) rotate(360deg);
}
`;

export const DivCardLevel = styled.div`
  position: relative;
  width: 7rem;
  height: 7rem;
  margin: auto;
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

export const NewLevelCardComponent = styled.div`
  padding: 12px 8px;
  display: grid;
  border-radius: 1rem;
  text-align: center;
  background: linear-gradient(to bottom, #555 0%, #111 90%);
  color: white;
  min-width: 200px;
  height: 300px;
  font-size: 12px;
  justify-content: center;
  text-align: center;
  @media (max-width: 1200px) {
    display: flex;
    width: 89vw;
    height: 9rem;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 450px) {
    display: flex;
    height: 9rem;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: space-between;
  }
`;

export const TextLevelCard = styled.div`
  position: relative;
  top: 30%;
  left: 0%;
  @media (max-width: 1200px) {
    top: 0%;
    left: -5%;
  }
`;

export const LevelCardLevel = styled.img`
  width: 12rem;
  height: 12rem;
  object-fit: cover;
  top: 50%;
  position: absolute;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -40%);
  animation: ${spinAnimation} 1s ease-out forwards;

  @media (max-width: 1200px) {
    top: 36%;
    left: -18%;
  }
  @media (max-width: 450px) {
    top: 36%;
    left: 35%;
  }
`;
export const LevelCardPhotoLevel = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 17%;
  left: 0%;
  @media (max-width: 1200px) {
    top: 3%;
    left: -68%;
  }
  @media (max-width: 450px) {
    top: 3%;
    left: -15%;
  }
`;
