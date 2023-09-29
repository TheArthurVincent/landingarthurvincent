import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  HOne,
  RouteSizeControlBox,
  HTwo,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  IFrameVideo,
  backDomain,
  getVideoEmbedUrl,
  linkReset,
} from "../../Resources/UniversalComponents";
import { ClassBox, HThree, TransectionMenu } from "./MyClasses.Styled";
import { Link } from "react-router-dom";
import { primaryColor } from "../../Styles/Styles";
import { Button } from "@mui/material";
import axios from "axios";

export function MyClasses({ studentID }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [classes, setClasses] = useState([]);
  const [classesDistinctMonthYears, setClassesDistinctMonthYears] = useState(
    []
  );

  const { UniversalTexts } = useUserContext();
  async function fetchMonthYear() {
    try {
      await axios
        .get(`${backDomain}/api/v1/tutoringmonthyear/${studentID}`)
        .then((response) => {
          console.log("response.data", response.data);
          setClassesDistinctMonthYears(response.data.distinctMonthYears);
          console.log("classesDistinctMonthYears", classesDistinctMonthYears);
          // return classesDistinctMonthYears;
        });
    } catch (error) {
      alert("Erro ao listar meses");
    }
  }

  const seeAllClasses = async () => {
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/tutoring/${studentID}`
      );

      setClasses(response.data.formattedTutoringFromParticularStudent);
    } catch (error) {
      alert("Erro ao listar aulas do mês");
    }
  };

  useEffect(() => {
    fetchMonthYear();
    seeAllClasses();
    console.log("look ", fetchMonthYear());
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClasses = classes.slice(startIndex, endIndex);

  const totalItems = classes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  function ClassesSideBar() {
    return (
      <TransectionMenu
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              backgroundColor: primaryColor(),
              color: "#fff",
            }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {UniversalTexts.previousButton}
          </Button>
          <span>
            {currentPage}/{totalPages}
          </span>
          <Button
            style={{
              backgroundColor: primaryColor(),
              color: "#fff",
            }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            {UniversalTexts.nextButton}
          </Button>
        </div>
        <div style={{ display: "flex", gap: "3rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label>{UniversalTexts.itemsPerPage}</label>
            <select
              style={{
                minWidth: "4.5rem",
                padding: "0.1rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option, index) => {
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
        </div>
      </TransectionMenu>
    );
  }

  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <HOne>{UniversalTexts.myClasses}</HOne>
        <ClassesSideBar />
        {currentClasses.map((item, index) => (
          <div key={index}>
            <ClassBox>
              <div style={{ textAlign: "center" }}>
                <IFrameVideo src={getVideoEmbedUrl(item.videoUrl)} />
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <HThree>{item.title}</HThree>
                <div style={{ padding: "1rem" }}>
                  <HTwo>{UniversalTexts.date}</HTwo>
                  <p style={{ maxWidth: "80ch" }}>{item.date}</p>
                  <HTwo>{UniversalTexts.comments}</HTwo>
                  <div
                    style={{
                      backgroundColor: "#f6f6f6",
                      padding: "10px",
                      overflow: "auto",
                      height: "13rem",
                    }}
                  >
                    <p style={{ maxWidth: "80ch", color: "black" }}>
                      {item.comments}
                    </p>
                  </div>
                  <HTwo>{UniversalTexts.attachments}</HTwo>
                  <Link to={item.attachments} style={linkReset} target="_blank">
                    {UniversalTexts.attachments}
                  </Link>
                </div>
              </div>
            </ClassBox>
          </div>
        ))}
        {itemsPerPage > 2 && classes.length > 2 && <ClassesSideBar />}
      </RouteDiv>
    </RouteSizeControlBox>
  );
}

export default MyClasses;
