import React, { useEffect, useState } from "react";
import {
  HOne,
  HTwo,
  RouteDiv,
} from "../../../../Resources/Components/RouteBox";
import axios from "axios";
import {
  BackToHomePage,
  backDomain,
} from "../../../../Resources/UniversalComponents";
import { CircularProgress, Button, TextField } from "@mui/material";
import {
  alwaysWhite,
  lightGreyColor,
  secondaryColor,
} from "../../../../Styles/Styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HTMLEditor from "../../../../Resources/Components/HTMLEditor";

export function ManageGroupClasses({ headers }) {
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
  const [newModuleTitle, setNewModuleTitle] = useState("group class");
  const [newCourseTitle, setNewCourseTitle] = useState("group class");
  const [newDescription, setNewDescription] = useState("");
  const [partner, setPartner] = useState("0");
  const [tabValue, setTabValue] = useState("1");

  const handleDescriptionChange = (htmlContent) => {
    setNewDescription(htmlContent);
  };

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
    <RouteDiv>
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
                <CircularProgress style={{ color: secondaryColor() }} />
              ) : (
                <div>
                  {coursesList.map((course, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "grid",
                          padding: "0.5rem",
                          justifyContent: "space-between",
                          border: "1px solid #000",
                          padding: "1rem",
                          margin: "1rem",
                          backgroundColor: lightGreyColor(),
                        }}
                      >
                        <h2>{course.classTitle}</h2>
                        <h3>Descrição:</h3>{" "}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: course.description,
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Link to={course.googleDriveLink}>Material</Link>
                          <Link to={course.videoUrl}>Vídeo</Link>
                          <Button onClick={() => openEditClass(course._id)}>
                            Editar
                          </Button>
                        </div>
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
                  <CircularProgress style={{ color: secondaryColor() }} />
                ) : (
                  <>
                    <input
                      placeholder="Class Title"
                      value={classTitle}
                      onChange={(event) => setClassTitle(event.target.value)}
                    />
                    <textarea
                      placeholder="Description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      style={{ width: "100%", height: "300px" }}
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
                <HTMLEditor onChange={handleDescriptionChange} />
                <Button onClick={() => postNewClass()}>Salvar</Button>
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </RouteDiv>
  );
}

export default ManageGroupClasses;
