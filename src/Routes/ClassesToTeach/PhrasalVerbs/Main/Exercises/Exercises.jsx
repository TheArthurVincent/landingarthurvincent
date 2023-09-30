import React from "react";
import styles from "./Exercises.module.css";

const Exercises = ({ content, active }) => {
  return (
    <article className={`${styles.exercises} ${active ? "" : styles.hidden}`}>
      {content.exercises.map((exercise) => (
        <div key={exercise.urlyoutube} className={styles.exercise}>
          {exercise.urlyoutube && (
            <>
              <div className={styles.listenExercise}>
                <h3>How are these sentences being used?</h3>
                <iframe
                  width="560"
                  height="315"
                  src={exercise.urlyoutube}
                  frameBorder="0"
                  allowFullScreen
                  title="Exercise"
                ></iframe>
              </div>
            </>
          )}{" "}
          {exercise.listOfSentences && (
            <div className={styles.printExercise}>
              <h3>Translate the following sentences into English.</h3>
              <ul>
                {exercise.listOfSentences.map((sentence, index) => (
                  <li key={index}>{sentence}</li>
                ))}
              </ul>
            </div>
          )}
          {styles.listenExercise && (
            <div className={styles.listenExercise}>
              <h3>Listen and answer the questions</h3>
              <iframe
                width="100%"
                height="200"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={exercise.srcAudio}
                title="Exercise Audio"
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </article>
  );
};

export default Exercises;
