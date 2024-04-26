import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  BlogRouteSizeControlBox,
  BlogPostTitle,
  HTwo,
  BackgroundClickBlog,
  BlogSideBox,
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
} from "../../Resources/UniversalComponents";
import NextLiveClasses from "../MyCourses/MyCoursesAssets/NextLive";

import {
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { DivPost, SpanDisapear, TitleChangeSize } from "./Blog.Styled";
import NextTutorings from "./BlogComponents/NextTutorings";
import theitems from "../Ranking/RankingComponents/ranking.json";
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
  const [isNextClassVisible, setIsNextClassVisible] = useState(false);
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextTutoring, setNextTutoring] = useState({
    _id: "651c13e019e72fbdef2abd76",
    studentID: "651311fac3d58753aa9281c5",
    date: "2000-00-00",
    time: "00:00",
    link: "https://portal.arthurvincent.com.br/",
  });

  const items = theitems.levels;

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleConfirmDelete = () => {
    setSeeConfirmDelete(!seeConfirmDelete);
  };

  const [posts, setPosts] = useState([
    {
      title: <CircularProgress style={{ color: secondaryColor() }} />,
    },
  ]);

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setName(getLoggedUser.name);
    setStudentId(getLoggedUser.id || _StudentId);
    setPermissions(getLoggedUser.permissions);
    setGoogleDriveLink(getLoggedUser.googleDriveLink);
    setLastName(getLoggedUser.lastname);
    setPicture(getLoggedUser.picture);
  }, []);

  const handleSeeNextTutoring = () => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    const id = getLoggedUser.id;
    const fetchNextClass = async () => {
      try {
        const response = await axios.get(
          `${backDomain}/api/v1/eventseenextttoring/${id}`,
          { headers }
        );
        setNextTutoring(response.data.event);
      } catch (error) {
        alert("Erro ao importar próximas aulas");
      }
    };
    fetchNextClass();
    setIsNextClassVisible(!isNextClassVisible);
  };

  // const handleSeeNextTutoring = () => {
  //   handleSeeNextTutoring();
  //   // const fetchNextClass = async () => {
  //   //   try {
  //   //     const response = await axios.get(
  //   //       `${backDomain}/api/v1/nexttutoring/${_StudentId}`,
  //   //       { headers }
  //   //     );
  //   //     setNextTutoring(response.data.nextTutoring);
  //   //   } catch (error) {
  //   //     alert("Erro ao importar próximas aulas");
  //   //   }
  //   // };
  //   // fetchNextClass();
  //   setIsNextClassVisible(!isNextClassVisible);
  // };

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
      alert(error, "Erro ao importar posts");
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

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

  const formatData = (theDate) => {
    const parts = theDate.split("-");
    const formatted = parts[2] + "/" + parts[1] + "/" + parts[0];
    return formatted;
  };

  return (
    <>
      <BackgroundClickBlog
        onClick={() => handleSeeModal()}
        style={{ display: !isVisible ? "none" : "flex" }}
      />
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
              {UniversalTexts.calendar}
            </Link>
            {/* ) : (
              <span>
                <span
                  style={{
                    margin: "3px",
                  }}
                >
                  {UniversalTexts.nextClass}
                </span>
                {nextTutoring.date == "" ? (
                  <div
                    style={{
                      display: isNextClassVisible ? "block" : "none",
                      marginRight: "1.2rem",
                      marginLeft: "auto",
                      maxWidth: "fit-content",
                      padding: "0.5rem",
                    }}
                  >
                    <CircularProgress style={{ color: secondaryColor() }} />
                  </div>
                ) : (
                  <>
                    <Link
                      style={{
                        display: isNextClassVisible ? "block" : "none",
                        marginRight: "1.2rem",
                        marginLeft: "auto",
                        maxWidth: "fit-content",
                        backgroundColor: secondaryColor(),
                        color: textSecondaryColorContrast(),
                        padding: "0.5rem",
                        fontSize: "1rem",
                      }}
                      target="_blank"
                      to={nextTutoring.link}
                    >
                      <span
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        {formatData(nextTutoring.date)
                          ? formatData(nextTutoring.date)
                          : "http://google.com"}
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        - {nextTutoring.time}
                      </span>
                    </Link>
                  </>
                )}
              </span>
            )} */}
          </div>
          {/* <NextTutorings
            display={permissions == "superadmin" ? "block" : "none"}
            headers={headers}
          /> */}
          {/* <NextLiveClasses headers={headers} /> */}
          <HOne>{UniversalTexts.mural}</HOne>
          {posts.map((post, index) => (
            <div
              key={index}
              style={{
                borderBottom: `solid 3px ${primaryColor()} `,
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
                    <TitleChangeSize>{post.title}</TitleChangeSize>
                    {!loading && (
                      <Button
                        style={{
                          display:
                            permissions == "superadmin" ? "grid" : "none",
                          backgroundColor: textPrimaryColorContrast(),
                          color: primaryColor(),
                          fontSize: "0.6rem",
                        }}
                        onClick={() => seeEdition(post._id)}
                      >
                        <i className="fa fa-edit" aria-hidden="true" />
                      </Button>
                    )}
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

        <div
          className="modal"
          style={{
            position: "fixed",
            display: isVisible ? "block" : "none",
            zIndex: 100,
            backgroundColor: alwaysWhite(),
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
              margin: "0.5rem 0",
            }}
          >
            {UniversalTexts.editPost}
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
            <input
              value={newImg}
              onChange={(event) => setNewImg(event.target.value)}
              id="VideoUrl"
              placeholder="Imagem URL"
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
          </div>
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
            </div>
          </div>
        </div>
        <BlogSideBox>
          <LevelCard
            name={name}
            headers={headers}
            _StudentId={_StudentId}
            picture={picture}
            lastName={lastName}
          />
        </BlogSideBox>
      </BlogRouteSizeControlBox>
    </>
  );
}

export default Blog;
