import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link } from "react-router-dom";
import { CourseCard } from "./EnglishMaterial.Styled";
import { BackToHomePage, Xp, backDomain } from "../../Resources/UniversalComponents";
import { HThree } from "../MyClasses/MyClasses.Styled";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import { Button } from "@mui/material";
import { alwaysWhite, transparentWhite } from "../../Styles/Styles";

const baslasses = [
  {
    title: "#1 Introduce yourself and other people + To be",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/13.jpg?updatedAt=1713193320347",
    link: "https://drive.google.com/drive/folders/1zry_CNaxivh_UMLOfJahVfm-ancdgTW3",
    category: "basicClasses",
  },
  {
    title: "#2 Animals, Fruits + Prepositions #1",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px)%20(1).jpg?updatedAt=1713197455034",
    link: "https://drive.google.com/drive/folders/1y1pPJFANcnxEo1h933f48S3SYWMHi2cY",
    category: "basicClasses",
  },
  {
    title: "#3 Family Members + Possessions and Possessives #1",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/10.jpg?updatedAt=1713193320313",
    link: "https://drive.google.com/drive/folders/1pFGbSrAdBtD_puUiLgJLR6gnzTBtwox1",
    category: "basicClasses",
  },
  {
    title: "#4 Question words - Demonstrative pronouns -  Colors - Numbers",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/9.jpg?updatedAt=1713193320382",
    link: "https://drive.google.com/drive/folders/1SOikRcwChCyFM7feeNT7pmkWddGhcdg8",
    category: "basicClasses",
  },
  {
    title: "#5 Verbs in General + Here, There",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px)%20(2).jpg?updatedAt=1713198854655",
    link: "https://drive.google.com/drive/folders/1FcM_9kbv6Zq5dWon2PobEfOBOwjOizk2",
    category: "basicClasses",
  },
  {
    title: "#6 Practice #1",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px).jpg?updatedAt=1713193340332",
    link: "https://drive.google.com/drive/folders/10sZgn91DY8MdM1nqGDBVNEXJF-Q9cRgi",
    category: "basicClasses",
  },
  {
    title: "#7 Professions, Days of the week, Months, Dates",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/11.jpg?updatedAt=1713193320404",
    link: "https://drive.google.com/drive/folders/1rGl3D0OnrGXFMda9RPXZQhlRR-Ci0XyI",
    category: "basicClasses",
  },
  {
    title: "#8 ING, To be Past tente, Prepositions #2, Do does don't doesn't",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/8.jpg?updatedAt=1713193320262",
    link: "https://drive.google.com/drive/folders/1snIRmMiCHHzrIOHaIp2CSi9mOGd46M-X?usp=drive_link",
    category: "basicClasses",
  },
  {
    title: "#9 Weather + Empty it, Adjectives + There is + There are",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/3.jpg?updatedAt=1713193320661",
    link: "https://drive.google.com/drive/folders/1juK9t2EJ2jXVks9assXQyLeu_cC4b9Eh?usp=drive_link",
    category: "basicClasses",
  },
  {
    title: "#10 Past Tense - Ed, Didn't Did, There was there were [to, for]",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/7.jpg?updatedAt=1713193320464",
    link: "https://drive.google.com/drive/folders/14tWI47jBecr3ziVom2-JCVswbPyLRR-3?usp=drive_link",
    category: "basicClasses",
  },
  {
    title: "#11 Modal Verbs #1 + Possessions #2 + Adjectives",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/4.jpg?updatedAt=1713193320782",
    link: "https://drive.google.com/drive/folders/1aAwxSL8LCP1O_Cb--AG4ZL-T_IEEyhLG?usp=drive_link",
    category: "basicClasses",
  },
  {
    title: "#12 Modal Verbs #2 + Pronouns #2 - Frequency",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/6.jpg?updatedAt=1713193320183",
    link: "https://drive.google.com/drive/folders/17WnsecpVlxpP8zxxrqqWz80qyLZr9GrQ?usp=drive_link",
    category: "basicClasses",
  },

  {
    title: "#13 Any some no every + Intensity",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/5.jpg?updatedAt=1713193320076",
    link: "https://drive.google.com/drive/folders/1u3rQKeT6z7OWHZFmiouR-A9_R3SszwnH?usp=drive_link",
    category: "basicClasses",
  },
  {
    title: "#14 Practice #2",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px).jpg?updatedAt=1713193340332",
    link: "https://drive.google.com/drive/folders/1r6g30ttrD19e4GKNulYsxopYOzahdB8J?usp=drive_link",
    category: "basicClasses",
  },
];

