import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  RouteSizeControlBox,
  BlogPostTitle,
  HTwo,
  BackgroundClickBlog,
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
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { DivPost, SpanDisapear, TitleChangeSize } from "./Blog.Styled";

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
  const [ankiEmail, setAnkiEmail] = useState("");
  const [ankiPassword, setAnkiPassword] = useState("");
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [permissions, setPermissions] = useState("");
  const [isNextClassVisible, setIsNextClassVisible] = useState(false);
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const [monthlyScore, setMonthlyScore] = useState(0);
  const [level, setLevel] = useState(9);


  const items = [
    {
      level: 1,
      icon: "fa fa-star",
      color: "#eee",
      textcolor: "black",
      text: "White Belt"
    },
    {
      level: 2,
      icon: "fa fa-moon-o",
      color: "#FAF477",
      textcolor: "black",
      text: "Yellow Belt"
    },
    {
      level: 3,
      icon: "fa fa-globe",
      color: "#2F0092",
      textcolor: "white",
      text: "Blue Belt"
    },
    {
      level: 4,
      icon: "fa fa-sun-o",
      color: "#FA1000",
      textcolor: "white",
      text: "Red Belt"
    },
    {
      level: 5,
      icon: "fa fa-bolt",
      color: "#58B000",
      textcolor: "white",
      text: "Green Belt"
    },
    {
      level: 6,
      icon: "fa fa-skyatlas",
      color: "#FA6001",
      textcolor: "white",
      text: "Orange Belt"
    },
    {
      level: 7,
      icon: "fa fa-moon-o",
      color: "#8A4C9E",
      textcolor: "white",
      text: "Purple Belt"
    },
    {
      level: 8,
      icon: "fa fa-superpowers",
      color: "#555",
      textcolor: "white",
      text: "Black Belt"
    },

    {
      level: 9,
      icon: "fa fa-edit",
      color: "#789",
      textcolor: "white",
      text: "SUPREME"
    },
    {
      level: 10,
      icon: <CircularProgress />,
      color: "#000",
      textcolor: "black",
      text: <CircularProgress />
    },
  ];

  const [nextTutoring, setNextTutoring] = useState({
    nextTutoring: {
      studentID: "",
      date: "",
      time: "",
      meetingUrl: "/",
    },
  });

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleConfirmDelete = () => {
    setSeeConfirmDelete(!seeConfirmDelete);
  };

  const [posts, setPosts] = useState([
    {
      title: <CircularProgress />,
    },
  ]);

  const seeScore = async (id) => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/score/${id}`, {
        headers,
      });
      setTotalScore(response.data.totalScore);
      setMonthlyScore(response.data.monthlyScore);
      setLevel(
        response.data.totalScore < 10000 ? 0 :
          response.data.totalScore < 25000 ? 1 :
            response.data.totalScore < 40000 ? 2 :
              response.data.totalScore < 60000 ? 3 :
                response.data.totalScore < 80000 ? 4 :
                  response.data.totalScore < 120000 ? 5 :
                    response.data.totalScore < 240000 ? 6 :
                      response.data.totalScore < 1000000 ? 7 : 8
      );

    } catch (error) {
      alert(error);
      console.error(error);
    }
  };


  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setName(getLoggedUser.name);
    setStudentId(getLoggedUser.id || _StudentId);
    setPermissions(getLoggedUser.permissions);
    setAnkiEmail(getLoggedUser.ankiEmail);
    setAnkiPassword(getLoggedUser.setAnkiPassword);
    setGoogleDriveLink(getLoggedUser.googleDriveLink);
    setLastName(getLoggedUser.lastname)
    setPicture(getLoggedUser.picture)
    setTimeout(() => {
      seeScore(getLoggedUser.id)

      console.log(level)
    }, 300);

  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(level)
    }, 3000);
  }, [])

  const handleSeeIsNextClassVisibleModal = () => {
    const fetchNextClass = async () => {
      try {
        const response = await axios.get(
          `${backDomain}/api/v1/nexttutoring/${_StudentId}`,
          { headers }
        );
        setNextTutoring(response.data);
      } catch (error) {
        // showNotification("Erro ao importar próximas aulas", 3, true)
        alert("Erro ao importar próximas aulas");
        window.location.reload();

      }
    };

    fetchNextClass();
    setIsNextClassVisible(!isNextClassVisible);
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
      alert(e, "Erro ao importar posts");
      window.location.reload();
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
      <RouteSizeControlBox
        style={{
          display: "flex",
          maxWidth: "800px",
          justifyContent: "space-between",
          gap: "1rem"
        }}
        className="smooth">


        <RouteDiv>
          <div
            style={{
              margin: "1rem 0",
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

                  textAlign: "left",
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
                    title: <i className="fa fa-mobile" aria-hidden="true"></i>,
                    tooltip: "Anki",
                    color: "navy",
                  },
                  {
                    link: googleDriveLink,
                    title: <i className="fa fa-folder" aria-hidden="true"></i>,
                    tooltip: UniversalTexts.personalFolder,
                    color: "brown",
                  },
                  {
                    link: "https://wa.me/5511915857807",
                    title: <i className="fa fa-whatsapp" aria-hidden="true"></i>,
                    tooltip: UniversalTexts.talkToTheTeacher,
                    color: "green",
                  },
                ].map((item, index) => {
                  return (
                    <Tooltip
                      key={index}
                      title={item.tooltip}>
                      <Link
                        style={{
                          marginRight: "0.5rem",
                          color: primaryColor(),
                          padding: "0.3rem",
                          fontSize: "1.5rem",
                          width: "1.5rem",
                          height: "1.5rem",
                          textAlign: "center",
                          color: item.color,
                        }}
                        target="_blank"
                        to={item.link}
                      >
                        <span
                          style={{
                            textDecoration: "underline",
                          }}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>

            </div>
            {!isNextClassVisible ? (
              <Button
                style={{
                  backgroundColor: secondaryColor(),
                  color: textSecondaryColorContrast(),
                }}
                onClick={handleSeeIsNextClassVisibleModal}
              >
                {UniversalTexts.nextClass}
              </Button>
            ) : (
              <span>
                <span
                  style={{
                    margin: "3px",
                  }}
                >
                  {UniversalTexts.nextClass}
                </span>
                {nextTutoring.nextTutoring.date == "" ? (
                  <div
                    style={{
                      display: isNextClassVisible ? "block" : "none",
                      marginRight: "1.2rem",
                      marginLeft: "auto",
                      maxWidth: "fit-content",
                      padding: "0.5rem",
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    <Link
                      style={{
                        display: isNextClassVisible ? "block" : "none",
                        marginRight: "1.2rem",
                        marginLeft: "auto",
                        maxWidth: "fit-content",
                        color: primaryColor(),
                        padding: "0.5rem",
                        fontSize: "1rem",
                        backgroundColor: textPrimaryColorContrast(),
                      }}
                      target="_blank"
                      to={nextTutoring.nextTutoring.meetingUrl}
                    >
                      <span
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        {formatData(nextTutoring.nextTutoring.date)
                          ? formatData(nextTutoring.nextTutoring.date)
                          : "http://google.com"}
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        - {nextTutoring.nextTutoring.time}
                      </span>
                    </Link>
                  </>
                )}
              </span>
            )}
          </div>
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
                    <TitleChangeSize>{post.title} </TitleChangeSize>
                    {!loading && (
                      <Button
                        style={{
                          display:
                            permissions == "superadmin" ? "flex" : "none",
                          alignItems: "center",
                          backgroundColor: secondaryColor(),
                          color: textSecondaryColorContrast(),
                          fontSize: "0.7rem",
                          maxHeight: "1.2rem",
                          maxWidth: "1.2rem",
                        }}
                        onClick={() => seeEdition(post._id)}
                      >
                        {UniversalTexts.editPost}
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
                    <IFrameVideo src={getVideoEmbedUrl(post.videoUrl)} />
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
        <RouteDiv
          style={{
            backgroundColor: "white",
            padding: "0.5rem",
            maxHeight: "16rem",
            minWidth: "9.5rem",
            fontSize: "13px",
            textAlign: "center",
            background: `linear-gradient(to bottom, black 0%, ${items[level].color} 50%)`,
            color: items[level].textcolor,
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              color: "white",
            }}
          >
            <i className={items[level].icon} aria-hidden="true" />
            <h2>
              {items[level].text}
            </h2>
          </div>
          <img
            style={{
              width: "5rem",
              height: "5rem",
              objectFit: "cover",
              border: "solid 0.2rem #555",
              margin: "0.9rem",
              borderRadius: "50%"
            }}
            src={picture}
          />
          <p
            style={{
              fontWeight: 800,
              marginBottom: "9px"
            }}
          >
            {name} {lastName}
          </p>
          <span>
            <p>
              Total Score: {totalScore}
            </p>
            <p>
              Monthly Score: {monthlyScore}
            </p>
            <Button
              onClick={() => seeScore(_StudentId)}
              style={{
                color:
                  items[level].textcolor
              }}
            >
              <i
                className="fa fa-refresh" aria-hidden="true"></i>
            </Button>
          </span>
        </RouteDiv>

      </RouteSizeControlBox>
      {/*
        - Anki 6/7: 500 [2000 in a month]
        - Anki 3/7: 200
        - Anki 0: -100
        - Homework: 500 [2000 in a month]
        - Live class: 250 [2000]
        - Live class homework: 300 [2400]
        - Anki 100% no mês: 2000 [2400]

          Faltas Aula: -100 [-400]
          Test: 3.000 []
      
          ////

          2: 10.000
          3: 25.000
          4: 40.000
          5: 60.000
          6: 80.000
          7: 120.000
          8: 240.000 - 1 stripe 20% definite 
          9: 480.000 - 2 stripes 35% definite
          10: 960.000 - 3 stripes 50% definite

          ////
          
          Level upgrade: 50% cashback/discount next month > 3500;

          1st place monthly score: 20% cashback/discount > 3000;
          2nd place monthly score: 10% cashback/discount > 3000;
          3rd place monthly score: 5% cashback/discount > 3000;
      */}
    </>
  );
}

export default Blog;
