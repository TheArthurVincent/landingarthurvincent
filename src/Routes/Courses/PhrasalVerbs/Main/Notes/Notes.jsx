import React, { useState } from 'react';
import styles from './Notes.module.css';

const Notes = () => {
  const [hidden, setHidden] = useState(true);

  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <div className={styles.notes}>
      <img
        id={styles.arvin}
        src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/head.png?updatedAt=1687346649487"
        onClick={handleClick}
      />
      <textarea
        className={`${styles.hidden} ${hidden ? '' : styles.visible}`}
        name="Notes"
        id="notes"
        cols="50"
        rows="30"
      />
    </div>
  );
};

export default Notes;
