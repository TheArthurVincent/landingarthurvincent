import styled from "styled-components";
// Interfaces
interface ScoreItem {
  description: string;
  score: number;
  color: string;
  nobutton?: boolean;
}

interface Criteria {
  title: string;
  score: ScoreItem[];
  icon: string;
  transform?: string;
  color: string;
  comment?: string;
}

interface Button {
  color: string;
  score: number;
  description: string;
  category: string;
  text: string;
}
// Lista
export const listOfCriteria = [
  {
    title: "Aula particular",
    comment:
      "As provas serão realizadas a critério do professor, e avisadas com antecedência de pelo menos 1 mês.",
    icon: "fa fa-book",
    color: "rgb(230, 160, 32)",
    score: [
      { description: "Homework Realizado", score: 750, color: "green" },
      {
        description: "Homework Atrasado (> 7 dias) ou incompleto",
        score: 200,
        color: "green",
      },
      {
        description: "Prova",
        score: 1000,
        color: "green",
        nobutton: true,
      },
    ],
  },
  {
    title: "Flashcards",
    icon: "fa fa-clone",
    transform: "rotate(-25deg)",
    color: "rgb(1, 188, 255)",
    score: [
      {
        description: "Revisou um card",
        score: 3,
        nobutton: true,
        color: "green",
      },
      {
        description:
          "Pontuação por palavra certa no Listening Exercise (caso acerte mais de 95%)",
        score: 3,
        nobutton: true,
        color: "green",
      },
      {
        description:
          "Pontuação por palavra certa no Listening Exercise (caso acerte mais entre 60% e 95%)",
        score: 1,
        nobutton: true,
        color: "green",
      },
      // {
      //   description:
      //     "Pontuação por resposta certa no Q&A (caso não veja o texto)",
      //   score: 7,
      //   nobutton: true,
      //   color: "green",
      // },
      // {
      //   description: "Pontuação por resposta certa no Q&A (caso veja o texto)",
      //   score: 3,
      //   nobutton: true,
      //   color: "green",
      // },
    ],
  },
  {
    title: "Group Classes",
    icon: "fa fa-graduation-cap",
    color: "#753",
    score: [
      {
        color: "green",
        score: 750,
        description: "Homework Group Class",
        text: "Homework Group Class (entregar na aula particular)",
      },
      {
        description: "Homework Atrasado (> 7 dias atrás) ou incompleto",
        score: 250,
        color: "green",
      },
      {
        color: "green",
        score: 75,
        description: "Participou da aula em grupo",
        text: "Participou da aula em grupo",
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
        score: 200,
        description: "Recomendação de aluno (a) particular fechada",
        text: "Recomendação",
      },
      {
        color: "green",
        score: 50,
        description: "Recomendação de usuário da plataforma fechada",
        text: "Recomendação",
      },
      {
        color: "red",
        score: -150,
        description: "AWOL Faltou na aula e não avisou",
        text: "Faltou na aula e não avisou",
      },
    ],
  },
];

// Método

function transformCriteriaToButtons(criteriaList: Criteria[]) {
  const buttonsList: Button[] = [];

  criteriaList.forEach((criteria) => {
    criteria.score.forEach((scoreItem) => {
      const button: Button = {
        color:
          typeof scoreItem.score === "number" && scoreItem.score >= 0
            ? "green"
            : "red",
        score: scoreItem.score,
        description: scoreItem.description,
        category: criteria.title,
        text: `${criteria.title.split(" ")[0]} ${
          scoreItem.description.split(" ")[0]
        } ${scoreItem.description.split(" ")[1]}`,
      };
      if (!scoreItem.nobutton) {
        buttonsList.push(button);
      }
    });
  });

  return buttonsList;
}

export const listOfButtons: Button[] =
  transformCriteriaToButtons(listOfCriteria);

export const GridRankingExplanation = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
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
  min-height: 20rem;
  text-align: center;
  @media (max-width: 800px) {
    width: 85%;
    padding: 10px;
  }
`;
