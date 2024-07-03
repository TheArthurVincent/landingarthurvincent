import { styled } from "styled-components";
import { alwaysWhite, lightGreyColor, primaryColor } from "../../Styles/Styles";

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
  border: 1px solid ${lightGreyColor()};
  border-radius: 1rem;
  margin-top: 0;
  margin-right: auto;
  margin-left: auto;
  min-width: 1000px;
  min-height: 500px;
  position: relative;
  border: none;
  @media (max-width: 1150px) {
    margin-right: auto;
    margin-left: auto;
  }
  @media (max-width: 950px) {
    min-width: 950px;
    min-height: 450px;
  }
  @media (max-width: 875px) {
    min-width: 870px;
    min-height: 435px;
  }
  @media (max-width: 810px) {
    min-width: 800px;
    min-height: 400px;
  }
  @media (max-width: 750px) {
    min-width: 720px;
    min-height: 360px;
  }
  @media (max-width: 692px) {
    min-width: 680px;
    min-height: 340px;
  }
  @media (max-width: 638px) {
    min-width: 630px;
    min-height: 315px;
  }
  @media (max-width: 580px) {
    min-width: 570px;
    min-height: 285px;
  }
  @media (max-width: 550px) {
    min-width: 545px;
    min-height: 225px;
  }
  @media (max-width: 540px) {
    min-width: 535px;
    min-height: 265px;
  }
  @media (max-width: 530px) {
    min-width: 525px;
    min-height: 260px;
  }
  @media (max-width: 520px) {
    min-width: 515px;
    min-height: 255px;
  }
  @media (max-width: 510px) {
    min-width: 500px;
    min-height: 250px;
  }
  @media (max-width: 500px) {
    min-width: 490px;
    min-height: 240px;
  }
  @media (max-width: 490px) {
    min-width: 485px;
    min-height: 240px;
  }
  @media (max-width: 480px) {
    min-width: 475px;
    min-height: 235px;
  }
  @media (max-width: 470px) {
    min-width: 465px;
    min-height: 235px;
  }
  @media (max-width: 450px) {
    min-width: 445px;
    min-height: 222px;
  }
  @media (max-width: 440px) {
    min-width: 435px;
    min-height: 215px;
  }
  @media (max-width: 420px) {
    min-width: 415px;
    min-height: 210px;
  }
  @media (max-width: 410px) {
    min-width: 405px;
    min-height: 200px;
  }
  @media (max-width: 400px) {
    min-width: 390px;
    min-height: 195px;
  }
  @media (max-width: 380px) {
    min-width: 375px;
    min-height: 189px;
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
