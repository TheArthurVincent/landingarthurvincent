import React from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link } from "react-router-dom";
import { CourseCard } from "./EnglishMaterial.Styled";
import { BackToHomePage } from "../../Resources/UniversalComponents";
import { HThree } from "../MyClasses/MyClasses.Styled";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";

const basicClasses = [
  {
    title: "#1 Introduce yourself and other people + To be",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/13.jpg?updatedAt=1713193320347",
    link: "https://drive.google.com/drive/folders/1zry_CNaxivh_UMLOfJahVfm-ancdgTW3",
  },
  {
    title: "#2 Animals, Fruits + Prepositions #1",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px)%20(1).jpg?updatedAt=1713197455034",
    link: "https://drive.google.com/drive/folders/1y1pPJFANcnxEo1h933f48S3SYWMHi2cY",
  },
  {
    title: "#3 Family Members + Possessions and Possessives #1",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/10.jpg?updatedAt=1713193320313",
    link: "https://drive.google.com/drive/folders/1pFGbSrAdBtD_puUiLgJLR6gnzTBtwox1",
  },
  {
    title:
      "#4 Question words - Demonstrative pronouns -  Colors - Numbers",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/9.jpg?updatedAt=1713193320382",
    link: "https://drive.google.com/drive/folders/1SOikRcwChCyFM7feeNT7pmkWddGhcdg8",
  },
  {
    title: "#5 Verbs in General + Here, There",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px)%20(2).jpg?updatedAt=1713198854655",
    link: "https://drive.google.com/drive/folders/1FcM_9kbv6Zq5dWon2PobEfOBOwjOizk2",
  },
  {
    title: "#6 Practice #1",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px).jpg?updatedAt=1713193340332",
    link: "https://drive.google.com/drive/folders/10sZgn91DY8MdM1nqGDBVNEXJF-Q9cRgi",
  },
  {
    title: "#7 Professions, Days of the week, Months, Dates",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/11.jpg?updatedAt=1713193320404",
    link: "https://drive.google.com/drive/folders/1rGl3D0OnrGXFMda9RPXZQhlRR-Ci0XyI",
  },
  {
    title: "#8 ING, To be Past tente, Prepositions #2, Do does don't doesn't",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/8.jpg?updatedAt=1713193320262",
    link: "https://drive.google.com/drive/folders/1snIRmMiCHHzrIOHaIp2CSi9mOGd46M-X?usp=drive_link",
  },
  {
    title:
      "#9 Weather + Empty it, Adjectives + There is + There are",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/3.jpg?updatedAt=1713193320661",
    link: "https://drive.google.com/drive/folders/1juK9t2EJ2jXVks9assXQyLeu_cC4b9Eh?usp=drive_link",
  },
  {
    title: "#10 Past Tense - Ed, Didn't Did, There was there were [to, for]",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/7.jpg?updatedAt=1713193320464",
    link: "https://drive.google.com/drive/folders/14tWI47jBecr3ziVom2-JCVswbPyLRR-3?usp=drive_link",
  },
  {
    title: "#11 Modal Verbs #1 + Possessions #2 + Adjectives",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/4.jpg?updatedAt=1713193320782",
    link: "https://drive.google.com/drive/folders/1aAwxSL8LCP1O_Cb--AG4ZL-T_IEEyhLG?usp=drive_link",
  },
  {
    title: "#12 Modal Verbs #2 + Pronouns #2 - Frequency",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/6.jpg?updatedAt=1713193320183",
    link: "https://drive.google.com/drive/folders/17WnsecpVlxpP8zxxrqqWz80qyLZr9GrQ?usp=drive_link",
  },

  {
    title: "#13 Any some no every + Intensity",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/5.jpg?updatedAt=1713193320076",
    link: "https://drive.google.com/drive/folders/1u3rQKeT6z7OWHZFmiouR-A9_R3SszwnH?usp=drive_link",
  },
  {
    title: "#14 Practice #2",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px).jpg?updatedAt=1713193340332",
    link: "https://drive.google.com/drive/folders/1r6g30ttrD19e4GKNulYsxopYOzahdB8J?usp=drive_link",
  },
];


const intermediaryClasses = [
  {
    title: "Worth",
    img: "https://smartasset.com/wp-content/uploads/sites/2/2021/01/counting-money-picture-id1211981322-2.jpg",
    link: "https://is-it-worth-it.netlify.app/",
  },
  {
    title: "#6 Measurements of Size and Dimension",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px)%20(3).jpg?updatedAt=1713200415910",
    link: "https://drive.google.com/drive/folders/1kVT9vOG_EP5wqg5PsRGY-j1EWI0iRCuh?usp=drive_link",
  },
  {
    title: "#15 US Astronaut is First to Visit Space and Deepest Ocean",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/12.jpg?updatedAt=1713193320762",
    link: "https://drive.google.com/drive/folders/1yNmovyApc2RZZli79-dq66t7NfwF7aWQ",
  },
  
];

const advancedClasses = [
  {
    title: "Advanced Phrasal verbs",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/weekend.jpg?updatedAt=1688471773704",
    link: "https://arvin-phrasal-verbs.netlify.app/",
  },
];

const thematicClasses = [
  {
    title: "The Beauty of Complexity",
    img: "https://www.usnews.com/object/image/00000186-7a58-d975-aff7-fffbc8910000/iguazu-falls-stock.jpg?update-time=1677089883729&size=responsive970",
    link: "https://the-beauty-of-complexity.netlify.app/",
  },
  {
    title: "The Smartest Dog Breed",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/malinoisbg.jpg?updatedAt=1687867713745",
    link: "https://smartest-dog-breed.netlify.app/",
  },
];

export default function EnglishMaterial({ headers }) {
  const { UniversalTexts } = useUserContext();

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    gap: "1rem",
    margin: "0 1rem",
    overflowY: "auto",
    overflowX: "scroll",
    maxWidth: "100%",
    padding: "1rem",
  };

  return (
    <>
      <TopBar />
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
          <RouteDiv>
            <HOne>{UniversalTexts.englishMaterial}</HOne>
            <BackToHomePage />
            {[
              { title: UniversalTexts.basicClasses, list: basicClasses },
              {
                title: UniversalTexts.intermediaryClasses,
                list: intermediaryClasses,
              },
              { title: UniversalTexts.advancedClasses, list: advancedClasses },
              { title: UniversalTexts.thematicClasses, list: thematicClasses },
            ].map((item, index) => {
              return (
                <div key={index}>
                  <HThree>{item.title}</HThree>
                  <div style={cardStyle}>
                    {item.list.map((course, index) => {
                      return (
                        <Link key={index} to={course.link} target="_blank">
                          <CourseCard>
                            <p>{course.title}</p>
                            <img src={course.img} alt="" />
                          </CourseCard>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </RouteDiv>
        </RouteSizeControlBox>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}
