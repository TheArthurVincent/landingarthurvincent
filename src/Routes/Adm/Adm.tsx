import React, { useState } from "react";
import NewStudent from "./AdmComponents/FindStudentAssets/NewStudent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { alwaysWhite } from "../../Styles/Styles";
import { RouteSizeControlBox } from "../../Resources/Components/RouteBox";
import NewPost from "./AdmComponents/PostsManagement/NewPost";
import NewTutoring from "./AdmComponents/ClassesManagement/NewTutoring";

import AllClasses from "./AdmComponents/ClassesManagement/AllClasses";
import { UsefulLinks } from "./AdmComponents/LinksManagement/UsefulLinks";
import { ManageGroupClasses } from "./AdmComponents/GroupClassManagement/ManageCourses";
import Helmets from "../../Resources/Helmets";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import Contract from "./AdmComponents/Contract/Contract";

export function Adm({ headers }: HeadersProps) {
  const [value, setValue] = useState("1");

  const componentsToRender = [
    {
      title: "Gestão de Aulas",
      value: "1",
      tooltip: "Marque uma aula particular.",
      component: (
        <div>
          <NewTutoring headers={headers} />
          <AllClasses headers={headers} />
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
    {
      title: "Aulas em grupo",
      value: "3",
      tooltip: "Aulas em grupo",
      component: <ManageGroupClasses headers={headers} />,
    },
    {
      title: "Postagens",
      value: "4",
      tooltip:
        "Faça uma nova postagem que será vista por todos os alunos na página inicial.",
      component: <NewPost headers={headers} />,
    },
    {
      title: "Gerar contrato",
      value: "6",
      tooltip: "Geração do contrato de um aluno específico.",
      component: <Contract headers={headers} />,
    },
    {
      title: "Links úteis",
      value: "7",
      tooltip:
        "Faça uma nova postagem que será vista por todos os alunos na página inicial.",
      component: <UsefulLinks />,
    },
  ];

  const handleChange = (event: any, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <RouteSizeControlBox
        style={{
          backgroundColor: "#f9f9f9",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          maxWidth: "900px",
        }}
        className="smooth"
      >
        <Helmets text="Adm" />
        <TabContext value={value}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: alwaysWhite(),
              justifyContent: "space-between",
            }}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList
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
                    }}
                    label={component.title}
                    value={component.value}
                  />
                );
              })}
            </TabList>
          </Box>
          {componentsToRender.map((component, index) => {
            return (
              <TabPanel
                style={{ padding: 0, margin: "1rem auto" }}
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
