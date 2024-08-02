import React from "react";

export function Manual() {
  return (
    <div>
      <h1>Manual do Aluno</h1>

      <h3>Acesso às Ferramentas:</h3>
      <p>Plataforma do Curso</p>

      <h3>Aulas Extras (Coletivas - 2 SEMANAS X MÊS)</h3>
      <p>Segunda, às 20:00 [Business / Conversation]</p>
      <p>
        * Funcionam como reposição para feriados e eventuais faltas do aluno.
      </p>

      <h3>Política de Cancelamento:</h3>
      <ul>
        <li>
          Cancelamento de uma Aula Particular: Se o aluno informar 24 horas
          antes, há possibilidade de reposição em algum sábado às 7h (há fila).
        </li>
        <li>Cancelamento do Curso: Avise com 1 mês de antecedência.</li>
      </ul>

      <h3>Horário das Aulas Particulares:</h3>
      <p>1, 2 ou 3 aulas na semana (55 minutos cada)</p>

      <h3>Valores:</h3>
      <table>
        <thead>
          <tr>
            <th>1 Aula</th>
            <th>2 Aulas</th>
            <th>3 Aulas</th>
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

      <h3>Lembre-se:</h3>
      <ul>
        <li>Esteja preparado para suas aulas.</li>
        <li>Comunique qualquer cancelamento com antecedência.</li>
        <li>
          Aproveite as aulas extras como uma oportunidade de aprendizado
          adicional.
        </li>
      </ul>
    </div>
  );
}

export default Manual;
