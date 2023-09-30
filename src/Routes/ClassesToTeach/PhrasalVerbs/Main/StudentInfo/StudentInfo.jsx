import React, { useState } from 'react';
import styles from './StudentInfo.module.css';
const StudentInfo = ({ onNameChange, onDateChange }) => {
  const [showOrNot, setShowOrNot] = React.useState(styles.flex);
  const [arrow, setArrow] = React.useState('>');

  const handleClick = () => {
    if (showOrNot === styles.flex) {
      setShowOrNot(`${styles.flex} ${styles.showtab}`);
      setArrow('<');
    } else {
      setShowOrNot(styles.flex);
      setArrow('>');
    }
  };
  return (
    <div className={showOrNot}>
      <div className={styles.info}>
        <div className={styles.studentsname}>
          <span className={styles.desc}>Student's Name </span>
          <input type="text" onChange={onNameChange} />
        </div>
        <div className={styles.date}>
          <span className={styles.desc}>Date </span>
          <input type="date" onChange={onDateChange} />
        </div>
      </div>
      <div onClick={handleClick} className={styles.arrow}>
        {arrow}
      </div>
    </div>
  );
};

export default StudentInfo;
