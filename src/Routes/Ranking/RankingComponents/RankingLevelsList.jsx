import blue from "../../../../public/assets/blue.png";
import black from "../../../../public/assets/black.png";
import orange from "../../../../public/assets/orange.png";
import purple from "../../../../public/assets/purple.png";
import red from "../../../../public/assets/red.png";
import green from "../../../../public/assets/green.png";
import yellow from "../../../../public/assets/yellow.png";
import supreme from "../../../../public/assets/supreme.png";
import white from "../../../../public/assets/white.png";
import whitefull from "../../../../public/assets/1.png";
import yellowfull from "../../../../public/assets/2.png";
import bluefull from "../../../../public/assets/3.png";
import redfull from "../../../../public/assets/4.png";
import greenfull from "../../../../public/assets/5.png";
import orangefull from "../../../../public/assets/6.png";
import purplefull from "../../../../public/assets/7.png";
import blackfull from "../../../../public/assets/8.png";
import blackbronzefull from "../../../../public/assets/9.png";
import blacksilverfull from "../../../../public/assets/10.png";
import blackgoldfull from "../../../../public/assets/11.png";
import blackbronze from "../../../../public/assets/bronze.png";
import blacksilver from "../../../../public/assets/silver.png";
import blackgold from "../../../../public/assets/golden.png";

export const levels = () => {
  return [
    {
      level: 1,
      icon: "fa fa-star",
      color: "#eee",
      textcolor: "black",
      backgroundcolor: "#EDEDED",
      text: "White Belt",
      discount: "0%",
      totalScore: 0,
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/ASSETS%20AND%20LIABILITIES.jpg?updatedAt=1692919364512",
      image: white,
      image2: whitefull,
    },
    {
      level: 2,
      icon: "fa fa-bolt",
      color: "#FFE15E",
      textcolor: "black",
      backgroundcolor: "#FFE15E", 
      text: "Yellow Belt",
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/yellow.png?updatedAt=1711540462002",
      totalScore: 10000,
      image: yellow,
      image2: yellowfull,
    },
    {
      level: 3,
      icon: "fa fa-diamond",
      color: "#4690E1",
      textcolor: "white",
      text: "Blue Belt",
      backgroundcolor: "#4690E1",
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/16.png?updatedAt=1711540461480",
      totalScore: 22000,
      image: blue,
      image2: bluefull,
    },
    {
      level: 4,
      icon: "fa fa-fire",
      color: "#FF6460",
      textcolor: "white",
      backgroundcolor: "#FF6460",
      text: "Red Belt",
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/red.png?updatedAt=1711540460356",
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
      backgroundcolor: "#566115",
      totalScore: 50000,
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/green.png?updatedAt=1711540460421",
      image: green,
      image2: greenfull,
    },
    {
      level: 6,
      icon: "fa fa-sun-o",
      color: "#FB6E02",
      backgroundcolor: "#FC8904",
      textcolor: "white",
      text: "Orange Belt",
      totalScore: 66000,
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/orange.png?updatedAt=1711540461559",
      image: orange,
      image2: orangefull,
    },
    {
      level: 7,
      icon: "fa fa-moon-o",
      color: "#40004B",
      backgroundcolor: "#40004B",
      textcolor: "white",
      text: "Purple Belt",
      totalScore: 83000,
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/purple.png?updatedAt=1711540461792",
      image: purple,
      image2: purplefull,
    },
    {
      level: 8,
      icon: "fa fa-superpowers",
      color: "#ccc",
      textcolor: "white",
      text: "Black Belt",
      backgroundcolor: "#111",
      totalScore: 100000,
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/black.png?updatedAt=1711540461288",
      image: black,
      image2: blackfull,
    },
    {
      level: 9,
      icon: "fa fa-superpowers",
      color: "#864421",
      textcolor: "black",
      text: "Black Belt Bronze Stripe" ,
      backgroundcolor: "#111",
      totalScore: 125000,
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/black.png?updatedAt=1711540461288",
      image: blackbronze,
      image2: blackbronzefull,
    },
    {
      level: 10,
      icon: "fa fa-superpowers",
      color: "grey",
      textcolor: "white",
      text: "Black Belt Silver Stripe",
      backgroundcolor: "#111",
      totalScore: 160000,
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/black.png?updatedAt=1711540461288",
      image: blacksilver,
      image2: blacksilverfull,
    },
    {
      level: 11,
      icon: "fa fa-superpowers",
      color: "#FFFFC1",
      textcolor: "black",
      text: "Black Belt Golden Stripe",
      backgroundcolor: "#111",
      totalScore: 200000,
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/bg/black.png?updatedAt=1711540461288",
      image: blackgold,
      image2: blackgoldfull,
    },
    {
      level: 12,
      icon: "fa fa-eercast",
      color: "#000",
      backgroundcolor: "#222",
      image: supreme,
      textcolor: "white",
      text: "Supreme",
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/Thumbs%20de%20aulas.jpg?updatedAt=1703950987210",
      totalScore: 1200000,
    },
    {
      icon: "fa fa-eercast",
      level: 13,
      color: "#000",
      backgroundcolor: "#ccc",
      discount: "10%",
      textcolor: "black",
      background:
        "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/Thumbs%20de%20aulas.jpg?updatedAt=1703950987210",
      text: "loading",
      image: supreme,
      image2: whitefull,
    },
  ];
};
