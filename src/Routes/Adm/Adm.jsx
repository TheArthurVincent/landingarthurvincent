import React, { useState } from "react";
import NewStudent from "./NewStudent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { alwaysWhite, transparentWhite } from "../../Styles/Styles";
import {
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import NewPost from "./NewPost";
import NewTutoring from "./NewTutoring";
import { BackToHomePage, linkReset } from "../../Resources/UniversalComponents";
import NextTutoring from "./NextTutoring";
import TopBar from "../../Application/TopBar/TopBar";
import ManageCourses from "./ManageCourses";
import { Link } from "react-router-dom";
import { NextTutorings } from "./NextTutorings";
import AllClasses from "./AllClasses";

export function Adm() {
  const [value, setValue] = useState("0");

  const headers = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("authorization")}`,
    },
  };

  const componentsToRender = [
    {
      title: "Proximas aulas",
      value: "0",
      tooltip: "Próximas aulas.",
      component: <NextTutorings />,
    },
    {
      title: "Aulas particulares",
      value: "1",
      tooltip: "Marque uma aula particular.",
      component: (
        <div>
          <NextTutoring headers={headers} />
          <NewTutoring headers={headers} />
        </div>
      ),
    },
    {
      title: "Alunos",
      value: "2",
      tooltip:
        "Edite informações de alunos cadastrados, como dados, permissões e senha, ou mesmo exclua um aluno se necessário.",
      component: (
        <div>
          <NewStudent headers={headers} />
        </div>
      ),
    },
    // {
    //   title: "Cursos",
    //   value: "3",
    //   tooltip: "Adicione um novo curso.",
    //   component: (
    //     <div>
    //       <ManageCourses headers={headers} />
    //     </div>
    //   ),
    // },
    {
      title: "Postagens",
      value: "4",
      tooltip:
        "Faça uma nova postagem que será vista por todos os alunos na página inicial.",
      component: <NewPost headers={headers} />,
    },
    {
      title: "Aulas",
      value: "5",
      tooltip: "Todas as aulas.",
      component: <AllClasses />,
    },
    {
      title: "Links úteis",
      value: "6",
      tooltip:
        "Faça uma nova postagem que será vista por todos os alunos na página inicial.",
      component: (
        <RouteDiv>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <li>
              <Link to="https://my.nutror.com/cursos" target="_blank">
                Portais dos alunos
              </Link>
            </li>
            <li>
              <Link
                to="https://app.blasteronline.com/speechelo/"
                target="_blank"
              >
                Gerador de áudios
              </Link>
            </li>
            <li>
              <Link to="https://www.canva.com/" target="_blank">
                Canva
              </Link>
            </li>
            <li>
              <Link to="https://chat.openai.com/" target="_blank">
                GPT
              </Link>
            </li>
            <li>
              <Link to="https://www.linguee.com/" target="_blank">
                Linguee
              </Link>
            </li>
            <li>
              <Link
                to="https://imagekit.io/dashboard/media-library/L2Fzc2V0cy9pY29ucw"
                target="_blank"
              >
                Diretório de imagens
              </Link>
            </li>
            <li>
              <Link to="https://soundcloud.com/feed" target="_blank">
                Diretório de áudios
              </Link>
            </li>
            <li>
              <Link to="https://app.netlify.com/" target="_blank">
                Hospedagem
              </Link>
            </li>
            <li>
              <Link to="https://youglish.com/" target="_blank">
                Pronúncia
              </Link>
            </li>
            <li>
              <Link to="https://www.freesqldatabase.com/" target="_blank">
                MyFreeSQL
              </Link>
            </li>
            <li>
              <Link to="https://www.phpmyadmin.co/index.php" target="_blank">
                Gestão do banco de dados
              </Link>
            </li>
            <li>
              <Link to="https://github.com/" target="_blank">
                GitHub
              </Link>
            </li>
          </ul>
        </RouteDiv>
      ),
    },
  ];
  /*

*/
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <TopBar />
      <RouteSizeControlBox
        className="smooth"
        style={{
          maxWidth: "1000px",
        }}
      >
        <TabContext value={value}>
          <Box
            style={{
              display: "flex",
              borderRadius: "1rem",
              alignItems: "center",
              backgroundColor: alwaysWhite(),
              justifyContent: "space-between",
            }}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList
              style={{
                margin: "0.3rem",
                borderRadius: "1rem",
              }}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {componentsToRender.map((component, index) => {
                return (
                  <Tab
                    key={index + component.value}
                    style={{
                      fontWeight: 500,
                      // color: textPrimaryColorContrast(),
                    }}
                    label={component.title}
                    value={component.value}
                  />
                );
              })}
            </TabList>
            <BackToHomePage />
          </Box>
          {componentsToRender.map((component, index) => {
            return (
              <TabPanel
                style={{ padding: 0, margin: "1rem auto", maxWidth: "1000px" }}
                key={index + component.value}
                value={component.value}
              >
                {component.component}
              </TabPanel>
            );
          })}
        </TabContext>
      </RouteSizeControlBox>
    </>
  );
}

export default Adm;
