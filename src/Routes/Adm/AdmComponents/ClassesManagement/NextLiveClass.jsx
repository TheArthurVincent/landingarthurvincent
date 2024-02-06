import React, { useState } from "react";
import { HOne, RouteDiv } from "../../../../Resources/Components/RouteBox";
import axios from "axios";
import { Button, backDomain } from "../../../../Resources/UniversalComponents";
import { CircularProgress, Input } from "@mui/material";
import { alwaysBlack } from "../../../../Styles/Styles";
export function NextLiveClass({ headers }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backDomain}/api/v1/liveclass`, {
        headers,
        title,
        time,
        date,
        meetingUrl: url,
      });
      console.error("Success");

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao listar aulas");
      setLoading(false);
    }
    setTime("");
    setDate("");
    setTitle("");
    setUrl("");
  };
  return (
    <RouteDiv>
      <HOne>Marcar aula ao vivo</HOne>
      {loading ? (
        <CircularProgress />
      ) : (
        <form
          style={{
            display: "grid",
            gap: "2rem",
            padding: "1rem",
            maxWidth: "700px",
            margin: "2rem auto",
            display: "flex",
            justifyContent: "space-around",
            gap: "2rem",
          }}
          onSubmit={handleSubmit}
        >
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Título"
            type="text"
            style={{
              color: alwaysBlack(),
            }}
            required
          />
          <Input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Link da aula"
            type="text"
            style={{
              color: alwaysBlack(),
            }}
            required
          />
          <Input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            style={{
              color: alwaysBlack(),
            }}
            required
            type="date"
          />
          <Input
            value={time}
            onChange={(event) => setTime(event.target.value)}
            style={{
              color: alwaysBlack(),
            }}
            type="time"
            required
          />
          <Button type="submit">Marcar</Button>
        </form>
      )}
    </RouteDiv>
  );
}

export default NextLiveClass;