const intermedialasses = [
  {
    title: "Worth",
    img: "https://smartasset.com/wp-content/uploads/sites/2/2021/01/counting-money-picture-id1211981322-2.jpg",
    link: "https://is-it-worth-it.netlify.app/",
    category: "intermediaryClasses",
  },
  {
    title: "#6 Measurements of Size and Dimension",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px)%20(3).jpg?updatedAt=1713200415910",
    link: "https://drive.google.com/drive/folders/1kVT9vOG_EP5wqg5PsRGY-j1EWI0iRCuh?usp=drive_link",
    category: "intermediaryClasses",
  },
  {
    title: "#15 US Astronaut is First to Visit Space and Deepest Ocean",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/12.jpg?updatedAt=1713193320762",
    link: "https://drive.google.com/drive/folders/1yNmovyApc2RZZli79-dq66t7NfwF7aWQ",
    category: "intermediaryClasses",
  },
];

const advanclasses = [
  {
    title: "Advanced Phrasal verbs",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/weekend.jpg?updatedAt=1688471773704",
    link: "https://arvin-phrasal-verbs.netlify.app/",
    category: "advancedClasses",
  },
];

const themcClasses = [
  {
    title: "The Beauty of Complexity",
    img: "https://www.usnews.com/object/image/00000186-7a58-d975-aff7-fffbc8910000/iguazu-falls-stock.jpg?update-time=1677089883729&size=responsive970",
    link: "https://the-beauty-of-complexity.netlify.app/",
    category: "thematicClasses",
  },
  {
    title: "The Smartest Dog Breed",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/malinoisbg.jpg?updatedAt=1687867713745",
    link: "https://smartest-dog-breed.netlify.app/",
    category: "thematicClasses",
  },
  {
    title: "Payment Terms",
    img: "https://ik.imagekit.io/vjz75qw96/assets/capas/Arvin%20Resources%20(300%20x%20300%20px).png?updatedAt=1713216418484",
    link: "https://drive.google.com/drive/folders/1jc7uAaZBj3GUXSAeCND4pTPsT03m_kDx",
    category: "thematicClasses",
  },
];

export default function EnglishMaterial({ headers }) {
  const { UniversalTexts } = useUserContext();


  const [isVisible, setIsVisible] = useState(false);
  const [basicClasses, setBasicClasses] = useState([]);
  const [intermediaryClasses, setIntermediaryClasses] = useState([]);
  const [advancedClasses, setAdvancedClasses] = useState([]);
  const [thematicClasses, setThematicClasses] = useState([]);
  const [permissions, setPermissions] = useState("")

  const handleSeeModal = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setPermissions(getLoggedUser.permissions);
  }, []);


  const fetchMaterial = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/material/`, { headers })
      const basic = response.data.basicClasses;
      const intermediate = response.data.intermediateClasses;
      const advanced = response.data.advancedClasses;
      const thematic = response.data.thematicClasses;
      setBasicClasses(basic);
      setIntermediaryClasses(intermediate);
      setAdvancedClasses(advanced);
      setThematicClasses(thematic);
    } catch (error) {
      alert("Erro")
    }
  }

  useEffect(() => {
    fetchMaterial();
  }, []);


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


  const lists = [
    { title: UniversalTexts.basicClasses, list: basicClasses },
    {
      title: UniversalTexts.intermediaryClasses,
      list: intermediaryClasses,
    },
    { title: UniversalTexts.advancedClasses, list: advancedClasses },
    { title: UniversalTexts.thematicClasses, list: thematicClasses },
  ]
  return (
    <>
      <TopBar />
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
          <RouteDiv>
            <HOne>{UniversalTexts.englishMaterial}</HOne>
            <BackToHomePage />
            {lists.map((item, index) => {
              return (
                <div key={index}>
                  <HThree>{item.title}</HThree>
                  <div style={cardStyle}>
                    {item.list.map((course, index) => {
                      return (
                        <div key={index}>
                          <Button
                            onClick={() => handleSeeModal()}
                            style={{ display: permissions == "superadmin" ? "block" : "none" }}
                          >
                            <i className="fa fa-edit" aria-hidden="true" />
                          </Button>
                          <Link to={course.link} target="_blank">
                            <CourseCard>
                              <p>{course.title}</p>
                              <img src={course.img} alt="" />
                            </CourseCard>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </RouteDiv>
          <div
            style={{
              backgroundColor: transparentWhite(),
              width: "10000px",
              height: "10000px",
              top: "0",
              left: "0",
              position: "fixed",
              zIndex: 99,
              display: isVisible ? "block" : "none",
              padding: "1rem",
            }}
            onClick={() => handleSeeModal()}
          />
          <div
            className="modal"
            style={{
              position: "fixed",
              display: isVisible ? "block" : "none",
              zIndex: 100,
              backgroundColor: alwaysWhite(),
              boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.5)",
              padding: "1rem",
              width: "20rem",
              height: "30rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Xp onClick={() => handleSeeModal()}>X</Xp>
            <h2
              style={{
                margin: "0.5rem 0",
              }}
            >
              {UniversalTexts.editPost}
            </h2>

          </div>
        </RouteSizeControlBox >
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )
      }
    </>
  );
}
