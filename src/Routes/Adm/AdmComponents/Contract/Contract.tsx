import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeadersProps } from "../../../../Resources/types.universalInterfaces";
import {
  backDomain,
  formatDateBrContract,
} from "../../../../Resources/UniversalComponents";
import { MyButton } from "../../../../Resources/Components/ItemsLibrary";
import Helmets from "../../../../Resources/Helmets";
import { HOne, HTwo } from "../../../../Resources/Components/RouteBox";
import { HThree } from "../../../MyClasses/MyClasses.Styled";
import { CircularProgress } from "@mui/material";

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
  const [loading, setLoading] = useState<Boolean>(false);

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
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  const actualHeaders = headers || {};

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers: actualHeaders,
      });
      setStudentsList(response.data.listOfStudents);
      setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  const liStyle = { listStyle: "upper-roman inside", marginBottom: "6px" };
  const ulStyle = { padding: " 0 1rem" };
  const topSignature = {
    width: "25rem",
    borderTop: "2px solid",
    paddingTop: "5px",
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const generatePDF = () => {
    window.print();
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div
          className="no-print"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 5rem",
          }}
        >
          <select
            onChange={handleStudentChange}
            name="students"
            className="no-print"
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
          <span className="no-print">
            <MyButton onClick={generatePDF}>Gerar PDF</MyButton>
          </span>
        </div>
      )}
      <div style={{ fontSize: "11px", padding: "1rem" }} id="contract-content">
        <HOne style={{ textAlign: "center" }}>
          Contrato de Aulas Particulares
        </HOne>
        <HTwo
          style={{
            paddingBottom: "2rem 0",
            textAlign: "center",
          }}
        >
          Dados do Aluno
        </HTwo>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>
            <strong>Nome do aluno:</strong> {name}
          </p>
          <p>
            <strong>Data de nascimento:</strong>{" "}
            {formatDateBrContract(dateOfBirth)}
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
        </div>
        <HTwo
          style={{
            marginTop: "1rem",
            paddingBottom: "2rem 0",
            textAlign: "center",
          }}
        >
          Detalhes do Contrato
        </HTwo>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>
            <strong>Número de aulas semanais (55min):</strong> {weeklyClasses}
          </p>
          <p>
            <strong>Valor acordado:</strong> R$ {fee}
          </p>
        </div>
        <HTwo
          style={{
            marginTop: "1rem",
            paddingBottom: "1rem 0",
            textAlign: "center",
          }}
        >
          Termos do Contrato
        </HTwo>
        <ul style={ulStyle}>
          <li style={{ listStyle: "none" }}>
            <HThree>Sobre as aulas</HThree>
            <ul style={ulStyle}>
              <li style={liStyle}>
                As aulas terão duração de 55 minutos, e os links para as aulas
                estão disponíveis no Portal do Aluno;
              </li>
              <li style={liStyle}>
                O aluno também terá o direito de participar de aulas coletivas,
                além das aulas particulares contratadas;
                <p
                  style={{
                    fontStyle: "italic",
                    listStyle: "square",
                    padding: "0 2rem",
                  }}
                >
                  Esta aula extra é considerada compensação por aulas perdidas
                  pelo aluno, e pelos feriados, nos quais não haverá aulas;
                </p>
              </li>
              <li style={liStyle}>
                Se o aluno não puder comparecer à aula, deve informar o
                professor com, no mínimo, 24 horas de antecedência;
              </li>
              <li style={liStyle}>
                Se o aluno não avisar ao professor com tal antecedência, o
                professor não terá a obrigação de fazer a reposição da aula
                particular;
              </li>
              <li style={liStyle}>
                Em caso de falta <strong>do professor</strong>, este reporá a
                aula ao aluno em horário combinado por ambos.
              </li>
              <li style={liStyle}>
                Os dias para reposição de aula são estabelecidos pelo professor,
                a quem caberá encaixar o aluno na próxima janela disponível;
              </li>
            </ul>
          </li>
          <li style={{ listStyle: "none" }}>
            <HThree>Sobre os descontos</HThree>
            <ul style={ulStyle}>
              <li style={liStyle}>
                O aluno terá direito aos descontos oferecidos na aba "Ranking",
                por avanço de níveis ou posição no ranking de alunos, conforme o
                critério estabelecido no mês anterior à reivindicação do
                desconto.
              </li>
              <li style={liStyle}>
                Caso o aluno faça uma recomendação ao professor, e esta resulte
                em fechamento de contrato, o aluno receberá um desconto de 10%
                em relação à mensalidade do aluno recomendado. Este desconto
                ocorrerá uma vez, no mês seguinte ao fechamento do contrato do
                aluno recomendado.
              </li>
            </ul>
          </li>
          <li style={{ listStyle: "none" }}>
            <HThree>Sobre cancelamento do curso</HThree>
            <ul style={ulStyle}>
              <li style={liStyle}>
                Em caso de cancelamento do curso, o aluno deve avisar o
                professor com pelo menos <strong>1 mês de antecedência</strong>,
                o que significa que se o aluno decidir encerrar o curso em
                março, por exemplo, este deverá ainda pagar a parcela de abril;
              </li>
              <li style={liStyle}>
                Este mês extra também representa mais um mês de aula, caso o
                aluno deseje. Conforme o exemplo anterior, o aluno poderá fazer
                as aulas de abril.
              </li>
              <li style={liStyle}>
                Após a finalização oficial do curso, o aluno terá uma semana
                para baixar todo o material produzido nas aulas. Após este
                prazo, o mesmo será definitivamente excluído.
              </li>
            </ul>
          </li>
          <li style={{ listStyle: "none" }}>
            <HThree>Sobre as atividades</HThree>
            <ul style={ulStyle}>
              <li style={liStyle}>
                O aluno deve se comprometer a realizar as atividades propostas
                pelo professor para melhor desenvolvimento do curso;
              </li>
            </ul>
          </li>
        </ul>
        <HTwo
          style={{
            marginTop: "1rem",
            paddingBottom: "2rem 0",
            textAlign: "center",
          }}
        >
          Assinaturas
        </HTwo>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            textAlign: "center",
            justifyContent: "center",
            gap: "5rem",
          }}
        >
          <p style={topSignature}> {name} (ou RESPONSÁVEL) ___/___/___</p>
          <div>
            <img
              style={{
                maxWidth: "7rem",
                borderBottom: "solid 2px",
              }}
              src="https://ik.imagekit.io/vjz75qw96/assets/signature.png?updatedAt=1717680390615"
              alt="signatureArth"
            />
            <p>ASSINATURA DO PROFESSOR</p>
          </div>
        </div>
      </div>
      <Helmets text={`Contrato de Aulas Particulares | ${name}`} />
    </div>
  );
}

export default Contract;
