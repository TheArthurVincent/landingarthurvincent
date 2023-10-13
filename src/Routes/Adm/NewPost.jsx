import React, { useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import { Button, backDomain } from "../../Resources/UniversalComponents";

export function NewPost() {
  const [newTitle, setNewTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newText, setNewText] = useState("");

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
