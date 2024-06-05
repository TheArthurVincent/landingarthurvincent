import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOne, HTwo, RouteDiv } from "../../../../Resources/Components/RouteBox";
import {
  BackToHomePage,
  IFrameVideo,
  backDomain,
  getVideoEmbedUrl,
} from "../../../../Resources/UniversalComponents";
import { Button, CircularProgress, Input, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import {
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textSecondaryColorContrast,
} from "../../../../Styles/Styles";
import { HThree } from "../../../MyClasses/MyClasses.Styled";
import { HeadersProps } from "../../../../Resources/types.universalInterfaces";

export function Contract({ headers }: HeadersProps) {
  return (
    <RouteDiv>
      <HOne>Contrato de Aulas Particulares</HOne>

      <HTwo>Dados do Aluno</HTwo>
      <p>
        <strong>Nome do aluno:</strong> Paula Mota
      </p>
      <p>
        <strong>Data de nascimento:</strong> 11/04/1992
      </p>
      <p>
        <strong>Telefone:</strong> +55 71 99108-1255
      </p>
      <p>
        <strong>E-mail:</strong> paula.motac@gmail.com
      </p>
      <p>
        <strong>CPF:</strong> 03095976500
      </p>

      <HTwo>Detalhes do Contrato</HTwo>
      <p>
        <strong>Número de aulas semanais (55min):</strong> 1
      </p>
      <p>
        <strong>Valor acordado:</strong> R$ 300,00
      </p>
      <p>
        <strong>Data de assinatura do contrato:</strong> ___/___/___
      </p>

      <HTwo>Termos do Contrato</HTwo>
      <p>
        As aulas terão duração de 55min, e o professor deve enviar ao aluno o
        link de acesso com, no mínimo, 5 minutos de antecedência;
      </p>
      <p>
        O aluno também terá o direito de participar das aulas extras semanais,
        que são coletivas, além das aulas particulares contratadas;
      </p>
      <p>
        Esta aula extra é considerada como aula de compensação por aulas
        perdidas pelo aluno, e pelos feriados, nos quais o professor não
        ministrará aulas;
      </p>
      <p>
        Se o aluno, por qualquer motivo, não puder comparecer à aula, deve
        informar o professor com, no máximo, 24h de antecedência, para poder
        repor a aula particular conforme a disponibilidade do professor;
      </p>
      <p>
        Se o aluno não avisar ao professor com tal antecedência, o professor não
        terá a obrigação de fazer a reposição da aula particular;
      </p>
      <p>
        Os dias para reposição de aula são estabelecidos pelo professor, a quem
        caberá encaixar o aluno na próxima janela disponível;
      </p>
      <p>
        Em caso de cancelamento do curso, o aluno deve avisar o professor com
        pelo menos 1 mês de antecedência;
      </p>
      <p>
        O aluno terá uma semana para baixar todo o material produzido nas aulas.
        Após este prazo, o mesmo será definitivamente excluído.
      </p>
      <p>
        O aluno deve se comprometer a realizar as atividades propostas pelo
        professor para melhor desenvolvimento do curso;
      </p>
      <p>
        Em caso de falta do professor, este reporá a aula ao aluno em horário
        combinado por ambos.
      </p>

      <HTwo>Assinaturas</HTwo>
      <p>_____________________________</p>
      <p>_____________________________</p>
      <p>Paula Mota</p>
      <p>Mariana Araujo Lins</p>
      <p>
        <strong>ASSINATURA DOS (AS) ALUNOS (AS)</strong>
      </p>
      <p>__________________________</p>
      <p>
        <strong>ASSINATURA DO PROFESSOR</strong>
      </p>
    </RouteDiv>
  );
}

export default Contract;
