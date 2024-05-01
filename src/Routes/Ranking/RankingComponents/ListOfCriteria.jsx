import styled from "styled-components";

export const listOfCriteria = [
  {
    title: "Aula particular",
    comment: "A prova pode ser realizada em Março/Junho/Setembro/Dezembro",
    icon: "fa fa-book",
    color: "rgb(230, 160, 32)",
    score: [
      { description: "Homework Realizado", score: 610, color: "green" },
      {
        description: "Homework Atrasado (> 7dias)",
        score: 220,
        color: "green",
      },
      {
        description: "Prova",
        score: "0-1,500",
        color: "green",
        nobutton: true,
      },
    ],
  },
  {
    title: "Anki",
    icon: "fa fa-star",
    transform: "rotate(-25deg)",
    color: "rgb(1, 188, 255)",
    score: [
      { description: "6 dias em 7 (1x/semana)", score: 700, color: "green" },
      { description: "3 dias em 7 (1x/semana)", score: 200, color: "green" },
      {
        description: "Chegou na aula com o Anki totalmente revisado",
        score: 130,
        color: "green",
      },
      {
        description: "Enviou foto do Anki totalmente revisado",
        score: 85,
        color: "green",
      },
    ],
  },
  {
    title: "Group Classes",
    icon: "fa fa-graduation-cap",
    color: "#753",
    score: [
      {
        color: "green",
        score: 480,
        description: "Homework Group Class",
        text: "Homework Group Class",
      },
      {
        description: "Homework Atrasado (> 7 dias)",
        score: 110,
        color: "green",
      },
      {
        color: "green",
        score: 80,
        description: "Participou da aula em grupo",
        text: "Participou da aula em grupo",
      },
      {
        color: "green",
        score: 800,
        description: "Fez Apresentação",
        text: "Apresentação (pode fazer na aula particular)",
      },
    ],
  },
  {
    title: "Others",
    icon: "fa fa-pencil",
    color: "#000",
    score: [
      {
        color: "green",
        score: 50,
        description: "Recomendação fechada",
        text: "Recomendação",
      },
      {
        color: "green",
        score: 20,
        description: "Instagram Post estudando marcando @thearthurvincent_",
        text: "Instagram Post ",
      },
      {
        color: "red",
        score: -130,
        description: "AWOL Faltou na aula e não avisou",
        text: "Faltou na aula e não avisou",
      },
    ],
  },
];

function transformCriteriaToButtons(criteriaList) {
  const buttonsList = [];

  criteriaList.forEach((criteria) => {
    criteria.score.forEach((scoreItem) => {
      const button = {
        color: scoreItem.score >= 0 ? "green" : "red",
        score: scoreItem.score,
        description: scoreItem.description,
        category: criteria.title,
        text: `${criteria.title.split(" ")[0]} ${
          scoreItem.description.split(" ")[0]
        } ${scoreItem.description.split(" ")[1]}`,
      };
      if (!scoreItem.nobutton == true) {
        buttonsList.push(button);
      } else {
        null;
      }
    });
  });

  return buttonsList;
}

export const listOfButtons = transformCriteriaToButtons(listOfCriteria);

export const GridRankingExplanation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const GridRankingExplanationCard = styled.div`
  padding: 5px;
  border: 2px solid;
  margin: auto;
  borderradius: 5px;
  width: 20rem;
  height: 20rem;
  text-align: center;
  @media (max-width: 800px) {
    width: 85%;
    padding: 10px;
  }
`;
