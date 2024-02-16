import blue from "../../../../public/assets/blue.png";
import black from "../../../../public/assets/black.png";
import orange from "../../../../public/assets/orange.png";
import white from "../../../../public/assets/white.png";
import purple from "../../../../public/assets/purple.png";
import red from "../../../../public/assets/red.png";
import green from "../../../../public/assets/green.png";
import yellow from "../../../../public/assets/yellow.png";
import supreme from "../../../../public/assets/supreme.png";

import whitefull from "../../../../public/assets/1.png";
import yellowfull from "../../../../public/assets/2.png";
import bluefull from "../../../../public/assets/3.png";
import redfull from "../../../../public/assets/4.png";
import greenfull from "../../../../public/assets/5.png";
import orangefull from "../../../../public/assets/6.png";
import purplefull from "../../../../public/assets/7.png";
import blackfull from "../../../../public/assets/8.png";

export const levels = () => {
  return [
    {
      level: 1,
      icon: "fa fa-star",
      color: "#eee",
      textcolor: "black",
      text: "White Belt",
      discount: "0%",
      totalScore: 0,
      image: white,
      image2: whitefull,
    },
    {
      level: 2,
      icon: "fa fa-bolt",
      color: "#F5BD33",
      textcolor: "black",
      text: "Yellow Belt",
      discount: "5%",
      totalScore: 10000,
      image: yellow,
      image2: yellowfull,
    },
    {
      level: 3,
      icon: "fa fa-diamond",
      color: "#0C55A5",
      textcolor: "white",
      text: "Blue Belt",
      discount: "7%",
      totalScore: 20000,
      image: blue,
      image2: bluefull,
    },
    {
      level: 4,
      icon: "fa fa-fire",
      color: "#B7050B",
      textcolor: "white",
      text: "Red Belt",
      discount: "10%",
      totalScore: 35000,
      image: red,
      image2: redfull,
    },
    {
      level: 5,
      icon: "fa fa-tree",
      color: "#ADB762",
      textcolor: "white",
      text: "Green Belt",
      discount: "12%",
      totalScore: 50000,
      image: green,
      image2: greenfull,
    },
    {
      level: 6,
      icon: "fa fa-sun-o",
      color: "#FB6E02",
      discount: "15%",
      textcolor: "white",
      text: "Orange Belt",
      totalScore: 65000,
      image: orange,
      image2: orangefull,
    },
    {
      level: 7,
      icon: "fa fa-moon-o",
      color: "#703A74",
      discount: "20%",
      textcolor: "white",
      text: "Purple Belt",
      totalScore: 80000,
      image: purple,
      image2: purplefull,
    },
    {
      level: 8,
      icon: "fa fa-superpowers",
      color: "#333",
      textcolor: "white",
      text: "Black Belt",
      discount: "25%",
      totalScore: 100000,
      image: black,
      image2: blackfull,
    },
    {
      level: 9,
      icon: "fa fa-edit",
      color: "#789",
      textcolor: "white",
      text: "SUPREME",
      discount: "%",
      totalScore: 1200000,
      image: supreme,
    },
    {
      level: 10,
      icon: "fa fa-edit",
      color: "#000",
      textcolor: "black",
      text: "loading",
      image: white,
      image2: whitefull,
    },
  ];
};
