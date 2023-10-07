import React from "react";
import NewStudent from "./NewStudent";
import FindStudent from "./FindStudent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { primaryColor, transparentBg } from "../../Styles/Styles";
import { RouteSizeControlBox } from "../../Resources/Components/RouteBox";
import NewPost from "./NewPost";
import NewTutoring from "./NewTutoring";
import { BackToHomePage } from "../../Resources/UniversalComponents";
import NextTutoring from "./NextTutoring";

export function Adm() {
  const [value, setValue] = React.useState("0");
  const componentsToRender = [
    {
      title: "Marcar aula particular",
      value: "0",
      tooltip: "Adicione a um aluno específico uma aula que já foi dada.",
      component: <NextTutoring />,
    },
    {
      title: "Postar aula dada",
      value: "1",
      tooltip: "Adicione a um aluno específico uma aula que já foi dada.",
      component: <NewTutoring />,
    },
    {
      title: "Gerenciar alunos",
      value: "2",
      tooltip:
        "Edite informações de alunos cadastrados, como dados, permissões e senha, ou mesmo exclua um aluno se necessário.",
      component: <FindStudent />,
    },
    {
      title: "Novo aluno",
      value: "3",
      tooltip: "Cadastre um novo aluno.",
      component: <NewStudent />,
    },
    {
      title: "Novo Postagem",
      value: "4",
      tooltip:
        "Faça uma nova postagem que será vista por todos os alunos na página inicial.",
      component: <NewPost />,
    },
  ];

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <RouteSizeControlBox
      style={{
        maxWidth: "1200px",
      }}
    >
      <TabContext value={value}>
        <Box
          style={{
            backgroundColor: transparentBg(),
            display: "flex",
            borderRadius: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <TabList
            style={{
              backgroundColor: "#f0f0f0",
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
                    color: primaryColor(),
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
  );
}

export default Adm;
