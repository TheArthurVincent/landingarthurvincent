import { styled } from "styled-components";
import { alwaysWhite, lightGreyColor } from "../../Styles/Styles";


export const DivModal = styled.div`
  position: fixed;
  z-index: 100;
  background-color: ${alwaysWhite()};
  padding: 1rem;
  width: 50vw;
  height: 30rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 2px 10px 4px #ccc;
`;

export const InternDivModal = styled.div`
  display: grid;
  gap: 2px;
  margin: auto;
`;

export const EventsCardsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const EventsCard = styled.div`
  display: grid;
  gap: 0.5rem;
  max-width: 25rem;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
  background-color: ${lightGreyColor()};
`;

export const SpanDisapear = styled.span`
  padding: 3px;
  font-size: 1rem;
  font-weight: 400;
  padding: "0.2rem 0.6rem";
  @media (max-width: 1200px) {
    display: none;
  }
`;

export const IFrameVideoBlog = styled.iframe`
  border: none;
  margin-top: 0;
  margin-right: auto;
  margin-left: auto;
  min-width: 950px;
  min-height: 450px;
  @media (max-width: 1150px) {
    min-width: 800px;
    min-height: 450px;
  }
  @media (max-width: 950px) {
    min-width: 750px;
    min-height: 400px;
  }
  @media (max-width: 875px) {
    min-width: 700px;
    min-height: 400px;
  }
  @media (max-width: 810px) {
    min-width: 650px;
    min-height: 380px;
  }
  @media (max-width: 750px) {
    min-width: 600px;
    min-height: 350px;
  }
  @media (max-width: 692px) {
    min-width: 550px;
    min-height: 320px;
  }
  @media (max-width: 638px) {
    min-width: 500px;
    min-height: 300px;
  }
  @media (max-width: 580px) {
    min-width: 470px;
    min-height: 200px;
  }
  @media (max-width: 542px) {
    min-width: 440px;
    min-height: 200px;
  }
  @media (max-width: 512px) {
    min-width: 430px;
    min-height: 200px;
  }
  @media (max-width: 500px) {
    min-width: 420px;
    min-height: 200px;
  }
  @media (max-width: 486px) {
    min-width: 390px;
    min-height: 200px;
  }
  @media (max-width: 450px) {
    min-width: 360px;
    min-height: 200px;
  }
  @media (max-width: 418px) {
    min-width: 340px;
    min-height: 180px;
  }
  @media (max-width: 402px) {
    min-width: 320px;
    min-height: 165px;
  }
  @media (max-width: 376px) {
    min-width: 300px;
    min-height: 150px;
  }
  @media (max-width: 353px) {
    min-width: 270px;
    min-height: 150px;
  }
  @media (max-width: 280px) {
    min-width: 140px;
    min-height: 64px;
  }
  @media (max-width: 210px) {
    min-width: 80px;
    min-height: 38px;
  }
`;

export const ImgBlog = styled.img`
  margin-top: 0;
  margin-right: auto;
  margin-left: auto;
  object-position: center;
  max-height: auto;
  width: 99%;
`;

export const Disapear = styled.span`
  @media (max-width: 900px) {
    display: none;
  }
`;
export const DivPost = styled.div`
  display: grid;
  // justify-content: center;
  // flex-direction: column;
  max-width: 650px;
`;
