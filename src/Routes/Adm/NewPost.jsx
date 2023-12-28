import React, { useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import { Button, backDomain } from "../../Resources/UniversalComponents";
import { Select } from "@mui/material";

export function NewPost({ headers }) {
  const [newTitle, setNewTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newText, setNewText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Nenhum");

  const handleChooseOption = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    let newPost = {
      title: newTitle,
      videoUrl: newVideoUrl,
      text: newText,
    };
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/blogposts/`,
        newPost
      );
      alert("Post criado com sucesso!");
      window.location.href = "/";
    } catch (error) {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <RouteDiv>
      <HOne>Nova Postagem</HOne>
      <form style={{ display: "grid", gap: "1rem" }} onSubmit={handleSubmit}>
        <input
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0.5rem",
            margin: "0",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
          type="text"
          placeholder="Novo Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />{" "}
        <p>Quer adicionar uma imagem/vídeo?</p>
        <select
          name="Selecione se quer postar uma imagem ou um vídeo"
          onChange={handleChooseOption}
          value={selectedOption}
          id=""
        >
          <option value="Vídeo">Vídeo</option>
          <option value="Imagem">Imagem</option>
          <option value="Nenhum">Nenhum</option>
        </select>
        <input
          style={{
            display: selectedOption == "Imagem" ? "block" : "none",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0.5rem",
            margin: "0",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
          type="text"
          placeholder="Nova Imagem (OPCIONAL)"
          value={newImg}
          onChange={(e) => setNewImg(e.target.value)}
        />
        <input
          style={{
            display: selectedOption == "Vídeo" ? "block" : "none",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0.5rem",
            margin: "0",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
          type="text"
          placeholder="Novo Vídeo do YouTube/Vimeo (OPCIONAL)"
          value={newVideoUrl}
          onChange={(e) => setNewVideoUrl(e.target.value)}
        />
        <textarea
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0.5rem",
            margin: "0",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
          placeholder="Texto"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          name="Text"
          id=""
          cols="30"
          rows="10"
          required
        ></textarea>
        <Button style={{ marginLeft: "auto" }} type="submit">
          Criar
        </Button>
      </form>
    </RouteDiv>
  );
}

export default NewPost;
