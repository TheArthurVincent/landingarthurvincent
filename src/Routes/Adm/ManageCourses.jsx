import React, { useEffect, useState } from "react";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import {
  BackToHomePage,
  backDomain,
} from "../../Resources/UniversalComponents";
import { CircularProgress, Button, TextField } from "@mui/material";
import { alwaysWhite, lightGreyColor } from "../../Styles/Styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export function ManageModules({ headers }) {
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [classTitle, setClassTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [classCourse, setClassCourse] = useState("");
  const [ID, setID] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newGoogleDriveLink, setNewGoogleDriveLink] = useState("");
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [partner, setPartner] = useState("");
  const [tabValue, setTabValue] = useState("1");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/allcourseobjects`,
        { headers }
      );
      setCoursesList(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao encontrar cursos", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteClass = async (classId) => {
    try {
      await axios.delete(`${backDomain}/api/v1/courseclass/${classId}`, {
        headers,
      });
      getCourses();
      closeModal();
    } catch (error) {
      console.log("Erro ao excluir aula", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const openEditClass = async (classId) => {
    setID(classId);
    setModalVisible(true);
    setLoadingModal(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/courseclass/${classId}`,
        { headers }
      );
      setClassTitle(response.data.classTitle);
      setDescription(response.data.description);
      setVideoUrl(response.data.videoUrl);
      setGoogleDriveLink(response.data.googleDriveLink);
      setModuleTitle(response.data.moduleTitle);
      setClassCourse(response.data.courseTitle);
      setLoadingModal(false);
    } catch (error) {
      console.log("Erro ao editar aula", error);
    }
  };

  const editClass = async (classId) => {
    setLoadingModal(true);
    try {
      await axios.put(
        `${backDomain}/api/v1/courseclass/${classId}`,
        {
          classTitle,
          description,
          videoUrl,
          googleDriveLink,
          courseTitle: classCourse,
          moduleTitle,
        },
        { headers }
      );
      getCourses();
      setModalVisible(false);
    } catch (error) {
      console.log("Erro ao editar aula", error);
      getCourses();
      setModalVisible(false);
    }
  };
  const postNewClass = async () => {
    try {
      await axios.post(
        `${backDomain}/api/v1/courseclass`,
        {
          classTitle: newClassName,
          videoUrl: newVideoUrl,
          googleDriveLink: newGoogleDriveLink,
          moduleTitle: newModuleTitle,
          courseTitle: newCourseTitle,
          description: newDescription,
          partner: partner,
        },
        { headers }
      );

      setNewClassName("");
      setNewVideoUrl("");
      setNewGoogleDriveLink("");
      setNewModuleTitle("");
      setNewCourseTitle("");
      setNewDescription("");
      setPartner("");
      getCourses();
    } catch (error) {
      console.error("Erro ao postar nova aula:", error);
    }
  };

  return (
    <RouteDiv style={{ maxWidth: "50rem", margin: "auto" }}>
      <HOne>Gerenciar Cursos</HOne>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Ver" value="1" />
              <Tab label="Postar" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div id="2">
              <HTwo>Ver aulas</HTwo>
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button onClick={() => getCourses()}>
                  <i className="fa fa-refresh" aria-hidden="true" />
                </Button>
                <BackToHomePage />
              </span>
              {loading ? (
                <CircularProgress />
              ) : (
                <div>
                  {coursesList.map((course) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          margin: "2rem 0.5rem",
                          padding: "0.5rem",
                          justifyContent: "space-between",
                          backgroundColor: lightGreyColor(),
                        }}
                      >
                        <span>
                          <h3>{course.classTitle}</h3>
                          <p>
                            <strong>Curso:</strong> {course.courseTitle}
                          </p>
                          <p>
                            <strong>Módulo:</strong> {course.moduleTitle}
                          </p>
                          <p>
                            <strong>Descrição:</strong> {course.description}
                          </p>
                          <p>
                            <strong>Plataforma:</strong>
                            {course.partner == 1
                              ? "Talking Business"
                              : "Live Classes"}
                          </p>
                          <p>
                            <Link to={course.googleDriveLink}>Material</Link>
                          </p>
                          <p>
                            <Link to={course.videoUrl}>Vídeo</Link>
                          </p>
                        </span>
                        <Button onClick={() => openEditClass(course._id)}>
                          Editar
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
              <div
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1000,
                  backgroundColor: "white",
                  padding: "1rem",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  position: "fixed",
                  display: modalVisible ? "grid" : "none",
                  gap: "0.5rem",
                  textAlign: "center",
                }}
              >
                <h2>Editar</h2>
                {loadingModal ? (
                  <CircularProgress />
                ) : (
                  <>
                    <input
                      placeholder="Class Title"
                      value={classTitle}
                      onChange={(event) => setClassTitle(event.target.value)}
                    />
                    <input
                      placeholder="Description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <input
                      placeholder="Video URL"
                      value={videoUrl}
                      onChange={(event) => setVideoUrl(event.target.value)}
                    />
                    <input
                      placeholder="Google Drive Link"
                      value={googleDriveLink}
                      onChange={(event) =>
                        setGoogleDriveLink(event.target.value)
                      }
                    />
                    <input
                      placeholder="Course"
                      value={classCourse}
                      onChange={(event) => setClassCourse(event.target.value)}
                    />
                    <input
                      placeholder="Module"
                      value={moduleTitle}
                      onChange={(event) => setModuleTitle(event.target.value)}
                    />
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Button
                    style={{ backgroundColor: "red", color: alwaysWhite() }}
                    onClick={() => deleteClass(ID)}
                  >
                    Excluir
                  </Button>
                  <Button onClick={() => closeModal()}>Cancelar</Button>
                  <Button onClick={() => editClass(ID)}>Salvar</Button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            {" "}
            <div id="1">
              {" "}
              <HTwo>Postar aula em um curso</HTwo>
              <div
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  maxWidth: "20rem",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Nome da nova aula"
                  variant="outlined"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="URL do Vídeo da nova aula"
                  variant="outlined"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Pasta da nova aula"
                  variant="outlined"
                  value={newGoogleDriveLink}
                  onChange={(e) => setNewGoogleDriveLink(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Módulo da nova aula"
                  variant="outlined"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Curso da nova aula"
                  variant="outlined"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Plataforma"
                  value={partner}
                  variant="outlined"
                  onChange={(e) => setPartner(e.target.value)}
                />
                <textarea
                  placeholder="Descrição da nova aula"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  style={{ width: "100%", height: "200px" }}
                />
                <Button onClick={() => postNewClass()}>Salvar</Button>
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </RouteDiv>
  );
}

export default ManageModules;
