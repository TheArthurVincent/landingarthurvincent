import { useState, useEffect } from "react";
import styles from "./PhrasalVerbs.module.css";
import Main from "./Main/Main";
import classes from "./classes.json";
import Initial from "./Main/Initial/Initial";

export function PhrasalVerbs() {
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);

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
        <nav>
          <a href="/classes-to-teach">Main Page</a>
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
            <option value="0000" hidden>
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

      {selectedClass ? (
        filteredClasses.map((item) => (
          <div className={styles.maxwidth}>
            {" "}
            <Main
              key={`${item.id}0`}
              title={item.title}
              content={item.content}
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
