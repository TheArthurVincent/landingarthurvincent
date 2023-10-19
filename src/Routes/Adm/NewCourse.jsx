import React, { useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import {
  InputField,
  Button,
  backDomain,
  InputFieldNotRequired,
} from "../../Resources/UniversalComponents";
import { FormList } from "./Adm.Styled";

export function NewCourse() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [courseColor, setCourseColor] = useState("");

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
  return (
    <RouteDiv>
      <HOne>Novo Curso</HOne>
      <form style={{ display: "grid", gap: "1rem" }} onSubmit={handleSubmit}>
        <FormList>
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
        </FormList>

        <Button style={{ marginLeft: "auto" }} type="submit">
          Criar
        </Button>
      </form>
    </RouteDiv>
  );
}

export default NewCourse;
