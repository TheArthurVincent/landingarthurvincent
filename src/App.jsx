import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Application/SelectLanguage/SelectLanguage";
import Login from "./Routes/Login/Login";
import HomePage from "./Routes/HomePage";
import Adm from "./Routes/Adm/Adm";
import PhrasalVerbs from "./Routes/ClassesToTeach/PhrasalVerbs/PhrasalVerbs";
import MyClasses from "./Routes/MyClasses/MyClasses";
import Extras from "./Routes/Extras/Extras";
import MyProfile from "./Routes/MyProfile/MyProfile";
import ClassesToTeach from "./Routes/ClassesToTeach/ClassesToTeach";
import { backDomain, logout24h } from "./Resources/UniversalComponents";
import { BasicTextsPresentTense } from "./Routes/ClassesToTeach/BasicTexts/BasicTextsPresentTense";
import SignUp from "./Routes/SignUp/SignUp";
import MyCourses from "./Routes/MyCourses/MyCourses";
import MyCoursesTemplate from "./Routes/MyCourses/MyCoursesTemplate";
import { styled } from "styled-components";
import { darkGreyColor, secondaryColor } from "./Styles/Styles";
import axios from "axios";
function App() {
  const verifyToken = () => {
    const token = localStorage.getItem("authorization");
    return token;
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${backDomain}/api/v1/courses`);
        setCourses(response.data.courses);
        console.log(response.data.courses);
      } catch (error) {
        alert("Erro ao importar posts");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    logout24h();
  }, []);

  const All = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    justify-content: space-between;

    & *::-webkit-scrollbar {
      width: 6px;
    }

    & *::-webkit-scrollbar-track {
      background: ${darkGreyColor()};
    }

    & *::-webkit-scrollbar-thumb {
      background-color: ${secondaryColor()};
      border-radius: 10px;
    }
  `;

  return (
    <All>
      <div
        style={{
          width: "100vw",
        }}
      >
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={verifyToken() ? <HomePage /> : <Login />}
              />
              <Route
                path="/homepage/*"
                element={verifyToken() ? <HomePage /> : <Login />}
              />
              <Route
                path="/extras"
                element={verifyToken() ? <Extras /> : <Login />}
              />
              <Route
                path="/my-courses"
                element={
                  verifyToken() ? <MyCourses courses={courses} /> : <Login />
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/adm"
                element={verifyToken() ? <Adm /> : <Login />}
              />
              <Route
                path="/my-classes"
                element={verifyToken() ? <MyClasses /> : <Login />}
              />
              <Route
                path="/my-profile"
                element={verifyToken() ? <MyProfile /> : <Login />}
              />
              <Route
                path="/classes-to-teach"
                element={verifyToken() ? <ClassesToTeach /> : <Login />}
              />
              <Route
                path="/phrasal-verbs"
                element={verifyToken() ? <PhrasalVerbs /> : <Login />}
              />
              {courses.map((course, index) => (
                <Route
                  key={index}
                  path={course.link}
                  element={
                    verifyToken() ? (
                      <>
                        <MyCoursesTemplate
                          courseColor={course.courseColor}
                          title={course.courseTitle}
                          key={index}
                          _id={course._id}
                          courses={courses}
                        />
                      </>
                    ) : (
                      <Login />
                    )
                  }
                />
              ))}
              <Route
                path="/basic-texts-present-tense"
                element={verifyToken() ? <BasicTextsPresentTense /> : <Login />}
              />
            </Routes>
          </Router>
        </UserProvider>
      </div>
      <footer
        style={{
          textAlign: "center",
          bottom: "0vh",
          flexDirection: "column",
          fontSize: "12px",
          alignItems: "center",
          gap: "0.8rem",
          backgroundColor: "#111",
          color: "#eee",
          display: "flex",
          width: "100vw",
        }}
      >
        <img
          style={{
            maxWidth: "2.2rem",
            marginTop: "1rem",
          }}
          src="https://ik.imagekit.io/vjz75qw96/assets/aRVIN).png?updatedAt=1697560090366"
          alt=""
        />
        <span
          style={{
            marginBottom: "1rem",
          }}
        >
          Portal Arvin para professores particulares © Some rights reserved
        </span>{" "}
      </footer>
    </All>
  );
}

export default App;
