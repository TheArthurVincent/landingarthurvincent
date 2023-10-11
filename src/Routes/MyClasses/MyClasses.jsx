import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  HOne,
  RouteSizeControlBox,
  HTwo,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  BackToHomePage,
  IFrameVideo,
  backDomain,
  getVideoEmbedUrl,
  linkReset,
  logout24h,
} from "../../Resources/UniversalComponents";
import { ClassBox, HThree, TransectionMenu } from "./MyClasses.Styled";
import { Link } from "react-router-dom";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";
import { Button, Skeleton } from "@mui/material";
import axios from "axios";
import TopBar from "../../Application/TopBar/TopBar";

export function MyClasses() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [classes, setClasses] = useState([]);
  const [classesDistinctMonthYears, setClassesDistinctMonthYears] = useState(
    []
  );

  useEffect(() => {
    logout24h();
  }, []);

  const { UniversalTexts } = useUserContext();
  async function fetchMonthYear() {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    try {
      await axios
        .get(`${backDomain}/api/v1/tutoringmonthyear/${getLoggedUser.id}`)
        .then((response) => {
          setClassesDistinctMonthYears(response.data.distinctMonthYears);
        });
      const response = await axios.get(
        `${backDomain}/api/v1/tutoring/${getLoggedUser.id}`
      );
      setClasses(response.data.formattedTutoringFromParticularStudent);
    } catch (error) {
      setClassesDistinctMonthYears(["response.data.distinctMonthYears"]);
    }
  }

  useEffect(() => {
    fetchMonthYear();
    setLoading(false);
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
              color: alwaysWhite(),
            }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {UniversalTexts.previousButton}
          </Button>
          <span
            style={{
              color: alwaysBlack(),
            }}
          >
            {currentPage}/{totalPages}
          </span>
          <Button
            style={{
              backgroundColor: primaryColor(),
              color: alwaysWhite(),
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
              defaultValue={"4"}
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
    <>
      <TopBar />
      <RouteSizeControlBox>
        <RouteDiv>
          {!loading ? (
            <>
              <HOne>{UniversalTexts.myClasses}</HOne>
              <BackToHomePage />
              <ClassesSideBar />
              {currentClasses.map((item, index) => (
                <div key={index}>
                  <ClassBox>
                    <div style={{ textAlign: "center" }}>
                      <IFrameVideo src={getVideoEmbedUrl(item.videoUrl)} />
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                      <HThree style={{}}>{item.title}</HThree>
                      <div>
                        <HTwo>{UniversalTexts.date}</HTwo>
                        <p
                          style={{
                            color: alwaysBlack(),
                            textAlign: "center",
                          }}
                        >
                          {item.date}
                        </p>
                        <HTwo>{UniversalTexts.comments}</HTwo>
                        <div
                          style={{
                            backgroundColor: lightGreyColor(),
                            padding: "10px",
                            overflow: "auto",
                            height: "13rem",
                            maxWidth: "22rem",
                            margin: "0 auto",
                          }}
                        >
                          <p style={{ maxWidth: "80ch", color: "black" }}>
                            {item.comments}
                          </p>
                        </div>
                        <HTwo>{UniversalTexts.attachments}</HTwo>
                        <Link
                          to={item.attachments}
                          target="_blank"
                          style={{
                            textAlign: "center",
                            color: secondaryColor(),
                          }}
                        >
                          {UniversalTexts.attachments}
                        </Link>
                      </div>
                    </div>
                  </ClassBox>
                </div>
              ))}
              {itemsPerPage > 2 && classes.length > 2 && <ClassesSideBar />}
            </>
          ) : (
            <>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <Skeleton variant="rectangular" width={1685} height={100} />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Skeleton variant="rectangular" width={1300} height={500} />
                  <Skeleton variant="rectangular" width={370} height={500} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Skeleton variant="rectangular" width={500} height={30} />
                  <Skeleton variant="rectangular" width={500} height={30} />
                  <Skeleton variant="rectangular" width={650} height={30} />
                </div>
              </div>
            </>
          )}
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}

export default MyClasses;
