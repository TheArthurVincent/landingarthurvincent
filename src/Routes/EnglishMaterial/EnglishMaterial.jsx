import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link } from "react-router-dom";
import { CourseCard } from "./EnglishMaterial.Styled";
import {
  BackToHomePage,
  Xp,
  backDomain,
} from "../../Resources/UniversalComponents";
import { HThree } from "../MyClasses/MyClasses.Styled";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { alwaysWhite, transparentWhite } from "../../Styles/Styles";

export default function EnglishMaterial({ headers }) {
  const { UniversalTexts } = useUserContext();

  const [isVisible, setIsVisible] = useState(false);
  const [basicClasses, setBasicClasses] = useState([]);
  const [intermediaryClasses, setIntermediaryClasses] = useState([]);
  const [advancedClasses, setAdvancedClasses] = useState([]);
  const [thematicClasses, setThematicClasses] = useState([]);
  const [permissions, setPermissions] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [ID, setID] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingInfo, setLoadingInfo] = useState(true);

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setPermissions(getLoggedUser.permissions);
  }, []);

  const fetchMaterial = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/material/`, {
        headers,
      });
      const basic = response.data.basicClasses;
      const intermediate = response.data.intermediateClasses;
      const advanced = response.data.advancedClasses;
      const thematic = response.data.thematicClasses;
      setBasicClasses(basic);
      setIntermediaryClasses(intermediate);
      setAdvancedClasses(advanced);
      setThematicClasses(thematic);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneMaterial = async (id) => {
    handleSeeModal(true);
    setLoadingInfo(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/material/${id}`, {
        headers,
      });
      console.log(response.data);
      const newTitle = response.data.title;
      const newLink = response.data.link;
      const newImg = response.data.img;
      const newID = response.data._id;
      const newCategory = response.data.category;
      setTitle(newTitle);
      setLink(newLink);
      setImg(newImg);
      setID(newID);
      setCategory(newCategory);
      setLoadingInfo(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editOneMaterial = async () => {
    setLoadingInfo(true);
    const id = ID;
    try {
      const response = await axios.put(`${backDomain}/api/v1/material/${id}`, {
        headers,
        img,
        link,
        title,
        category,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    handleSeeModal();
    fetchMaterial();
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
    isVisible && fetchMaterial();
  };

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    gap: "1rem",
    margin: "0 1rem",
    overflowY: "auto",
    overflowX: "scroll",
    maxWidth: "100%",
    padding: "1rem",
  };

  const lists = [
    { title: UniversalTexts.basicClasses, list: basicClasses },
    {
      title: UniversalTexts.intermediaryClasses,
      list: intermediaryClasses,
    },
    { title: UniversalTexts.advancedClasses, list: advancedClasses },
    { title: UniversalTexts.thematicClasses, list: thematicClasses },
  ];
  return (
    <>
      <TopBar />
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
          <RouteDiv>
            <HOne>{UniversalTexts.englishMaterial}</HOne>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={() => fetchMaterial()}>
                <i className="fa fa-refresh" aria-hidden="true" />
              </Button>{" "}
              <BackToHomePage />{" "}
            </div>
            {lists.map((item, index) => {
              return (
                <div key={index}>
                  <HThree>{item.title}</HThree>
                  {!loading ? (
                    <div style={cardStyle}>
                      {item.list.map((course, index) => {
                        return (
                          <div key={index}>
                            <Button
                              onClick={() => getOneMaterial(course.id)}
                              style={{
                                display:
                                  permissions == "superadmin"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <i className="fa fa-edit" aria-hidden="true" />
                            </Button>
                            <Link to={course.link} target="_blank">
                              <CourseCard>
                                <p>{course.title}</p>
                                <img src={course.img} alt="" />
                              </CourseCard>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              );
            })}
          </RouteDiv>
          <div
            style={{
              backgroundColor: transparentWhite(),
              width: "10000px",
              height: "10000px",
              top: "0",
              left: "0",
              position: "fixed",
              zIndex: 99,
              display: isVisible ? "block" : "none",
              padding: "1rem",
            }}
            onClick={() => handleSeeModal()}
          />
          <div
            className="modal"
            style={{
              position: "fixed",
              display: isVisible ? "block" : "none",
              zIndex: 100,
              backgroundColor: alwaysWhite(),
              boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.5)",
              padding: "1rem",
              width: "20rem",
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
            {loadingInfo ? (
              <CircularProgress />
            ) : (
              <div
                style={{
                  display: "grid",
                  justifyItems: "center",
                  gap: "0.5rem",
                }}
              >
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  type="text"
                  required
                />
                <input
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  placeholder="Image"
                  type="text"
                  required
                />{" "}
                <img style={{ maxWidth: "12rem" }} src={img} />
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link"
                  type="text"
                  required
                />{" "}
                <select required onChange={(e) => setCategory(e.target.value)}>
                  <option style={{ cursor: "pointer" }} value={category} hidden>
                    {category}
                  </option>
                  {[
                    "basicClasses",
                    "intermediateClasses",
                    "advancedClasses",
                    "thematicClasses",
                  ].map((option, index) => {
                    return (
                      <option
                        style={{ cursor: "pointer" }}
                        key={index}
                        value={option}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              {[
                {
                  text: "Delete",
                  backgroundColor: "red",
                  onClick: editOneMaterial,
                },
                {
                  text: "Cancel",
                  backgroundColor: "navy",
                  onClick: handleSeeModal,
                },
                {
                  text: "Save",
                  backgroundColor: "green",
                  onClick: editOneMaterial,
                },
              ].map((item, index) => {
                return (
                  <Button
                    key={index}
                    onClick={item.onClick}
                    style={{
                      marginTop: "1rem",
                      color: "white",
                      backgroundColor: item.backgroundColor,
                    }}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </div>
          </div>
        </RouteSizeControlBox>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}
