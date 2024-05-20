import { styled } from "styled-components";

export const ImgLesson = styled.img`
  width: 100%;
  max-width: 20rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display:block;
  margin: auto;
  object-position: center;
  @media (max-width: 500px) {
    max-width: 15rem;
  }
`;

export const LiGridImageLessons = styled.li`
  display: grid;
  list-style: none;
  margin-bottom: 10px;
`;
export const UlGridImageLessons = styled.ul`
  padding: 1rem;
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
