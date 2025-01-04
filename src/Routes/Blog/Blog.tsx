import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  BlogPostTitle,
  BackgroundClickBlog,
  HTwo,
  HOne,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import {
  formatDate,
  backDomain,
  getVideoEmbedUrl,
  Xp,
  UniversalButtonsDivFlex,
  DivFlex,
  DivMarginBorder,
} from "../../Resources/UniversalComponents";
import { alwaysWhite, secondaryColor } from "../../Styles/Styles";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import {
  DivModal,
  IFrameVideoPannel,
  ImgBlog,
  InternDivModal,
} from "./Blog.Styled";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import Helmets from "../../Resources/Helmets";
import LevelCardBlog from "../LevelCard/LevelCardBlog";
import Countdown from "../Ranking/RankingComponents/Countdown";

interface BlogProps {
  headers: MyHeadersType | null;
  studentIdd: string;
  picture: string;
  change: boolean;
}

export function Blog({ headers, studentIdd, picture, change }: BlogProps) {
  const { UniversalTexts } = useUserContext();
  // Strings
  const [newTitle, setNewTitle] = useState<string>("");
  const [_id, setID] = useState<string>("");
  const [_StudentId, setStudentId] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [newImg, setNewImg] = useState<string>("");
  const [newUrlVideo, setNewUrlVideo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [googleDriveLink, setGoogleDriveLink] = useState<string>("");
  const [permissions, setPermissions] = useState<string>("");
  // Booleans
  const [seeConfirmDelete, setSeeConfirmDelete] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextTutoring, setNextTutoring] = useState<any>();

  // Loading
  const [posts, setPosts] = useState<any>([
    {
      title: <CircularProgress style={{ color: secondaryColor() }} />,
    },
  ]);

  const [user, setUser] = useState<any>({});

  const fetchClasses = async (studentId: string) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${backDomain}/api/v1/homeworknext/${studentId}`,
        {
          headers: actualHeaders,
        }
      );
      const tt = response.data.tutoringHomeworkList;
      setNextTutoring(tt);
      setLoading(false);
    } catch (error) {
      console.log(error, "erro ao listar homework");
    }
  };
  useEffect(() => {
    const theuser = JSON.parse(localStorage.getItem("loggedIn") || "");
    if (user) {
      setUser(theuser);
    } else {
    }
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "");
    fetchData();
    setName(getLoggedUser.name);
    setStudentId(getLoggedUser.id || _StudentId);
    setPermissions(getLoggedUser.permissions);
    setGoogleDriveLink(getLoggedUser.googleDriveLink);
    fetchClasses(getLoggedUser.id);
  }, []);

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
    setSeeConfirmDelete(false);
  };
  const handleConfirmDelete = () => {
    setSeeConfirmDelete(!seeConfirmDelete);
  };

  const actualHeaders = headers || {};

  const seeEdition = async (id: string): Promise<void> => {
    handleSeeModal();
    try {
      const response = await axios.get(`${backDomain}/api/v1/blogpost/${id}`, {
        headers: actualHeaders,
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

  const editPost = async (id: string): Promise<void> => {
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
        { headers: actualHeaders }
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

  const deletePost = async (id: string): Promise<void> => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/blogposts/${id}`,
        { headers: actualHeaders }
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
  const targetDate = new Date();

  async function fetchData(): Promise<void> {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/blogposts`, {
        headers: actualHeaders,
      });
      setTimeout(() => {
        const filteredPosts = response.data.listOfPosts.filter(
          (post: any) => post !== null
        );
        setPosts(filteredPosts);
        setLoading(false);
      }, 300);

      console.log(response.data.listOfPosts);
    } catch (error) {
      // @ts-ignore
      alert(error.response.data.error);
      window.location.assign("/login");
      setLoading(false);
    }
  }

  const [visible, setVisibleItems] = useState<any>({});

  const toggleVisibility = (id: any) => {
    setVisibleItems((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <RouteDiv>
        <Helmets text="Home Page" />
        <div
          style={{
            margin: "1rem 0.5rem 0 0",
            display: "flex",
            maxWidth: "100%",
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
              maxWidth: "100%",
              gap: "1rem",
            }}
          >
            <i className="fa fa-user " aria-hidden="true" />
            <p>
              {UniversalTexts.hello}
              {name}!
            </p>
          </div>
          <div style={{ display: "flex", gap: "5px" }}></div>
        </div>
        <DivFlex>
          <div className="grid-flex-2">
            <DivMarginBorder>
              <HOne
                style={{
                  cursor: "pointer",
                }}
                onClick={() => toggleVisibility("1")}
              >
                {UniversalTexts.nextHomeworkAssignment}
              </HOne>
              {visible["1"] && (
                <div>
                  <div>
                    <div>
                      <i
                        style={{
                          display: "inline",
                          color:
                            nextTutoring?.status == "done" ? "green" : "orange",
                        }}
                        className={`fa fa-${
                          nextTutoring?.status == "done"
                            ? "check-circle"
                            : "ellipsis-h"
                        }`}
                        aria-hidden="true"
                      />{" "}
                      {nextTutoring?.status}
                    </div>
                    <div>
                      <div
                        style={{
                          padding: "1rem",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: nextTutoring?.description,
                        }}
                      />
                    </div>
                  </div>
                  <Link target="_blank" to={nextTutoring?.googleDriveLink}>
                    Access the class here
                  </Link>
                </div>
              )}
            </DivMarginBorder>
            <DivMarginBorder>
              <HOne onClick={() => toggleVisibility("2")}>
                {UniversalTexts.levelCard}
              </HOne>
              <LevelCardBlog
                change={change}
                headers={headers}
                _StudentId={_StudentId}
                picture={picture}
              />
            </DivMarginBorder>
          </div>
          <div className="grid-flex-2">
            <DivMarginBorder>
              <HOne
                style={{
                  cursor: "pointer",
                }}
                onClick={() => toggleVisibility("3")}
              >
                {UniversalTexts.monthlyChallenge}
              </HOne>
              {visible["3"] && (
                <div
                  style={{
                    backgroundColor: "#f9f9f9",
                    lineHeight: "1.6",
                  }}
                >
                  <h3 style={{ marginBottom: "1rem", color: "#333" }}>
                    {UniversalTexts.accessVideo}{" "}
                    <a
                      target="_blank"
                      href="https://www.youtube.com/watch?v=P6FORpg0KVo"
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {UniversalTexts.theFollowingVideo}
                    </a>
                  </h3>
                  <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
                    <li
                      style={{
                        border: "1px #ddd solid",
                        margin: "5px",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      {UniversalTexts.by} <strong>10/01/2025</strong>,{" "}
                      {UniversalTexts.recordAudio}
                      <Countdown
                        targetDate={new Date("2025-01-10T18:00:00")}
                        text={UniversalTexts.endOfMonthlyChallenge}
                      />
                    </li>
                    <li
                      style={{
                        border: "1px #ddd solid",
                        margin: "5px",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      {UniversalTexts.by} <strong>17/01/2025</strong>,{" "}
                      {UniversalTexts.recordAudio}
                    
                      <Countdown
                        targetDate={new Date("2025-01-17T18:00:00")}
                        text={UniversalTexts.endOfMonthlyChallenge}
                      /> 
                    </li>
                    <li
                      style={{
                        border: "1px #ddd solid",
                        margin: "5px",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      {UniversalTexts.by} <strong>24/01/2025</strong>,{" "}
                      {UniversalTexts.noteWords}- {" "}
                        <a href="http://www.linguee.com.br" target="_blank">
                        Linguee WebSite
                      </a>
                      <Countdown
                        targetDate={new Date("2025-01-24T18:00:00")}
                        text={UniversalTexts.endOfMonthlyChallenge}
                      />
                    </li>
                    <li
                      style={{
                        border: "1px #ddd solid",
                        margin: "5px",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      {UniversalTexts.by} <strong>31/01/2025</strong>,{" "}
                      {UniversalTexts.answerQuestions}
                      <ul
                        style={{
                          margin: "1rem",
                          paddingLeft: "1.5rem",
                          fontStyle: "italic",
                          listStyleType: "circle",
                        }}
                      >
                        <li>
                          What was Luis von Ahn's main goal in creating
                          Duolingo?
                        </li>
                        <li>
                          What techniques does Duolingo use to make learning
                          more engaging?
                        </li>
                        <li>
                          According to the video, what is one of the biggest
                          challenges for online learning platforms?
                        </li>
                        <li>
                          What did you find most interesting about Duolingo's
                          approach presented in the video?
                        </li>
                        <li>
                          Have you ever used an app to learn something? If yes,
                          what was your experience like?
                        </li>
                        <li>
                          Do you think learning should be more fun or more
                          structured? Why?
                        </li>
                      </ul>
                    </li>
                    <Countdown
                      targetDate={new Date("2025-01-31T18:00:00")}
                      text={UniversalTexts.endOfMonthlyChallenge}
                    />
                  </ul>
                  <p
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      margin: "1rem",
                      borderRadius: "1rem",
                      backgroundColor: "yellow",
                    }}
                  >
                    {UniversalTexts.prize}
                  </p>
                </div>
              )}
            </DivMarginBorder>
            <DivMarginBorder>
              <HOne onClick={() => toggleVisibility("4")}>
                {UniversalTexts.mural}
              </HOne>
              <div>
                {posts.map((post: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      maxWidth: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                      textDecoration: "none",
                    }}
                  >
                    {post.title && (
                      <BlogPostTitle>
                        <span
                          style={{
                            maxWidth: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {!loading && (
                            <button
                              style={{
                                cursor: "pointer",
                                display:
                                  permissions == "superadmin" ? "grid" : "none",
                              }}
                              onClick={() => seeEdition(post._id)}
                            >
                              <i className="fa fa-edit" aria-hidden="true" />
                            </button>
                          )}
                          <HTwo> {post.title}</HTwo>
                        </span>
                        {post.createdAt && (
                          <span>{formatDate(post.createdAt)}</span>
                        )}
                      </BlogPostTitle>
                    )}
                    {post.videoUrl ? (
                      <div
                        style={{
                          margin: "auto",
                        }}
                      >
                        <IFrameVideoPannel
                          src={getVideoEmbedUrl(post.videoUrl)}
                        />
                      </div>
                    ) : post.img ? (
                      <ImgBlog src={post.img} alt="logo" />
                    ) : null}
                    <div
                      style={{
                        margin: "1rem",
                        fontSize: "1.1rem",
                        display: "block",
                        padding: "1rem 0",
                      }}
                      className="limited-text"
                    >
                      <div dangerouslySetInnerHTML={{ __html: post.text }} />
                    </div>
                  </div>
                ))}
              </div>
            </DivMarginBorder>
          </div>
        </DivFlex>
      </RouteDiv>
      <DivModal
        className="modal"
        style={{
          display: isVisible ? "block" : "none",
        }}
      >
        <Xp onClick={() => handleSeeModal()}>X</Xp>
        <HTwo>{UniversalTexts.editPost}</HTwo>
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
            cols={20}
            rows={10}
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
    </>
  );
}

export default Blog;
