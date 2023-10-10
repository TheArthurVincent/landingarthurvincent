import React, { useEffect, useState } from "react";
import { logout24h } from "../../../Resources/UniversalComponents";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../../Resources/Components/RouteBox";
import { primaryColor, primaryContrast } from "../../../Styles/Styles";
import { HThree } from "../../MyClasses/MyClasses.Styled";

export function BasicTexts() {
  useEffect(() => {
    logout24h();
  }, []);

  const presentations = [
    {
      title: "Text 1: Maria from Brazil",
      text: "Hello, everyone! My name is Maria. I'm from Brazil. I'm 25 years old. I work as a teacher. I'm single. I love spending time on the beach and dancing samba with my friends. Brazil is known for its beautiful beaches, and I'm lucky to live near one. Teaching is my passion, and I enjoy helping students learn and grow. In my free time, I also enjoy reading novels and trying out new recipes. Nice to meet you all!",
    },
    {
      title: "Text 2: Ahmed from Egypt",
      text: "Hi, there! I'm Ahmed, and I come from Egypt. I'm 30 years old. I work as an engineer. I'm married and have two lovely kids. I enjoy exploring historical sites and learning about ancient Egyptian culture. As an engineer, I find joy in designing and creating things that make life easier. In my free time, I like playing soccer with my friends and watching documentaries. I'm excited to be a part of this group!",
    },
    {
      title: "Text 3: Sophie from France",
      text: "Hello! I'm Sophie, and I'm French. I'm 28 years old. I work as a graphic designer. I'm single and enjoying every moment of my life. France is famous for its art, so I often visit museums. As a graphic designer, I love using colors and shapes to create beautiful designs. I also enjoy outdoor activities like hiking in the countryside.",
    },
    {
      title: "Text 4: Hiroshi from Japan",
      text: "Konnichiwa! I'm Hiroshi from Japan. I'm 22 years old. I'm a student, studying computer science. I'm single and focused on my studies at the moment. In Japan, I love practicing traditional tea ceremonies and learning about samurai history. Being a computer science student, I spend a lot of time coding and exploring new technologies. When I have free time, I like playing video games and going for walks in nature. Let's have a great time together!",
    },
    {
      title: "Text 5: Isabella from Mexico",
      text: "Hola, amigos! I'm Isabella, and I come from Mexico. I'm 35 years old. I work as a nurse. I'm happily married and have a son. In Mexico, I enjoy celebrating cultural festivals and cooking traditional dishes for my family. As a nurse, I find fulfillment in taking care of others and making a positive impact on their lives. During my free time, I like gardening and dancing to Mexican music. Excited to connect with you all!",
    },
  ];

  return (
    <RouteSizeControlBox
      style={{
        backgroundColor: "#ddd",
        padding: "0.5rem",
        height: "max-content",
      }}
    >
      <HOne>Basic Texts</HOne>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <RouteDiv
            style={{
              margin: "0 1rem",
              maxWidth: "800px",
              maxHeight: "700px",
              padding: "1rem",
              overflow: "auto",
            }}
          >
            <HTwo>Presentations</HTwo>
            {presentations.map((presentation, index) => {
              return (
                <div style={{ marginBottom: "3rem" }} key={index}>
                  <HThree style={{ fontSize: "1.3rem" }}>
                    {presentation.title}
                  </HThree>
                  <p style={{ padding: "1.1rem", fontSize: "1.2rem" }}>
                    {presentation.text}
                  </p>
                </div>
              );
            })}
          </RouteDiv>
        </div>
        <RouteSizeControlBox>
          <textarea
            name=""
            id=""
            style={{
              minWidth: "700px",
              minHeight: "700px",
              padding: "1rem",
              backgroundColor: primaryColor(),
              color: primaryContrast(),
              fontSize: "1.5rem",
            }}
          />
        </RouteSizeControlBox>
      </div>
    </RouteSizeControlBox>
  );
}

export default BasicTexts;
