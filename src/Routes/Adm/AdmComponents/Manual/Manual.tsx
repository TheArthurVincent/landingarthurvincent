import React from "react";

export function Manual() {
  return (
    <div>
      <h1>Manual do aluno</h1>
      <ol>
        <li>
          Acesso às Ferramentas:
          <ul>
            <li>Plataforma do Curso **</li>
          </ul>
        </li>
        <li>
          Aulas Extras (Coletivas - 2 SEMANAS X MÊS]
          <ul>
            <li>Segunda, às 20:00 [Business / Conversation]</li>
          </ul>
          <p>
            * Funcionam como reposição para feriados e eventuais faltas do
            aluno.
          </p>
        </li>
        <li>
          Política de Cancelamento:
          <ul>
            <li>
              Cancelamento de uma Aula Particular: Se o aluno informar 24 horas
              antes, há possibilidade de reposição em algum sábado às 7h (há
              fila).
            </li>
            <li>Cancelamento do Curso: Avise com 1 mês de antecedência.</li>
          </ul>
        </li>
        <li>
          Horário das Aulas Particulares:
          <ul>
            <li>1, 2 ou 3 aulas na semana (55 minutos cada)</li>
            <li>Valores:</li>
          </ul>
          <table>
            <thead>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R$ 300</td>
                <td>R$ 500</td>
                <td>R$ 750</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li>
          Lembre-se:
          <ul>
            <li>Esteja preparado para suas aulas.</li>
            <li>Comunique qualquer cancelamento com antecedência.</li>
            <li>
              Aproveite as aulas extras como uma oportunidade de aprendizado
              adicional.
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
}

export default Manual;
