import React, { useEffect, useState } from "react";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import {
  InputField,
  Button,
  backDomain,
  InputFieldNotRequired,
  Spin,
} from "../../Resources/UniversalComponents";
import { FormList, FormList2 } from "./Adm.Styled";
import { Link } from "react-router-dom";
import { primaryColor, textPrimaryColorContrast } from "../../Styles/Styles";

export function ManageCourses() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [courseColor, setCourseColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [coursesList, setCoursesList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleSeeModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const seeEdition = async (id) => {
    handleSeeModal();
    try {
      const response = await axios.put(`${backDomain}/api/v1/courses/${id}`);
      // setNewName(response.data.formattedStudentData.name);
      // setNewLastName(response.data.formattedStudentData.lastname);
      // setNewUsername(response.data.formattedStudentData.username);
      // setNewPhone(response.data.formattedStudentData.phoneNumber);
      // setNewEmail(response.data.formattedStudentData.email);
      // setPermissions(response.data.formattedStudentData.permissions);
      // setID(response.data.formattedStudentData.id);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postCourse = async () => {
      try {
        const response = await axios.post(`${backDomain}/api/v1/courses`, {
          courseTitle: title,
          img,
          description,
          link: `/${link}`,
          courseColor,
        });
        alert("Curso postado com sucesso");
        window.location.href = "/adm";
      } catch (error) {
        alert("Erro ao postar curso");
      }
    };
    postCourse();
  };

  const postCourse = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/courses`);
      setCoursesList(response.data.courses);
      setLoading(false);
      console.log(coursesList);
    } catch (error) {
      alert("Erro ao encontrar cursos");
    }
  };
  useEffect(() => {
    postCourse();
  }, []);

  return (
    <RouteDiv>
      <HOne>Gerenciar Cursos</HOne>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-around",
        }}
      >
        <form style={{ display: "grid", gap: "1rem" }} onSubmit={handleSubmit}>
          <HTwo
            style={{
              borderTop: "1px solid",
              paddingTop: "1rem",
            }}
          >
            Inserir novo curso
          </HTwo>
          <FormList2>
            <InputField
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Nome do Curso"
              type="text"
            />
            <InputField
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descrição do curso"
              type="text"
            />
            <InputFieldNotRequired
              value={img}
              onChange={(event) => setImg(event.target.value)}
              placeholder="Link da imagem do curso (opcional)"
              type="text"
            />
            <InputField
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="Link do curso (ex.: meu-curso)"
              type="text"
            />
            <p
              style={{
                display: "grid",
                gap: "0.2rem",
                margin: "0 0 3px 0",
              }}
            >
              <span>Cor do curso: {courseColor}</span>
              <input
                type="color"
                value={courseColor}
                onChange={(event) => setCourseColor(event.target.value)}
              />
            </p>
          </FormList2>
          <Button style={{ marginLeft: "auto" }} type="submit">
            Criar
          </Button>
        </form>
        <div>
          <HTwo
            style={{
              borderTop: "1px solid",
              paddingTop: "1rem",
            }}
          >
            Editar um curso
          </HTwo>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {loading ? (
              <Spin />
            ) : (
              <div
                style={{
                  maxHeight: "20rem",
                  overflow: "auto",
                }}
              >
                {coursesList.map((course, index) => (
                  <div
                    style={{
                      minWidth: "fit-content",
                      marginBottom: "12px",
                      borderRadius: "5px",
                      border: "solid 1px",
                      padding: "1rem",
                      backgroundColor: course.courseColor,
                      color: "#fff",
                    }}
                  >
                    <h3 style={{ textAlign: "center", marginBottom: "12px" }}>
                      {course.courseTitle}
                    </h3>
                    <p style={{ textAlign: "center", marginBottom: "12px" }}>
                      ID: {course._id}
                    </p>
                    <div
                      style={{
                        margin: "5px",
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "1rem",
                      }}
                    >
                      <p style={{ marginBottom: "12px" }}>
                        <img
                          style={{
                            maxWidth: "5rem",
                          }}
                          src={course.img}
                          alt={course.img}
                        />
                      </p>
                      <div
                        style={{
                          margin: "5px",
                          display: "flex",
                          alignItems: "center",
                          maxWidth: "fit-content",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            color: course.courseColor,
                            backgroundColor: "#fff",
                            padding: "5px",
                            maxWidth: "fit-content",
                            maxHeight: "1rem",
                            display: "flex",
                            alignItems: "center",
                            maxWidth: "fit-content",
                          }}
                        >
                          {course.courseColor}
                        </div>

                        <div
                          style={{
                            color: course.courseColor,
                            backgroundColor: "#fff",
                            padding: "5px",
                            maxWidth: "fit-content",
                            maxHeight: "1rem",
                            display: "flex",
                            alignItems: "center",
                            maxWidth: "fit-content",
                          }}
                        >
                          {course.link}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        minWidth: "fit-content",
                      }}
                    >
                      <Button
                        style={{
                          color: "#fff",
                          padding: "5px",
                          backgroundColor: "#091a7a",
                          minWidth: "fit-content",
                        }}
                      >
                        Editar este curso
                      </Button>
                      <Button
                        style={{
                          color: "#fff",
                          padding: "5px",
                          backgroundColor: "#a81d1d",
                          minWidth: "fit-content",
                        }}
                        type="submit"
                      >
                        Apagar este curso
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </RouteDiv>
  );
}

export default ManageCourses;
