import React from "react";
import styles from "./Vocabulary.module.css";

const Vocabulary = ({ content, active }) => {
  return (
    <article className={`${styles.vocabulary} ${active ? "" : styles.hidden}`}>
      {content.words.map((word) => (
        <div className={styles.theWord} key={word.wordTitle}>
          <h3>{word.wordTitle}</h3>
          <h4>Definition</h4>
          <p>{word.definition}</p>
          <h4>Possible translations to Portuguese</h4>
          <ul>
            {word.possibleTranslations.map((translation) => (
              <li key={translation}>{translation}</li>
            ))}
          </ul>
          <h4>Examples</h4>
          <div>
            {word.examples.map((example, index) => (
              <div key={index}>
                <p className={styles.englishSentence}>{example.english}</p>
                <p className={styles.portugueseSentence}>
                  {example.portuguese}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.questions}>
            <h4>Questions</h4>
            <ul>
              {word.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </article>
  );
};

export default Vocabulary;
