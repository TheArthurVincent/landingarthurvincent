import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  BlogRouteSizeControlBox,
  BlogPostTitle,
  HTwo,
  BackgroundClickBlog,
  HOne,
  SpanIcon,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import {
  formatDate,
  backDomain,
  getVideoEmbedUrl,
  ImgBlog,
  Xp,
  IFrameVideoClass,
  UniversalButtonsDivFlex,
} from "../../Resources/UniversalComponents";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  secondaryColor,
  textSecondaryColorContrast,
} from "../../Styles/Styles";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { DivModal, DivPost, InternDivModal, SpanDisapear } from "./Blog.Styled";
import LevelCard from "./BlogComponents/LevelCard";

export function Blog({ headers }) {
  const { UniversalTexts } = useUserContext();
  const [newTitle, setNewTitle] = useState("");
  const [_id, setID] = useState("");
  const [_StudentId, setStudentId] = useState("");
  const [newText, setNewText] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newUrlVideo, setNewUrlVideo] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [seeConfirmDelete, setSeeConfirmDelete] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [permissions, setPermissions] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([
    {
      title: <CircularProgress style={{ color: secondaryColor() }} />,
    },
  ]);

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
    setSeeConfirmDelete(false);
  };
  const handleConfirmDelete = () => {
    setSeeConfirmDelete(!seeConfirmDelete);
  };

  const seeEdition = async (id) => {
    handleSeeModal();
    try {
      const response = await axios.get(`${backDomain}/api/v1/blogpost/${id}`, {
        headers,
      });
      setID(response.data.formattedBlogPost.id);
      setNewTitle(response.data.formattedBlogPost.title);
      setNewUrlVideo(response.data.formattedBlogPost.videoUrl);
      setNewText(response.data.formattedBlogPost.text);
      setNewImg(response.data.formattedBlogPost.img);
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
        img: newImg,
      };
      const response = await axios.put(
        `${backDomain}/api/v1/blogposts/${id}`,
        editedPost,
        { headers }
      );
      fetchData();
      handleSeeModal();
    } catch (error) {
      alert("Erro ao editar post");
      console.error(error);
      fetchData();
      handleSeeModal();
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/blogposts/${id}`,
        { headers }
      );
      alert("Post definitivamente excluído");
      handleSeeModal();
      fetchData();
    } catch (error) {
      alert("Erro ao editar post");
      console.error(error);
      handleSeeModal();
      fetchData();
    }
  };

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/blogposts`, {
        headers,
      });

      setTimeout(() => {
        setPosts(response.data.listOfPosts || posts);
        setLoading(false);
      }, 300);
    } catch (error) {
      alert(error, "Erro ao importar posts, faça login novamente");
      window.location.assign("/login");
      setLoading(false);
    }
  }

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    fetchData();
    setName(getLoggedUser.name);
    setStudentId(getLoggedUser.id || _StudentId);
    setPermissions(getLoggedUser.permissions);
    setGoogleDriveLink(getLoggedUser.googleDriveLink);
    setLastName(getLoggedUser.lastname);
    setPicture(getLoggedUser.picture);
  }, []);

  return (
    <BlogRouteSizeControlBox className="smooth">
      <RouteDiv>
        <div
          style={{
            margin: "1rem 0.5rem 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "1rem",
              gap: "1rem",
            }}
          >
            <HTwo
              style={{
                margin: 0,
              }}
            >
              {UniversalTexts.hello}
              {name}!
            </HTwo>

            <div
              style={{
                display: "flex",
              }}
            >
              {[
                {
                  link: "https://ankiweb.net/decks",
                  title: (
                    <i
                      style={{ transform: "rotate(-25deg)" }}
                      className="fa fa-star-o"
                      aria-hidden="true"
                    />
                  ),
                  tooltip: "Anki",
                  color: "#01BCFF",
                },
                {
                  link: googleDriveLink,
                  title: <i className="fa fa-folder" aria-hidden="true" />,
                  tooltip: UniversalTexts.personalFolder,
                  color: "brown",
                },
                {
                  link: "https://wa.me/5511915857807",
                  title: <i className="fa fa-whatsapp" aria-hidden="true" />,
                  tooltip: UniversalTexts.talkToTheTeacher,
                  color: "green",
                },
              ].map((item, index) => {
                return (
                  <Link
                    key={index}
                    style={{
                      marginRight: "0.5rem",
                      padding: "0.3rem",
                      fontSize: "1.5rem",
                      height: "1.5rem",
                      textAlign: "center",
                      color: item.color,
                      gap: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                    target="_blank"
                    to={item.link}
                  >
                    <SpanIcon>
                      <span
                        style={{
                          display: "block",
                          color: item.color,
                          fontSize: "1.4rem",
                        }}
                      >
                        {item.title}
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        {item.tooltip}
                      </span>
                    </SpanIcon>
                  </Link>
                );
              })}
            </div>
          </div>
          {/* {!isNextClassVisible ? ( */}
          <Link
            style={{
              backgroundColor: secondaryColor(),
              color: textSecondaryColorContrast(),
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
            to="/my-calendar"
          >
            <i className="fa fa-calendar" aria-hidden="true" />
            <SpanDisapear> {UniversalTexts.calendar}</SpanDisapear>
          </Link>
        </div>
        <HOne>{UniversalTexts.mural}</HOne>
        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              border: `solid 1px ${lightGreyColor()} `,
              boxShadow: "1px 1px 5px 1px #ccc",
              paddingBottom: "5rem",
              marginBottom: "1rem",
            }}
          >
            {post.title && (
              <BlogPostTitle>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  {!loading && (
                    <button
                      className="button"
                      style={{
                        display: permissions == "superadmin" ? "grid" : "none",
                      }}
                      onClick={() => seeEdition(post._id)}
                    >
                      <i className="fa fa-edit" aria-hidden="true" />
                    </button>
                  )}
                  <h2> {post.title}</h2>
                </span>
                {post.createdAt && (
                  <SpanDisapear>{formatDate(post.createdAt)}</SpanDisapear>
                )}
              </BlogPostTitle>
            )}
            <DivPost>
              <>
                {post.videoUrl ? (
                  <IFrameVideoClass src={getVideoEmbedUrl(post.videoUrl)} />
                ) : post.img ? (
                  <ImgBlog src={post.img} alt="logo" />
                ) : null}
              </>
              <div
                style={{
                  margin: "1rem",
                  fontSize: "1.1rem",
                  display: "block",
                  padding: "1rem",
                  backgroundColor: alwaysWhite(),
                  color: alwaysBlack(),
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: post.text }} />
              </div>
            </DivPost>
          </div>
        ))}
      </RouteDiv>

      <LevelCard
        name={name}
        headers={headers}
        _StudentId={_StudentId}
        picture={picture}
        lastName={lastName}
      />
      <DivModal
        className="modal"
        style={{
          display: isVisible ? "block" : "none",
        }}
      >
        <Xp onClick={() => handleSeeModal()}>X</Xp>
        <h2>{UniversalTexts.editPost}</h2>
        <InternDivModal>
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            id="title"
            placeholder="Title"
            type="text"
            className="inputs-style"
          />
          <input
            className="inputs-style"
            value={newUrlVideo}
            onChange={(event) => setNewUrlVideo(event.target.value)}
            id="VideoUrl"
            placeholder="VideoUrl (Youtube/Vimeo)"
            type="text"
          />
          <input
            value={newImg}
            onChange={(event) => setNewImg(event.target.value)}
            id="VideoUrl"
            placeholder="Imagem URL"
            type="text"
            className="inputs-style"
          />
          <textarea
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
            id="Texto"
            placeholder="Texto"
            type="text"
            cols="20"
            rows="10"
            required
            className="inputs-style"
          />
        </InternDivModal>
        <UniversalButtonsDivFlex
          style={{
            display: !seeConfirmDelete ? "flex" : "none",
          }}
        >
          <Button
            style={{
              color: alwaysWhite(),
              backgroundColor: "#ba3c3c",
            }}
            onClick={() => handleConfirmDelete()}
          >
            {UniversalTexts.delete}
          </Button>
          <Button
            style={{
              color: alwaysWhite(),
              backgroundColor: "#194169",
            }}
            onClick={() => handleSeeModal()}
          >
            {UniversalTexts.cancel}
          </Button>
          <Button
            style={{
              color: alwaysWhite(),
              backgroundColor: "#138017",
            }}
            onClick={() => editPost(_id)}
          >
            {UniversalTexts.save}
          </Button>
        </UniversalButtonsDivFlex>
        <div
          style={{
            textAlign: "center",
            margin: "0 auto",
            display: seeConfirmDelete ? "grid" : "none",
          }}
        >
          <p
            style={{
              color: "#ba3c3c",
              paddingTop: "1rem",
              fontWeight: 700,
            }}
          >
            {UniversalTexts.deleteConfirm}
          </p>
          <UniversalButtonsDivFlex>
            <Button
              style={{
                color: alwaysWhite(),
                backgroundColor: "#194169",
              }}
              onClick={() => handleConfirmDelete()}
            >
              {UniversalTexts.no}
            </Button>
            <Button
              style={{
                color: alwaysWhite(),
                backgroundColor: "#ba3c3c",
              }}
              onClick={() => deletePost(_id)}
            >
              {UniversalTexts.yes}
            </Button>
          </UniversalButtonsDivFlex>
        </div>
      </DivModal>
      <BackgroundClickBlog
        onClick={() => handleSeeModal()}
        style={{ display: !isVisible ? "none" : "flex" }}
      />
    </BlogRouteSizeControlBox>
  );
}

export default Blog;
