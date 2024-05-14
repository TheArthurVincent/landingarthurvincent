import { levels } from "../Ranking/RankingComponents/RankingLevelsList";
import white from "../../../public/assets/white.png";
import whitefull from "../../../public/assets/1.png";

const items = levels();

// Função que verifica o nível do aluno
// export function updateScore(totalScore) {
//   var level = 1;
//   var color = "#000";
//   var icon = "fa fa-star";
//   var color = "#eee";
//   var textcolor = "black";
//   var text = "White Belt";
//   var discount = "0%";
//   var backgroundcolor = "#ccc";
//   var image2 = whitefull;
//   var image = white;
//   var background =
//     "https://ik.imagekit.io/vjz75qw96/assets/assets_for_classes/ASSETS%20AND%20LIABILITIES.jpg?updatedAt=1692919364512";

//   for (let i = 0; i < levels.length; i++) {
//     if (levels[i + 1]) {
//       if (
//         totalScore >= levels[i].totalScore &&
//         totalScore < levels[i + 1].totalScore
//       ) {
//         level = i;
//         color = levels[i].color;
//         icon = levels[i].icon;
//         textcolor = levels[i].textcolor;
//         text = levels[i].text;
//         discount = levels[i].discount;
//         backgroundcolor = levels[i].backgroundcolor;
//         background = levels[i].background;
//         image2 = levels[i].image2;
//         image = levels[i].image;
//         break;
//       }
//     } else {
//       level = i;
//       color = levels[i].color;
//       icon = levels[i].icon;
//       image = levels[i].image;
//       image2 = levels[i].image2;
//       textcolor = levels[i].textcolor;
//       text = levels[i].text;
//       discount = levels[i].discount;
//       backgroundcolor = levels[i].backgroundcolor;
//       background = levels[i].background;
//       break;
//     }
//   }
//   return {
//     level,
//     color,
//     icon,
//     image,
//     image2,
//     textcolor,
//     text,
//     discount,
//     backgroundcolor,
//     background,
//   };
// }

// Função que verifica o nível do aluno
