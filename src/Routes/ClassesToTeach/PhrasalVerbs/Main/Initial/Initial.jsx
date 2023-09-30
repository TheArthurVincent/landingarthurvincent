import React from 'react';
import styles from './Initial.module.css';
const Initial = () => {
  return (
    <article className={styles.article}>
      {' '}
      <h3> Please, select a class!</h3>
      <p className={styles.p}>
        Welcome to Teacher Arthur Vincent's comprehensive resource for learning
        phrasal verbs! <br /> This platform offers a diverse selection of
        classes dedicated to mastering this essential aspect of English language
        learning. <br />
        Each class focuses on a specific set of phrasal verbs, providing you
        with ample opportunities to study, practice, and enhance your
        understanding.
        <br /> Within each class, you will find a wealth of materials to guide
        your learning journey. Engage with carefully curated texts that showcase
        phrasal verbs in real-life contexts, allowing you to grasp their usage
        and meaning effortlessly. Dive deep into the intricacies of phrasal
        verbs through insightful exercises designed to sharpen your skills and
        reinforce your comprehension. Navigating our website is simple. <br />
        Just choose a class from the selection above, and you'll gain access to
        a treasure trove of knowledge tailored to that specific topic. Whether
        you're a beginner seeking a solid foundation or an advanced learner
        aiming for mastery, Teacher Arthur Vincent's resources provide the
        guidance and support you need. Embark on your journey to phrasal verb
        proficiency with confidence. Join us today and unlock a world of
        linguistic possibilities. Happy learning!
      </p>
    </article>
  );
};

export default Initial;
