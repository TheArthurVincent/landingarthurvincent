import React, { useEffect, useState } from "react";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import {
  InputField,
  Button,
  backDomain,
  InputFieldNotRequired,
  Spin,
  Xp,
} from "../../Resources/UniversalComponents";
import { FormList2 } from "./Adm.Styled";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { alwaysWhite } from "../../Styles/Styles";

export function ManageCourses() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [courseColor, setCourseColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [coursesList, setCoursesList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [courseId, setCourseId] = useState("");
  const [seeDeleteCourse, setSeeDeleteCourse] = useState(true);
  const [seeEditCourse, setSeeEditCourse] = useState(false);
  const [titleToEdit, setTitleToEdit] = useState("");
  const [descriptionToEdit, setDescriptionToEdit] = useState("");
  const [colorToEdit, setColorToEdit] = useState("");
  const [imgToEdit, setImgToEdit] = useState("");
  const [value, setValue] = React.useState("1");
  const [newModule, setNewModule] = React.useState("");
  const [modules, seeMmodules] = React.useState([]);

  const createNewModule = async (courseId) => {
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/moduleforcourse/${courseId}`,
        { moduleTitle: newModule }
      );

      alert("Módulo postado com sucesso");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const seeModules = async (courseId) => {
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/moduleforcourse/${courseId}`
      );
      console.log(response.data.modules);
      seeMmodules(response.data.modules);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSeeEditCourse = async (courseId) => {
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/courses/${courseId}`
      );
      setTitleToEdit(response.data.course.courseTitle);
      setImgToEdit(response.data.course.img);
      setColorToEdit(response.data.course.courseColor);
      setDescriptionToEdit(response.data.course.description);
      setSeeEditCourse(true);
    } catch (e) {
      console.log(e);
    }
  };
  const saveCourse = async (courseId) => {
    const data = {
      courseTitle: titleToEdit,
      description: descriptionToEdit,
      img: imgToEdit,
      courseColor: colorToEdit,
    };
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/courses/${courseId}`,
        data
      );
      alert("Curso editado com sucesso");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSeeDeleteCourse = () => {
    setSeeDeleteCourse(!seeDeleteCourse);
  };

  const deleteCourse = async () => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/courses/${courseId}`
      );
      alert("Curso excluído");
      window.location.reload();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const deleteModule = async (id) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/moduleforcourse/${id}`
      );
      alert("Módulo excluído");
      window.location.reload();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const handleSeeModal = () => {
    setIsModalVisible(!isModalVisible);
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
                  width: "20rem",
                  overflow: "auto",
                }}
              >
                {coursesList.map((course, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "2px",
                      minWidth: "fit-content",
                      marginBottom: "12px",
                      borderRadius: "5px",
                      border: "solid 1px",
                      padding: "1rem",
                      border: `5px solid ${course.courseColor}`,
                      color: "#fff",
                      backgroundColor: alwaysWhite(),
                    }}
                  >
                    <h3
                      style={{
                        textAlign: "center",
                        marginBottom: "12px",
                        backgroundColor: course.courseColor,
                      }}
                    >
                      {course.courseTitle}
                    </h3>
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
                            maxWidth: "15rem",
                          }}
                          src={course.img}
                          alt={course.img}
                        />
                      </p>
                    </div>
                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        minWidth: "fit-content",
                        gap: "0.5rem",
                      }}
                    >
                      <Button
                        style={{
                          color: "#fff",
                          padding: "5px",
                          backgroundColor: "#091a7a",
                          minWidth: "fit-content",
                        }}
                        onClick={() => {
                          handleSeeEditCourse(course._id);
                          setCourseId(course._id);
                        }}
                      >
                        Gerenciar curso
                      </Button>
                      <Button
                        style={{
                          color: "#fff",
                          padding: "5px",
                          backgroundColor: "#a81d1d",
                          minWidth: "fit-content",
                        }}
                        onClick={() => {
                          setCourseId(course._id);
                          handleSeeDeleteCourse();
                        }}
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
      <div
        style={{
          backgroundColor: "#00000073",
          width: "6000px",
          top: 0,
          left: 0,
          position: "fixed",
          zIndex: 1000,
          display: !seeDeleteCourse ? "block" : "none",
          height: "6000px",
        }}
        onClick={() => {
          handleSeeDeleteCourse();
        }}
      />
      <div
        style={{
          textAlign: "center",
          position: "fixed",
          top: "30%",
          left: "40%",
          zIndex: 2000,
          padding: "1rem",
          display: !seeDeleteCourse ? "block" : "none",
          backgroundColor: "#fff",
        }}
      >
        <p>
          Tem certeza que deseja apagar este curso?
          <br />
          Obs.: Esta ação não pode ser desfeita!
        </p>
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
              backgroundColor: "#20308a",
              minWidth: "fit-content",
            }}
            onClick={() => {
              handleSeeDeleteCourse();
            }}
          >
            Não
          </Button>
          <Button
            style={{
              color: "#fff",
              padding: "5px",
              backgroundColor: "#c70000",
              minWidth: "fit-content",
            }}
            onClick={() => {
              deleteCourse();
            }}
          >
            Sim
          </Button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#00000073",
          width: "6000px",
          top: 0,
          left: 0,
          position: "fixed",
          zIndex: 1000,
          display: seeEditCourse ? "block" : "none",
          height: "6000px",
        }}
        onClick={() => {
          setSeeEditCourse(false);
        }}
      />
      <div
        style={{
          textAlign: "center",
          position: "fixed",
          top: "20%",
          left: "30%",
          zIndex: 2000,
          padding: "1rem",
          minWidth: "40rem",
          minHeight: "30rem",
          display: seeEditCourse ? "block" : "none",
          backgroundColor: "#fff",
        }}
      >
        <Xp
          onClick={() => {
            setSeeEditCourse(false);
          }}
        >
          x
        </Xp>
        <h2>Editar curso</h2>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Editar curso" value="1" />
              <Tab label="Editar conteúdo" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div style={{ maxWidth: "10rem", margin: "auto" }}>
              <InputField
                value={titleToEdit}
                onChange={(event) => setTitleToEdit(event.target.value)}
                placeholder="Nome do Curso"
                type="text"
              />
              <InputField
                value={descriptionToEdit}
                onChange={(event) => setDescriptionToEdit(event.target.value)}
                placeholder="Descrição do curso"
                type="text"
              />
              <InputFieldNotRequired
                value={imgToEdit}
                onChange={(event) => setImgToEdit(event.target.value)}
                placeholder="Link da imagem do curso (opcional)"
                type="text"
              />
              <p
                style={{
                  display: "grid",
                  gap: "0.2rem",
                  margin: "0 0 3px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1rem",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <span>Cor do curso: {courseColor}</span>
                  <input
                    type="color"
                    value={colorToEdit}
                    onChange={(event) => setColorToEdit(event.target.value)}
                  />
                </div>
              </p>
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
                onClick={() => setSeeEditCourse(false)}
              >
                Cancelar
              </Button>
              <Button
                style={{
                  color: "#fff",
                  padding: "5px",
                  backgroundColor: "#118016",
                  minWidth: "fit-content",
                }}
                onClick={() => {
                  saveCourse(courseId);
                }}
              >
                Salvar edições
              </Button>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <span
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h3 style={{ marginBottom: "2rem" }}>Módulos</h3>
              <Button onClick={() => seeModules(courseId)}>Ver Módulos</Button>
            </span>
            {modules.map((module, index) => {
              return module ? (
                <div key={index}>
                  <span
                    style={{
                      margin: "0.5rem",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3>{module.moduleTitle}</h3>
                    <span
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button>Nova aula</Button>
                      <Button>Ver aulas</Button>
                      <Button
                        style={{
                          backgroundColor: "#aa1a1a",
                        }}
                        onClick={() => {
                          deleteModule(module._id);
                        }}
                      >
                        Excluir módulo
                      </Button>
                    </span>
                  </span>
                </div>
              ) : null;
            })}
            <h3 style={{ marginBottom: "2rem" }}>Adicionar um novo módulo</h3>
            <InputField
              value={newModule}
              onChange={(event) => setNewModule(event.target.value)}
              placeholder="Nome do novo módulo"
              type="text"
            />
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
                onClick={() => setSeeEditCourse(false)}
              >
                Cancelar
              </Button>
              <Button
                style={{
                  color: "#fff",
                  padding: "5px",
                  backgroundColor: "#118016",
                  minWidth: "fit-content",
                }}
                onClick={() => {
                  createNewModule(courseId);
                }}
              >
                Salvar módulo
              </Button>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </RouteDiv>
  );
}

export default ManageCourses;
