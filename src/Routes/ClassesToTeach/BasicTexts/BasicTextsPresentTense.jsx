import React, { useEffect } from "react";
import {
  BackToHomePage,
  logout24h,
} from "../../../Resources/UniversalComponents";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../../Resources/Components/RouteBox";
import {
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../../Styles/Styles";
import { HThree } from "../../MyClasses/MyClasses.Styled";

export function BasicTextsPresentTense() {
  useEffect(() => {
    logout24h();
  }, []);

  const presentations = [
    {
      title: "Text 1: Maria from Brazil",
      text: "Hello, everyone! My name is Maria. I'm from Brazil. I'm 25 years old. I work as a teacher. I'm single. I love spending time on the beach and dancing samba with my friends. Brazil is known for its beautiful beaches, and I'm lucky to live near one. Teaching is my passion, and I enjoy helping students learn and grow. In my free time, I also enjoy reading novels and trying out new recipes. Nice to meet you all!",
      srcAudio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639909467&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
    },
    {
      title: "Text 2: Ahmed from Egypt",
      text: "Hi, there! I'm Ahmed, and I come from Egypt. I'm 30 years old. I work as an engineer. I'm married and have two lovely kids. I enjoy exploring historical sites and learning about ancient Egyptian culture. As an engineer, I find joy in designing and creating things that make life easier. In my free time, I like playing soccer with my friends and watching documentaries. I'm excited to be a part of this group!",
      srcAudio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639910796&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
    },
    {
      title: "Text 3: Sophie from France",
      text: "Hello! I'm Sophie, and I'm French. I'm 28 years old. I work as a graphic designer. I'm single and enjoying every moment of my life. France is famous for its art, so I often visit museums. As a graphic designer, I love using colors and shapes to create beautiful designs. I also enjoy outdoor activities like hiking in the countryside.",
      srcAudio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639912275&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
    },
    {
      title: "Text 4: Hiroshi from the US",
      text: "Hi! I'm Hiroshi from the United States. I'm 19 years old. I'm a student, studying computer science. I'm single and focused on my studies at the moment. My family is from Japan, and in Japan, I love practicing traditional tea ceremonies and learning about samurai history. Being a computer science student, I spend a lot of time coding and exploring new technologies. When I have free time, I like playing video games and going for walks in nature. Let's have a great time together!",
      srcAudio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639915080&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
    },
    {
      title: "Text 5: Isabella from Mexico",
      text: "Hi, amigos! I'm Isabella, and I come from Mexico. I'm 35 years old. I work as a nurse. I'm happily married and have a son. In Mexico, I enjoy celebrating cultural festivals and cooking traditional dishes for my family. As a nurse, I find fulfillment in taking care of others and making a positive impact on their lives. During my free time, I like gardening and dancing to Mexican music. Excited to connect with you all!",
      srcAudio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639918404&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
    },
  ];
  const professions = [
    {
      title: "Teacher",
      text: "A teacher is someone who educates students in various subjects. They help students learn and develop skills. Teachers can work in schools, colleges, or even offer private tutoring. In many places, a teacher needs a bachelor's degree in education or the subject they teach. The average salary for teachers varies depending on the location and level of education. In the United States, for example, elementary school teachers earn around $60,000 per year on average.",
    },
    {
      title: "Nurse",
      text: "A nurse is a healthcare professional who takes care of patients in hospitals, clinics, and other medical settings. They assist doctors, administer medications, and provide emotional support to patients. Nurses usually need to complete a nursing program and obtain a nursing license. Salaries for nurses vary based on their experience and location. In the United Kingdom, a registered nurse can earn an average salary of around £25,000 to £35,000 per year.",
    },
    {
      title: "Engineer",
      text: "An engineer is someone who applies scientific and mathematical principles to design and build structures, devices, and systems. There are various types of engineers, such as mechanical, electrical, and civil engineers. Engineers typically have a bachelor's degree in engineering or a related field. Salaries for engineers differ depending on their specialization and experience. In Australia, a mid-level engineer can earn an average salary of AUD 80,000 to AUD 100,000 annually.",
    },
    {
      title: "Accountant",
      text: "An accountant is a professional responsible for managing financial records, preparing tax returns, and analyzing financial data. They play a crucial role in maintaining the financial health of individuals and businesses. To become an accountant, one often needs a degree in accounting or a related field. Salaries for accountants can vary based on location and level of expertise. In Canada, a certified accountant can earn an average salary of around CAD 60,000 to CAD 80,000 per year.",
    },
    {
      title: "Chef",
      text: "A chef is a culinary professional who prepares and cooks meals in restaurants, hotels, and other food establishments. Chefs create menus, oversee kitchen operations, and ensure the quality of dishes. Becoming a chef might involve formal culinary education or years of practical experience. Chef salaries can differ widely based on factors like the type of restaurant and the chef's reputation. In the United States, an executive chef can earn an average annual salary of approximately $50,000 to $80,000.",
    },
  ];

  return (
    <RouteSizeControlBox
      style={{
        backgroundColor: alwaysWhite(),
        padding: "1rem",
        height: "max-content",
        marginBottom: "1rem",
        // maxWidth: "1500px",
      }}
    >
      <HOne>Basic Texts</HOne>
      <BackToHomePage />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <HThree>Presentations</HThree>
        {presentations.map((presentation, index) => {
          return (
            <div style={{ marginBottom: "3rem" }} key={index}>
              <HTwo style={{ fontSize: "1.3rem" }}>{presentation.title}</HTwo>
              <p
                style={{
                  color: alwaysBlack(),
                  padding: "1.1rem",
                  fontSize: "1.2rem",
                }}
              >
                {presentation.text}
              </p>
              <iframe
                width="100%"
                height="100"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={presentation.srcAudio}
                title="Exercise Audio"
              />
              <textarea
                name=""
                id=""
                style={{
                  width: "98%",
                  minHeight: "200px",
                  padding: "1rem",
                  color: primaryColor(),
                  backgroundColor: textPrimaryColorContrast(),
                  fontSize: "1.5rem",
                }}
              />
            </div>
          );
        })}
        <HThree>Professions</HThree>
        <iframe
          width="100%"
          height="200"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1639920315&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
          title="Professiona Audio"
        />
        {professions.map((presentation, index) => {
          return (
            <div style={{ marginBottom: "3rem" }} key={index}>
              <HTwo style={{ fontSize: "1.3rem" }}>{presentation.title}</HTwo>
              <p
                style={{
                  color: alwaysBlack(),
                  padding: "1.1rem",
                  fontSize: "1.2rem",
                }}
              >
                {presentation.text}
              </p>
            </div>
          );
        })}
      </div>
      {/* <RouteSizeControlBox>
         
        </RouteSizeControlBox> */}
    </RouteSizeControlBox>
  );
}

export default BasicTextsPresentTense;
