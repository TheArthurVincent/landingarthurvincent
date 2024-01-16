import React from "react";
import {
  RouteDiv,
  HOne,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  BackToHomePage,
  IFrameVideo,
} from "../../Resources/UniversalComponents";
import {
  primaryColor,
  textPrimaryColorContrast,
  transparentWhite,
} from "../../Styles/Styles";
import TopBar from "../../Application/TopBar/TopBar";
import { HThree } from "../MyClasses/MyClasses.Styled";
import { Link } from "react-router-dom";

export function Extras({ headers }) {
  const { UniversalTexts } = useUserContext();

  const contentExtras = [
    // {
    //   instruction: "Como usar a plataforma",
    //   url: "https://www.youtube.com/embed/lcMh5s2iR-M",
    //   explanation: (
    //     <>
    //       <h2>Página Inicial:</h2>
    //       <ul>
    //         <li>Acesse facilmente sua próxima aula.</li>
    //         <li>Encontre seus cartões Anki prontos para revisão.</li>
    //         <li>
    //           Navegue até sua pasta no Google Drive para acessar materiais
    //           importantes.
    //         </li>
    //       </ul>

    //       <h2>Minhas Aulas:</h2>
    //       <ul>
    //         <li>
    //           Acesse rapidamente suas últimas aulas particulares para revisão ou
    //           referência.
    //         </li>
    //       </ul>

    //       <h2>Meu Perfil:</h2>
    //       <ul>
    //         <li>Encontre todas as informações importantes sobre você.</li>
    //         <li>
    //           Incluindo detalhes da sua conta e senha do Anki para uma
    //           experiência personalizada.
    //         </li>
    //       </ul>

    //       <h2>Extras:</h2>
    //       <ul>
    //         <li>
    //           Descubra informações adicionais relacionadas às nossas aulas.
    //         </li>
    //         <li>
    //           Explore recursos extras que podem enriquecer sua experiência de
    //           aprendizado.
    //         </li>
    //       </ul>
    //     </>
    //   ),
    // },
    {
      instruction: "Como Estudar Eficientemente",
      url: "https://www.youtube.com/embed/ctr7VV-GRY8",
      explanation: (
        <>
          <h2>Estudo Ativo (Não Diário)</h2>
          <p>
            Engaje-se em atividades de aprendizado ativo, não necessariamente
            todos os dias. Experimente:
          </p>
          <ul>
            <li>Aprender algo novo.</li>
            <li>
              Participar de aulas particulares, seja 1 ou 2 vezes por semana.
            </li>
            <li>
              Participar de aulas ao vivo, também 1 ou 2 vezes por semana.
            </li>
            <li>Realizar homeworks particulares e ao vivo.</li>
          </ul>

          <h2>Estudo Passivo (Diariamente)</h2>
          <p>
            Dedique algum tempo diariamente para revisar e reforçar o que
            aprendeu. Inclua:
          </p>
          <ul>
            <li>
              Utilize o Anki diariamente, dedicando pelo menos 10 minutos à
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
      instruction: "Como usar o Anki",
      url: "https://www.youtube.com/embed/o7jJeDzv7z4",
      explanation: (
        <>
          {" "}
          <Link
            style={{
              marginRight: "1.2rem",
              marginLeft: "auto",
              maxWidth: "fit-content",
              color: primaryColor(),
              fontSize: "1rem",
              backgroundColor: textPrimaryColorContrast(),
              borderRadius: "5px",
            }}
            to="http://ankiweb.net/decks"
            target="_blank"
          >
            Clique aqui para acessar a página do Anki
          </Link>
          <br />
          <br />
          <Link
            style={{
              marginRight: "1.2rem",
              marginLeft: "auto",
              maxWidth: "fit-content",
              color: primaryColor(),
              fontSize: "1rem",
              backgroundColor: textPrimaryColorContrast(),
              borderRadius: "5px",
            }}
            to="https://ankiweb.net/account/signup"
            target="_blank"
          >
            Clique aqui para se cadastrar no Anki
          </Link>
        </>
      ),
    },
    {
      instruction: "Termos e condições",
      url: "https://www.youtube.com/embed/zAdq-u3b_qg",
      explanation: (
        <>
          {" "}
          <h2>Duração e Acesso às Aulas</h2>
          <p>
            As aulas terão duração de 55 minutos, e o professor enviará o link
            de acesso com, no mínimo, 5 minutos de antecedência.
          </p>
          <h2>Aulas Extras</h2>
          <p>
            Os alunos têm o direito de participar das aulas extras semanais, que
            são coletivas, além das aulas particulares contratadas. Essas aulas
            extras servem como compensação por aulas perdidas pelo aluno e pelos
            feriados, nos quais o professor não ministrará aulas.
          </p>
          <h2>Reposição de Aulas Particulares</h2>
          <p>
            Se o aluno não puder comparecer à aula, deve informar o professor
            com, no máximo, 24 horas de antecedência para poder repor a aula
            particular conforme a disponibilidade do professor. Se não houver
            aviso com tal antecedência, o professor não terá a obrigação de
            fazer a reposição da aula particular. Os dias para reposição são
            estabelecidos pelo professor, que irá encaixar o aluno na próxima
            janela disponível. O aluno deve se comprometer a realizar as
            atividades propostas pelo professor para melhor desenvolvimento do
            curso.
          </p>
          <h2>Falta do Professor</h2>
          <p>
            Em caso de falta do professor, a aula será reposta em horário
            combinado por ambos.
          </p>
        </>
      ),
    },
  ];
  return (
    <>
      <TopBar />
      <RouteSizeControlBox className="smooth">
        <RouteDiv>
          <HOne>{UniversalTexts.extras}</HOne> <BackToHomePage />
          {contentExtras.map((item, index) => (
            <div key={index}>
              <HThree>{item.instruction}</HThree>
              <div style={{ textAlign: "center" }}>
                <IFrameVideo src={item.url} frameBorder="0" />
              </div>
              <div
                style={{
                  backgroundColor: transparentWhite(),
                  padding: "1rem",
                }}
              >
                <p>{item.explanation}</p>
              </div>
            </div>
          ))}
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}

export default Extras;
