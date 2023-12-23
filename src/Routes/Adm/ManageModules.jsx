import React, { useEffect, useState } from "react";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import { backDomain, SpinLoading } from "../../Resources/UniversalComponents";


export function ManageModules() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const postCourse = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/courses`);
      setCoursesList(response.data.courses);
      setLoading(false);
      console.log(coursesList);
    } catch (error) {
      alert("Erro ao postar curso");
    }
  };
  useEffect(() => {
    postCourse();
  }, []);

  return (
    <RouteDiv>
      <HOne>Gerenciar Módulos</HOne>
      <HTwo>Inserir novo módulo</HTwo>
      {loading ? (
        <SpinLoading />
      ) : (
        <select name="courses" id="courses">
          {coursesList.map((course, index) => (
            <option key={index} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      )}{" "}
    </RouteDiv>
  );
}

export default ManageModules;
