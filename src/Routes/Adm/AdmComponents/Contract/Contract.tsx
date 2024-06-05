import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  HOne,
  HTwo,
  RouteDiv,
} from "../../../../Resources/Components/RouteBox";
import { backDomain } from "../../../../Resources/UniversalComponents";
import { HeadersProps } from "../../../../Resources/types.universalInterfaces";

export function Contract({ headers }: HeadersProps) {
  const [studentsList, setStudentsList] = useState<any>([]);
  const [newID, setNewID] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [doc, setDoc] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fee, setFee] = useState<number>(0);
  const [weeklyClasses, setWeeklyClasses] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleStudentChange = async (event: any) => {
    setNewID(event.target.value);

    try {
      const response = await axios.get(
        `${backDomain}/api/v1/student/${event.target.value}`,
        {
          headers: actualHeaders,
        }
      );
      setName(response.data.formattedStudentData.fullname);
      setFee(response.data.formattedStudentData.fee);
      setWeeklyClasses(response.data.formattedStudentData.weeklyClasses);
      setEmail(response.data.formattedStudentData.email);
      setPhoneNumber(response.data.formattedStudentData.phoneNumber);
      setDoc(response.data.formattedStudentData.doc);
      setDateOfBirth(response.data.formattedStudentData.dateOfBirth);
      console.log(response);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }

    console.log(event.target.value);
  };

  const actualHeaders = headers || {};

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers: actualHeaders,
      });
      setStudentsList(response.data.listOfStudents);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <RouteDiv style={{ fontSize: "12px" }}>
      <select
        className="no-print"
        onChange={handleStudentChange}
        name="students"
        id=""
        value={newID}
      >
        {studentsList.map((student: any, index: number) => {
          return (
            <option key={index} value={student.id}>
              {student.name + " " + student.lastname}
            </option>
          );
        })}
      </select>
      <HOne>Contrato de Aulas Particulares</HOne>
      <h3>Dados do Aluno</h3>
      <p>
        <strong>Nome do aluno:</strong> {name}
      </p>
      <p>
        <strong>Data de nascimento:</strong> {dateOfBirth}
      </p>
      <p>
        <strong>Telefone:</strong> {phoneNumber}
      </p>
      <p>
        <strong>E-mail:</strong> {email}
      </p>
      <p>
        <strong>CPF:</strong> {doc}
      </p>{" "}
      <h3>Detalhes do Contrato</h3>
      <p>
        <strong>Número de aulas semanais (55min):</strong> {weeklyClasses}
      </p>
      <p>
        <strong>Valor acordado:</strong> R$ {fee}
      </p>
      <p>
        <strong>Data de assinatura do contrato:</strong> ___/___/___
      </p>
      <h3>Termos do Contrato</h3>
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
      <h3>Assinaturas</h3>
      <div style={{ display: "flex", margin: "auto", gap: "3rem" }}>
        <div>
          <p>_____________________________</p>
          <p>{name}</p>
          <p>
            <strong>ASSINATURA DO (A) ALUNO (A)</strong>
          </p>
        </div>
        <div>
          <p>__________________________</p>
          <p>
            <strong>ASSINATURA DO PROFESSOR</strong>
          </p>
        </div>
      </div>
    </RouteDiv>
  );
}

export default Contract;
