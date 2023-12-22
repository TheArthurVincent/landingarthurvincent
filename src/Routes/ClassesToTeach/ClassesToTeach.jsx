import React from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link, NavLink } from "react-router-dom";
import { CourseCard } from "./ClassesToTeach.Styled";
import { BackToHomePage } from "../../Resources/UniversalComponents";
import { HThree } from "../MyClasses/MyClasses.Styled";
import TopBar from "../../Application/TopBar/TopBar";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";

const basicClasses = [
  {
    title: "Basic texts - Present Tense",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/bg2.png?updatedAt=1687554564387",
    link: "https://arvin-phrasal-verbs.netlify.app/",
  },
];

const advancedClasses = [
  {
    title: "Phrasal verbs",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/weekend.jpg?updatedAt=1688471773704",
    link: "https://arvin-phrasal-verbs.netlify.app/",
  },
];
const intermediaryClasses = [
  {
    title: "Worth",
    img: "https://smartasset.com/wp-content/uploads/sites/2/2021/01/counting-money-picture-id1211981322-2.jpg",
    link: "https://is-it-worth-it.netlify.app/",
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
export default function ClassesToTeach() {
  const { UniversalTexts } = useUserContext();

  return (
    <>
      <TopBar />{" "}
      <RouteSizeControlBox>
        <RouteDiv>
          <HOne>{UniversalTexts.englishMaterial}</HOne>
          <BackToHomePage />
          <div>
            {" "}
            <HThree>{UniversalTexts.basicClasses}</HThree>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                gap: "1rem",
                margin: "0 1rem",
                flexDirection: "row-reverse",
                flexWrap: "wrap",
              }}
            >
              {basicClasses.map((course, index) => {
                return (
                  <Link key={index} to={course.link} target="_blank">
                    <CourseCard>
                      <h3>{course.title}</h3>
                      <img
                        style={{
                          height: "240px",
                          width: "240px",
                          objectFit: "cover",
                          objectPosition: "left",
                        }}
                        src={course.img}
                        alt=""
                      />
                    </CourseCard>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            {" "}
            <HThree>{UniversalTexts.intermediaryClasses}</HThree>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                gap: "1rem",
                margin: "0 1rem",

                flexDirection: "row-reverse",
                flexWrap: "wrap",
              }}
            >
              {intermediaryClasses.map((course, index) => {
                return (
                  <NavLink key={index} to={course.link} target="_blank">
                    <CourseCard>
                      <h3>{course.title}</h3>
                      <img
                        style={{
                          height: "240px",
                          width: "240px",
                          objectFit: "cover",
                          objectPosition: "left",
                        }}
                        src={course.img}
                        alt=""
                      />
                    </CourseCard>
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div>
            <HThree>{UniversalTexts.advancedClasses}</HThree>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                gap: "1rem",
                margin: "0 1rem",

                flexDirection: "row-reverse",
                flexWrap: "wrap",
              }}
            >
              {advancedClasses.map((course, index) => {
                return (
                  <NavLink key={index} to={course.link} target="_blank">
                    <CourseCard>
                      <h3>{course.title}</h3>
                      <img
                        style={{
                          height: "240px",
                          width: "240px",
                          objectFit: "cover",
                          objectPosition: "left",
                        }}
                        src={course.img}
                        alt=""
                      />
                    </CourseCard>
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div>
            <HThree>{UniversalTexts.thematicClasses}</HThree>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                gap: "1rem",
                margin: "0 1rem",

                flexDirection: "row-reverse",
                flexWrap: "wrap",
              }}
            >
              {thematicClasses.map((course, index) => {
                return (
                  <NavLink key={index} to={course.link} target="_blank">
                    <CourseCard>
                      <h3>{course.title}</h3>
                      <img
                        style={{
                          height: "240px",
                          width: "240px",
                          objectFit: "cover",
                          objectPosition: "left",
                        }}
                        src={course.img}
                        alt=""
                      />
                    </CourseCard>
                  </NavLink>
                );
              })}
            </div>
            <BackToHomePage />
          </div>
        </RouteDiv>
      </RouteSizeControlBox>
    </>
  );
}
