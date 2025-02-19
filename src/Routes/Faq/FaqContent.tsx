import React from "react";
import { Link } from "react-router-dom";
import RankingExplanation from "../Ranking/RankingComponents/RankingExplanation";
import { HTwo } from "../../Resources/Components/RouteBox";
import { HThree } from "../MyClasses/MyClasses.Styled";
import Manual from "../Adm/AdmComponents/Manual/Manual";

export const contentFaq = [
  {
    instruction: "Como Estudar Eficientemente?",
    tags: [
      "estudar",
      "estudo",
      "estudo ativo",
      "estudo passivo",
      "ativo",
      "passivo",
      "estudando",
      "tempo",
    ],
    explanation: (
      <>
        <HTwo>Estudo Ativo (Não Diário)</HTwo>
        <p>
          Engaje-se em atividades de aprendizado ativo, não necessariamente
          todos os dias. Experimente:
        </p>
        <ul>
          <li>Aprender algo novo.</li>
          <li>
            Participar de aulas particulares, seja 1 ou 2 vezes por semana.
          </li>
          <li>Participar de Aulas em grupo, também 1 ou 2 vezes por semana.</li>
          <li>Realizar lições de casa particulares e em grupo.</li>
        </ul>

        <HTwo>Estudo Passivo (Diariamente)</HTwo>
        <p>
          Dedique algum tempo diariamente para revisar e reforçar o que
          aprendeu. Inclua:
        </p>
        <ul>
          <li>
            Utilize os Flashcards diariamente, dedicando pelo menos 10 minutos à
            revisão de cartões.
          </li>
          <li>Exponha-se ao idioma através de:</li>
          <ul>
            <li>Músicas.</li>
            <li>Filmes.</li>
            <li>Séries.</li>
            <li>Documentários.</li>
          </ul>
        </ul>

        <p>
          Lembre-se, a consistência é a chave para o sucesso. Envolva-se em
          estudos ativos regularmente e reforce seu aprendizado de maneira
          passiva todos os dias.
        </p>
      </>
    ),
  },
  {
    instruction: "Como fazer mineração de sentenças?",
    tags: ["Vocabulário", "vocabulary", "study", "estudar"],
    explanation: (
      <div>
        Este é, a meu ver, o melhor método para reforçar o uso das palavras.
        Minerar sentenças é o ato de encontrar, em contextos reais, a palavra
        aprendida. Usamos 3 sites para isso:
        <br />
        <br />
        <a href="https://www.linguee.com/">Linguee</a>
        <br />
        <a href="https://youglish.com/">YouGlish</a>
        <br />
        <a href="https://context.reverso.net/traducao/">Reverso</a>
        <br />
        Pesquisem as novas palavras aprendidas em contextos reais e extraiam as
        frases em que elas aparecem.
      </div>
    ),
  },
  {
    instruction: "Sou obrigado a participar das aulas em grupo?",
    tags: ["aula", "grupo", "vivo", "group", "live"],
    explanation: (
      <div>Não. Mas eu recomento fortemente! (e vale ponto, né)</div>
    ),
  },
  {
    instruction: "E se minha aula cair num feriado?",
    tags: ["feriado", "reposição", "vivo", "live", "holiday"],
    explanation: (
      <div>
        Não dou aulas em feriados. Mas você não fica na mão, pois as aulas ao
        vivo funcionam como reposição nesses casos e em casos de falta. Se você
        paga, por exemplo, por 1 aula particular por semana, você tem direito a
        mais 2 aulas por semana, que funcionam como bônus, e também para que
        você não fique sem aula caso sua aula particular caia num feriado.
      </div>
    ),
  },
];
