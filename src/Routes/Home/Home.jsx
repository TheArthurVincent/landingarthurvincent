import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  RouteDiv,
  HOne,
  RouteSizeControlBox,
  BlogPostTitle,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import {
  Button,
  formatDate,
  backDomain,
  IFrameVideo,
  getVideoEmbedUrl,
  ImgBlog,
  Spin,
  Xp,
} from "../../Resources/UniversalComponents";
import {
  primaryColor,
  secondaryContrast,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import DeleteIcon from "@mui/icons-material/Delete";

export function Home({ name, permissions }) {
  const { UniversalTexts } = useUserContext();
  const [newTitle, setNewTitle] = useState("");
  const [id, setID] = useState("");
  const [newText, setNewText] = useState("");
  const [newUrlVideo, setNewUrlVideo] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [seeConfirmDelete, setSeeConfirmDelete] = useState(false);

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleConfirmDelete = () => {
    setSeeConfirmDelete(!seeConfirmDelete);
  };

  const [posts, setPosts] = useState([
    {
      text: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Quando houver posts, eles aparecerão aqui...</p>
          <Spin>
            <img
              style={{ maxWidth: "4rem" }}
              src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/head-white.png?updatedAt=1687369608637"
              alt="loading"
            />
          </Spin>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${backDomain}/api/v1/blogposts`);

        setTimeout(() => {
          setPosts(response.data.listOfPosts || posts);
        }, 500);
      } catch (error) {
        alert("Erro ao importar posts");
      }
    }

    fetchData();
  }, []);

  const seeEdition = async (id) => {
    handleSeeModal();
    try {
      const response = await axios.get(`${backDomain}/api/v1/blogpost/${id}`);
      setID(response.data.formattedBlogPost.id);
      setNewTitle(response.data.formattedBlogPost.title);
      setNewUrlVideo(response.data.formattedBlogPost.videoUrl);
      setNewText(response.data.formattedBlogPost.text);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const editPost = async (id) => {
    try {
      const editedPost = {
        title: newTitle,
        videoUrl: newUrlVideo,
        text: newText,
      };
      const response = await axios.put(
        `${backDomain}/api/v1/blogposts/${id}`,
        editedPost
      );
      window.location.href = "/homepage";
    } catch (error) {
      alert("Erro ao editar post");
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/blogposts/${id}`
      );
      alert("Post definitivamente excluído");
      window.location.href = "/homepage";
    } catch (error) {
      alert("Erro ao editar post");
      console.error(error);
    }
  };

  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <HOne style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            {UniversalTexts.hello}
            {name}
          </span>
          <span style={{ fontWeight: 400 }}>
            Próxima aula: SEP 16, 2023, 06:03 PM
          </span>
        </HOne>

        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              borderBottom: `solid 1px ${secondaryContrast()} `,
              paddingBottom: "5rem",
              marginBottom: "1rem",
            }}
          >
            {post.title && (
              <BlogPostTitle>
                <span style={{ display: "flex", gap: "1rem" }}>
                  <span>{post.title} </span>
                  <button
                    style={{
                      cursor: "pointer",
                      display: permissions == "superadmin" ? "block" : "none",
                    }}
                    onClick={() => seeEdition(post._id)}
                  >
                    Editar
                  </button>
                </span>
                {post.createdAt && (
                  <span
                    style={{
                      backgroundColor: textPrimaryColorContrast(),
                      color: primaryColor(),
                      padding: "0.2rem 0.6rem",
                    }}
                  >
                    {formatDate(post.createdAt)}
                  </span>
                )}{" "}
              </BlogPostTitle>
            )}{" "}
            {post.img && <ImgBlog src={post.img} alt="" />}{" "}
            {post.videoUrl && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <IFrameVideo src={getVideoEmbedUrl(post.videoUrl)} />{" "}
              </div>
            )}
            <div
              style={{
                margin: "1rem",
                fontSize: "1.2rem",
                display: "block",
              }}
            >
              {post.text}
            </div>
          </div>
        ))}
      </RouteDiv>
      <div
        className="modal"
        style={{
          display: isVisible ? "block" : "none",
          zIndex: 30,
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "10000px",
          height: "10000px",
          top: 0,
          left: 0,
        }}
      >
        <div
          className="modal"
          style={{
            position: "fixed",
            display: isVisible ? "block" : "none",
            zIndex: 100,
            backgroundColor: "#fff",
            padding: "1rem",
            width: "29rem",
            height: "30rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Xp onClick={() => handleSeeModal()}>X</Xp>
          <h2
            style={{
              backgroundColor: "#111",
              padding: "0.5rem",
              color: "#fff",
            }}
          >
            Editar Postagem
          </h2>
          <div style={{ display: "grid", gap: "2px" }}>
            <input
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              id="title"
              placeholder="Title"
              type="text"
              style={{
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0.4rem",
                marginBottom: "0.3rem",
                fontSize: "1.1rem",
                fontWeight: 500,
                backgroundColor: "white",
                width: "95%",
                border: "#555 1px solid",
              }}
            />
            <input
              value={newUrlVideo}
              onChange={(event) => setNewUrlVideo(event.target.value)}
              id="VideoUrl"
              placeholder="VideoUrl (Youtube/Vimeo)"
              type="text"
              style={{
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0.4rem",
                marginBottom: "0.3rem",
                fontSize: "1.1rem",
                fontWeight: 500,
                backgroundColor: "white",
                width: "95%",
                border: "#555 1px solid",
              }}
            />
            <textarea
              style={{
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0.4rem",
                marginBottom: "0.3rem",
                fontSize: "1.1rem",
                fontWeight: 500,
                backgroundColor: "white",
                width: "95%",
                border: "#555 1px solid",
                minHeight: "10rem",
              }}
              value={newText}
              onChange={(event) => setNewText(event.target.value)}
              id="Texto"
              placeholder="Texto"
              type="text"
              cols="20"
              rows="10"
              required
            />
          </div>{" "}
          <div
            style={{
              marginTop: "2rem",
              display: !seeConfirmDelete ? "flex" : "none",
              justifyContent: "space-evenly",
              gap: "0.5rem",
            }}
          >
            <Button
              style={{
                backgroundColor: "#ba3c3c",
              }}
              onClick={() => handleConfirmDelete()}
            >
              Excluir
            </Button>
            <Button
              style={{ backgroundColor: "#194169" }}
              onClick={() => handleSeeModal()}
            >
              Cancelar
            </Button>
            <Button
              style={{ backgroundColor: "#138017" }}
              onClick={() => editPost(id)}
            >
              Salvar
            </Button>
          </div>
          <div
            style={{
              maxWidth: "22rem",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              display: seeConfirmDelete ? "grid" : "none",
            }}
          >
            <p
              style={{
                color: "#ba3c3c",
                margin: "0.5rem 0",
                padding: "0.5rem",
                fontWeight:"500"
                // color: "#fff",
              }}
            >
              Excluir post? (Esta ação nao pode ser desfeita)
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{ backgroundColor: "#194169" }}
                onClick={() => handleConfirmDelete()}
              >
                Não!!
              </Button>
              <Button
                style={{ backgroundColor: "#ba3c3c" }}
                onClick={() => deletePost(id)}
              >
                Sim...
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RouteSizeControlBox>
  );
}

export default Home;
