import React from "react";
import NewStudent from "./NewStudent";
import FindStudent from "./FindStudent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { transparentBg } from "../../Styles/Styles";
import { RouteSizeControlBox } from "../../Resources/Components/RouteBox";
import NewPost from "./NewPost";
import NewTutoring from "./NewTutoring";
import { Navigate } from "react-router-dom";

export function Adm() {
  const [value, setValue] = React.useState("1");
  const componentsToRender = [
    {
      title: "Nova aula",
      value: "1",
      component: <NewTutoring />,
    },
    {
      title: "Gerenciar alunos",
      value: "2",
      component: <FindStudent />,
    },
    {
      title: "Novo aluno",
      value: "3",
      component: <NewStudent />,
    },
    {
      title: "Novo Postagem",
      value: "4",
      component: <NewPost />,
    },
    {
      title: "Voltar para página inicial",
      value: "5",
      component: (
        <div>
          <Navigate to="/homepage" />
        </div>
      ),
    },
  ];

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <RouteSizeControlBox>
      <TabContext value={value}>
        <Box
          style={{
            padding: "0.5rem",
            backgroundColor: transparentBg(),
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
                  key={index}
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
              style={{ padding: 0 }}
              key={index}
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
