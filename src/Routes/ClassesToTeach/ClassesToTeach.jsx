import React from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link, NavLink } from "react-router-dom";
import { CourseCard } from "./ClassesToTeach.Styled";
import { BackToHomePage } from "../../Resources/UniversalComponents";

const internalCourses = [
  {
    title: "Phrasal verbs",
    img: "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/weekend.jpg?updatedAt=1688471773704",
    link: "/phrasal-verbs",
  },
];

const externalCourses = [
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
  {
    title: "Worth",
    img: "https://smartasset.com/wp-content/uploads/sites/2/2021/01/counting-money-picture-id1211981322-2.jpg",
    link: "https://is-it-worth-it.netlify.app/",
  },
];
export default function ClassesToTeach() {
  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <HOne>Classes</HOne>
        <BackToHomePage />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "0.5rem",
            maxWidth: "70rem",
            flexDirection: "row-reverse",
            flexWrap: "wrap",
          }}
        >
          {externalCourses.map((course, index) => {
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
          {internalCourses.map((course, index) => {
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
      </RouteDiv>
    </RouteSizeControlBox>
  );
}
