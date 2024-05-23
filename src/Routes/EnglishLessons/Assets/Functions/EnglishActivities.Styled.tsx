import { styled } from "styled-components";

export const ImgLesson = styled.img`
  width: 100%;
  max-width: 20rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  margin: auto;
  object-position: center;
  border-radius: 10px;
  box-shadow: 1px 1px 12px 3px #bbb;
  @media (max-width: 500px) {
    max-width: 15rem;
  }
  @media print {
    box-shadow: 1px 1px 12px 3px white;
  }
`;

export const LiSentence = styled.li`
  list-style: none;
  margin-bottom: 10px;
  box-shadow: 1px 1px 10px 1px #ddd;
  padding: 5px;

  @media print {
    box-shadow: 1px 1px 12px 3px white;
  }
`;

export const UlSentences = styled.ul`
  padding: 0.5rem;
  display: grid;
  gap: 0.8rem;

  @media (max-width: 1500px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
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
  @media (max-width: 690px) {
    grid-template-columns: 1fr;
  }
`;
export const LessonSizeControlBox = styled.div`
  max-width: 90vw;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 0.5rem;
  margin-bottom: 9rem;
  &.smooth {
    animation-name: slideInLeft;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }
  @media (max-width: 800px) {
    flex-direction: column-reverse;
    max-width: 100vw;
  }
`;
