import React, { useState } from 'react';
import styles from './Main.module.css';
import Vocabulary from './Vocabulary/Vocabulary';
import Text from './Text/Text';
import Exercises from './Exercises/Exercises';

const Main = ({ title, content, name, day }) => {
  const [active, setActive] = useState('vocabulary');

  return (
    <main>
      <h5>
        <span className={styles.theName}> {name}</span>
        <span className={styles.theDate}>{day}</span>
      </h5>
      <h1>{title}</h1>
      <nav className={styles.navClass}>
        <a
          href="#"
          className={active === 'vocabulary' ? styles.selected : ''}
          onClick={() => setActive('vocabulary')}
        >
          Vocabulary
        </a>
        <a
          href="#"
          className={active === 'text' ? styles.selected : ''}
          onClick={() => setActive('text')}
        >
          Text
        </a>
        <a
          href="#"
          className={active === 'exercises' ? styles.selected : ''}
          onClick={() => setActive('exercises')}
        >
          Exercises
        </a>
      </nav>
      <section>
        <Vocabulary
          className={active === 'vocabulary' ? styles.show : styles.hide}
          content={content}
          active={active === 'vocabulary'}
        />
        <Text
          className={active === 'text' ? styles.show : styles.hide}
          content={content}
          active={active === 'text'}
        />
        <Exercises
          className={active === 'exercises' ? styles.show : styles.hide}
          content={content}
          active={active === 'exercises'}
        />
      </section>
    </main>
  );
};

export default Main;
