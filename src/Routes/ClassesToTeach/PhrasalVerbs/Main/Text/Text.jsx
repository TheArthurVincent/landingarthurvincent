import React from 'react';
import styles from './Text.module.css';

const Text = ({ content, active }) => {
  return (
    <article className={`${styles.text} ${active ? '' : styles.hidden}`}>
      {content.texts.map((text) => (
        <div key={`${text.textTitle}0`} className={styles.textDiv}>
          <div key={text.textTitle}>
            <h3>{text.textTitle}</h3>
            <div className={styles.textSection}>
              <img src={text.img} alt="" />
              <p className={styles.theText}>{text.textContent}</p>
            </div>
          </div>
        </div>
      ))}
    </article>
  );
};

export default Text;
