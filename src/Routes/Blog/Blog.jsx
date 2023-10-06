import React, { useCallback, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  RouteDiv,
  RouteSizeControlBox,
  BlogPostTitle,
  HTwo,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import {
  formatDate,
  backDomain,
  IFrameVideo,
  getVideoEmbedUrl,
  ImgBlog,
  Xp,
} from "../../Resources/UniversalComponents";
import {
  primaryColor,
  secondaryColor,
  secondaryContrast,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import { Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

export function Blog() {
  const { UniversalTexts } = useUserContext();
  const [newTitle, setNewTitle] = useState("");
  const [_id, setID] = useState("");
  const [_StudentId, setStudentId] = useState("");
  const [newText, setNewText] = useState("");
  const [newUrlVideo, setNewUrlVideo] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [seeConfirmDelete, setSeeConfirmDelete] = useState(false);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState("");
  const [loading, setLoading] = useState(true);
  const [isNextClassVisible, setIsNextClassVisible] = useState(false);

  const [nextTutoring, setNextTutoring] = useState({
    nextTutoring: {
      studentID: "...",
      date: "__/__/__",
      time: "__:__",
      meetingUrl: "/",
    },
  });

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
    console.log(Date());
  };

  const handleConfirmDelete = () => {
    setSeeConfirmDelete(!seeConfirmDelete);
  };

  const [posts, setPosts] = useState([
    {
      text: (
        <>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <Skeleton variant="rectangular" width={1650} height={100} />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Skeleton variant="rectangular" width={1650} height={500} />
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Skeleton variant="rectangular" width={500} height={60} />
              <Skeleton variant="rectangular" width={500} height={60} />
              <Skeleton variant="rectangular" width={650} height={60} />
            </div>
          </div>
        </>
      ),
    },
  ]);

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setName(getLoggedUser.name);
    setStudentId(getLoggedUser.id || _StudentId);
    setPermissions(getLoggedUser.permissions);
  }, []);

  const handleSeeIsNextClassVisibleModal = () => {
    const fetchNextClass = async () => {
      try {
        const response = await axios.get(
          `${backDomain}/api/v1/nexttutoring/${_StudentId}`
        );

        setLoading(false);
        setNextTutoring(response.data);
      } catch (error) {
        alert("Erro ao importar próximas aulas");
      }
    };

    fetchNextClass();
    setIsNextClassVisible(!isNextClassVisible);
  };

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
      window.location.href = "/";
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
      window.location.href = "/";
    } catch (error) {
      alert("Erro ao editar post");
      console.error(error);
    }
  };

  return (
    <RouteSizeControlBox>
      <RouteDiv>
        {/* <NextClassButton /> */}
        <div
          style={{
            margin: "1.2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <HTwo>
            {UniversalTexts.hello}
            {name}
          </HTwo>
          <Button
            style={{
              color: primaryColor(),
            }}
            onClick={handleSeeIsNextClassVisibleModal}
          >
            {UniversalTexts.nextClass}
          </Button>
        </div>
        <Link
          style={{
            display: isNextClassVisible ? "block" : "none",
            marginRight: "1.2rem",
            marginLeft: "auto",
            maxWidth: "fit-content",
            backgroundColor: primaryColor(),
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "5px",
          }}
          target="_blank"
          to={nextTutoring.nextTutoring.meetingUrl}
        >
          {nextTutoring.nextTutoring.date} |{nextTutoring.nextTutoring.time}
        </Link>

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
                <span
                  style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  <span>{post.title} </span>
                  <Button
                    style={{
                      display: permissions == "superadmin" ? "flex" : "none",
                      alignItems: "center",
                      backgroundColor: secondaryColor(),
                      color: secondaryContrast(),
                      fontSize: "0.7rem",
                      maxHeight: "1.2rem",
                      maxWidth: "1.2rem",
                    }}
                    onClick={() => seeEdition(post._id)}
                  >
                    Editar
                  </Button>
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
                color: "#fff",
                backgroundColor: "#ba3c3c",
              }}
              onClick={() => handleConfirmDelete()}
            >
              {UniversalTexts.delete}
            </Button>
            <Button
              style={{
                color: "#fff",

                backgroundColor: "#194169",
              }}
              onClick={() => handleSeeModal()}
            >
              {UniversalTexts.cancel}
            </Button>
            <Button
              style={{
                color: "#fff",

                backgroundColor: "#138017",
              }}
              onClick={() => editPost(_id)}
            >
              {UniversalTexts.save}
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
                fontWeight: "500",
                // color: "#fff",
              }}
            >
              {UniversalTexts.deleteConfirm}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{
                  color: "#fff",

                  backgroundColor: "#194169",
                }}
                onClick={() => handleConfirmDelete()}
              >
                {UniversalTexts.no}
              </Button>
              <Button
                style={{
                  color: "#fff",

                  backgroundColor: "#ba3c3c",
                }}
                onClick={() => deletePost(_id)}
              >
                {UniversalTexts.yes}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RouteSizeControlBox>
  );
}

export default Blog;
