import React from "react";
import RankingList from "./RankingList";
import { primaryColor } from "../../../Styles/Styles";
import { IFrameVideo, getVideoEmbedUrl } from "../../../Resources/UniversalComponents";
import Warning from "../../../Resources/Warning";

export default function RankingExplanation() {
  const h3 = { textAlign: "center", color: primaryColor(), fontWeight: 600, margin: "1rem 0" }
  const h4 = { textDecoration: "underline", color: primaryColor(), fontWeight: 600, margin: "1rem 0" }

  return (
    <div>
      <IFrameVideo
        style={{
          border: "solid 1px black",
        }}
        src={getVideoEmbedUrl("https://vimeo.com/905749262?share=copy")}
      />
      <p>
        Os rankings são oportunidades de ganhar descontos ou cashbacks na mensalidade por disciplina!
      </p>
      <h3 style={h3}>O altera a pontuação? (Score)</h3>
      <h4 style={h4}>Revisões do Anki</h4>
      <ul>
        <li>Revisados pelo menos 15 cards em pelo menos 6 dias em 7? = + 500 pontos</li>
        <li>Revisados pelo menos 15 cards em pelo menos 3 dias em 7? = + 200 pontos</li>
        <li>Chegou na aula com o Anki vazio? = + 200 pontos</li>
        <li>Nenhuma revisão em 7? = - 100 pontos</li>
      </ul>
      <h4 style={h4}>Homework</h4>
      <ul>
        <li>Homework feita = + 500 pontos</li>
      </ul>
      <h4 style={h4}>Group classes</h4>
      <ul>
        <li>Participou da aula em grupo = + 300</li>
        <li>Fez a Homework da aula em grupo = + 500</li>
        <li>Fez a apresentação = + 1,000</li>
      </ul>
      <h4 style={h4}>Outros</h4>
      <ul>
        <li>Test - Pode ser marcado a cada 3 meses = + (0 - 3000)</li>
        <li>Extra activities - [[Em breve será criado]]</li>
        <li>AWOL (absent without leave)/Não comparecer à aula sem aviso = -200</li>
      </ul>

      <h3 style={h3}>Quem ganha o cashback?</h3>
      <p>Qualificação mensal:</p>
      <Warning text={`Qualificação apenas para quem tem PELO MENOS 3000 pontos no mês!`} />
      <ul>
        <li>1st place = 15% discount/cashback (no mês seguinte à qualificação)</li>
        <li>2nd place = 10% discount/cashback (no mês seguinte à qualificação)</li>
        <li>3rd place = 5% discount/cashback (no mês seguinte à qualificação)</li>
      </ul>
      <h3 style={h3}>Passando de Nível</h3>
      <RankingList />
    </div >
  );
}
