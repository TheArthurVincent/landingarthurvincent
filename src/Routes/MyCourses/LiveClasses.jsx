import React, { useEffect, useState } from "react";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link } from "react-router-dom";
import {
  BackToHomePage,
  DivFlex,
  IFrameVideo,
  backDomain,
  getVideoEmbedUrl,
} from "../../Resources/UniversalComponents";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { ClassBox, TransectionMenu } from "../MyClasses/MyClasses.Styled";
import {
  alwaysBlack,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";
import NextLiveClasses from "./MyCoursesAssets/NextLive";

export default function MyCourses({ headers }) {
  const { UniversalTexts } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [classes, setClasses] = useState([]);

  async function fetchMonthYear() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/allcourseobjects`,
        { headers }
      );
      setClasses(response.data);
      setLoading(false);
    } catch (error) {}
  }

  useEffect(() => {
    fetchMonthYear();
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

  function GroupClassesSideBar() {
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
              color: textPrimaryColorContrast(),
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
              color: textPrimaryColorContrast(),
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
              {[1, 5, 10].map((option, index) => {
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
      <RouteSizeControlBox className="smooth">
        <RouteDiv>
          <>
            {!loading ? (
              <>
                <HOne>{UniversalTexts.previousGroupClasses}</HOne>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
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

                  <BackToHomePage />
                </span>
                <GroupClassesSideBar />
                {currentClasses.map((item, index) => (
                  <div key={index}>
                    <ClassBox>
                      <div style={{ textAlign: "center" }}>
                        <DivFlex>
                          <HTwo>{item.classTitle}</HTwo>
                          {item.googleDriveLink && (
                            <Link to={item.googleDriveLink} target="_blank">
                              {UniversalTexts.files}
                            </Link>
                          )}
                        </DivFlex>{" "}
                        <IFrameVideo src={getVideoEmbedUrl(item.videoUrl)} />
                      </div>
                    </ClassBox>
                  </div>
                ))}
                {itemsPerPage > 2 && classes.length > 2 && (
                  <GroupClassesSideBar />
                )}
              </>
            ) : (
              <CircularProgress style={{ color: secondaryColor() }} />
            )}
          </>
        </RouteDiv>
        {/* <RouteDiv>
          <NextLiveClasses headers={headers} />
        </RouteDiv> */}
      </RouteSizeControlBox>
    </>
  );
}

{
  /*agrupada*/
  /* <RouteDiv>
  <HOne>{UniversalTexts.liveClasses}</HOne>
  <span style={{ display: "flex", justifyContent: "space-between" }}>
    <Button onClick={() => fetchCoursesTitles()}>
      <i className="fa fa-refresh" aria-hidden="true"></i>
    </Button>
    <BackToHomePage />
  </span>{" "}
  {loading ? (
    <CircularProgress style={{ color: secondaryColor() }} />
  ) : (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        gap: "1rem",
        margin: "0 1rem",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <Select
        value={courseTitle}
        onChange={(e) => fetchCourse(e.target.value)}
      >
        <MenuItem disabled value="Select the type of classes">
          Select the type of classes
        </MenuItem>

        {courses.map((course, index) => (
          <MenuItem key={index} value={course}>
            {course}
          </MenuItem>
        ))}
      </Select>
    </div>
  )}
  <span style={{ display: seeModules ? "block" : "none" }}>
    {loading ? (
      <CircularProgress style={{ color: secondaryColor() }} />
    ) : (
      <div
        style={{
          border: "grey 1px solid",
          gap: "1rem",
        }}
      >
        <HOne>{courseTitle}</HOne>
        {allModulesFromTheCourse.map((theModule, index) => (
          <div key={index}>
            <h2
              style={{
                backgroundColor: lightGreyColor(),
                padding: "1rem",
              }}
            >
              {theModule.moduleName}
            </h2>
            {theModule.classes.map((classItem, innerIndex) => (
              <div style={{}} key={innerIndex}>
                {classItem.classTitle && (
                  <p
                    onClick={() =>
                      setClass(
                        classItem.classTitle,
                        classItem.videoUrl,
                        classItem.description,
                        classItem.googleDriveLink,
                        theModule.moduleName
                      )
                    }
                    style={{
                      padding: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    {classItem.classTitle}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    )}
  </span>
  <RouteSizeControlBox
    style={{
      display: isClassVisible ? "block" : "none",
      maxWidth: "fit-content",
    }}
  >
    <RouteDiv>
      {title && (
        <HThree style={{ margin: 0, marginBottom: "1rem" }}>
          {title}
        </HThree>
      )}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-around",
        }}
      >
        <span>
          <span onClick={() => back()}>
            {ButtonButton(`Voltar aos cursos `)}
          </span>{" "}
          {videoUrl && (
            <IFrameVideo
              src={getVideoEmbedUrl(videoUrl)}
              frameBorder="0"
            />
          )}
          {description && (
            <div
              style={{
                maxWidth: "100ch",
                padding: "0.5rem 1rem",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          )}
          {googleDriveLink && (
            <Button>
              <Link to={googleDriveLink} target="_blank">
                {" "}
                Pasta da aula
              </Link>
            </Button>
          )}
        </span>
        <SpanCourseResponsive>
          {loading ? (
            <CircularProgress style={{ color: secondaryColor() }} />
          ) : (
            <div
              style={{
                border: "grey 1px solid",
                gap: "1rem",
                fontSize: "0.8rem",
              }}
            >
              {allModulesFromTheCourse.map((theModule, index) => (
                <div key={index}>
                  <h2
                    style={{
                      backgroundColor: lightGreyColor(),
                      padding: "0.3rem",
                    }}
                  >
                    {theModule.moduleName}
                  </h2>
                  {theModule.classes.map((classItem, innerIndex) => (
                    <div style={{}} key={innerIndex}>
                      {classItem.classTitle && (
                        <p
                          onClick={() =>
                            setClass(
                              classItem.classTitle,
                              classItem.videoUrl,
                              classItem.description,
                              classItem.googleDriveLink,
                              theModule.moduleName
                            )
                          }
                          style={{
                            padding: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          {classItem.classTitle}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </SpanCourseResponsive>
      </div>
    </RouteDiv>
  </RouteSizeControlBox>
</RouteDiv> 


  const back = () => {
    setIsClassVisible(false);
  };
  const selectClass = () => {
    setIsClassVisible(true);
  };




  const fetchCoursesTitles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/courses?partner=${0}`,
        { headers }
      );
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error, "Erro ao importar posts");
    }
  };

  const setClass = (
    thetitle,
    thevideoUrl,
    thedescription,
    thegoogleDriveLink
  ) => {
    setVideoUrl(thevideoUrl);
    setDescription(thedescription);
    setGoogleDriveLink(thegoogleDriveLink);
    setTitle(thetitle);
    selectClass();
  };

  const fetchCourse = async (selectedCourse) => {
    setSeeModules(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/course?courseName=${selectedCourse}`,
        { headers }
      );
      setCourseTitle(selectedCourse);
      setAllModulesFromTheCourse(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error, "Erro ao importar posts");
    }
  };

  useEffect(() => {
    fetchCoursesTitles();
  }, []);
*/
}
