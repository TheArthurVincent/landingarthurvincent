import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Modal,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { backDomain } from "../../../../Resources/UniversalComponents";
import { secondaryColor } from "../../../../Styles/Styles";
import { HOne } from "../../../../Resources/Components/RouteBox";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";
import { HThree } from "../../../MyClasses/MyClasses.Styled";

export function AllComments({ headers }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [responseText, setResponseText] = useState("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/nonansweredcomments`,
        { headers }
      );
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Erro ao buscar comentários", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleOpenModal = (comment) => {
    setSelectedComment(comment);
    console.log(comment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setResponseText("");
  };
  const deleteComment = async (id) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/comment/${id}`,
        { headers }
      );
      window.alert("Comentário excluído!");
      fetchComments();
    } catch (error) {
      console.log(error, "Erro ao comentar");
    }
  };

  const handleSubmitResponse = async () => {
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/commentreply/${selectedComment.id}`,
        { response: responseText, student: selectedComment },
        { headers }
      );
      console.log("foi", response);
      handleCloseModal();
      fetchComments();
    } catch (error) {
      console.error("Erro ao enviar resposta", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <HOne>Comentários Pendentes</HOne>
      {loading ? (
        <CircularProgress />
      ) : (
        comments.map((comment, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              marginBottom: 2,
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            <HThree>{comment.name}</HThree>
            <p
              style={{
                padding: "1rem",
              }}
              variant="body1"
            >
              {comment.comment}
            </p>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ArvinButton
                color="red"
                variant="contained"
                sx={{ marginTop: 1, background: secondaryColor }}
                onDoubleClick={() => deleteComment(comment.id)}
              >
                Clique duas vezes para rejeitar
              </ArvinButton>
              <ArvinButton
                variant="contained"
                sx={{ marginTop: 1, background: secondaryColor }}
                onClick={() => {
                  handleOpenModal(comment);
                  console.log(comment);
                }}
              >
                Responder
              </ArvinButton>
            </div>
          </Box>
        ))
      )}

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            background: "white",
            padding: 3,
            borderRadius: "8px",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Responder Comentário
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <ArvinButton onClick={handleCloseModal} sx={{ marginRight: 1 }}>
              Cancelar
            </ArvinButton>
            <ArvinButton variant="contained" onClick={handleSubmitResponse}>
              Enviar
            </ArvinButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default AllComments;
