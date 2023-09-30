import { useState, useEffect } from "react";
import styles from "./PhrasalVerbs.module.css";
import Main from "./Main/Main";
import classes from "./classes.json";
import Initial from "./Main/Initial/Initial";
import StudentInfo from "./Main/StudentInfo/StudentInfo";
import Notes from "./Main/Notes/Notes";

export function PhrasalVerbs() {
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [date, setDate] = useState("");

  const handleNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    ("");
  };

  useEffect(() => {
    if (selectedClass) {
      const filtered = classes.filter((item) => item.title === selectedClass);
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classes);
    }
  }, [selectedClass]);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  return (
    <div>
      <header className={styles.header}>
        {/* <Notes /> */}
        <nav>
          <a href="/">Main Page</a>
        </nav>
        <div>
          <span className={styles.comment}> Choose a class:</span>
          <select
            name="classes"
            id="classes"
            className="classes"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="" hidden>
              Select a class
            </option>
            {classes.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </header>
      {/* <StudentInfo
        onNameChange={handleNameChange}
        onDateChange={handleDateChange}
      /> */}
      {selectedClass ? (
        filteredClasses.map((item) => (
          <div className={styles.maxwidth}>
            {" "}
            <Main
              key={`${item.id}0`}
              title={item.title}
              content={item.content}
              name={studentName}
              day={date}
            />
          </div>
        ))
      ) : (
        <Initial />
      )}
    </div>
  );
}

export default PhrasalVerbs;
