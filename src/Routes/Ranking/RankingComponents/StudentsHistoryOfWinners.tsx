import React, { useEffect, useRef, useState } from "react";
import {
  AnimatedLi,
  DivFont,
  HOne,
} from "../../../Resources/Components/RouteBox";
import {
  backDomain,
  formatNumber,
} from "../../../Resources/UniversalComponents";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  secondaryColor,
} from "../../../Styles/Styles";

import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { SpanDisapear } from "../../Blog/Blog.Styled";

interface modelProps {
  backgroundColor: string;
  place: string;
  picture: string;
  img: string;
  monthlyScore: number;
  name: string;
  borderRadius: any;
  lastname: string;
}
function ModelListItem({
  backgroundColor,
  place,
  picture,
  borderRadius,
  name,
  lastname,
  img,
  monthlyScore,
}: modelProps) {
  return (
    <AnimatedLi
      style={{
        background: backgroundColor,
        alignContent: "center",
        borderRadius,
      }}
    >
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "space-between",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "4.5rem",
              height: "4.5rem",
              objectFit: "cover",
              margin: "auto",
              borderRadius: "50%",
            }}
            src={picture}
          />
        </div>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              borderRadius: "0.5rem",
              marginBottom: "0.2rem",
              padding: "5px",
            }}
          >
            {place} place <br />
            <b>
              {name} {lastname}
            </b>
            <DivFont
              style={{
                textAlign: "center",
                color: alwaysWhite(),
                textShadow: `2px 0 ${alwaysBlack()},
                -2px 0 ${alwaysBlack()}, 
                0 2px ${alwaysBlack()},
                0 -2px ${alwaysBlack()},
                1px 1px ${alwaysBlack()},
                -1px -1px ${alwaysBlack()},
                1px -1px ${alwaysBlack()},
                -1px 1px ${alwaysBlack()}`,
              }}
            >
              {formatNumber(monthlyScore)}
            </DivFont>
          </div>
        </div>
        <img
          style={{
            width: "4.5rem",
            height: "4.5rem",
            objectFit: "cover",
            margin: "auto",
          }}
          src={img}
        />
      </div>
    </AnimatedLi>
  );
}
interface StudentsRankingProps {
  headers: MyHeadersType | null;
  monthNow: string;
}

export default function StudentsHistoryOfWinners({
  headers,
  monthNow,
}: StudentsRankingProps) {
  interface StudentsType {
    id: string;
    lastname: string;
    name: string;
    picture: string;
    username: string;
    monthlyScore: number;
    totalScore: number;
  }

  interface UserType {
    id: string;
    name: string;
    lastname: string;
    ankiEmail: string;
    ankiPassword: string;
    dateOfBirth: string;
    doc: string;
    email: string;
    googleDriveLink: string;
    permissions: string;
    phoneNumber: string;
    picture: string;
    username: string;
    monthlyScore: number;
    totalScore: number;
  }

  const [students, setStudents] = useState<StudentsType[]>([]);
  const [user, setUser] = useState<UserType>({
    id: "",
    name: "",
    lastname: "",
    ankiEmail: "",
    ankiPassword: "",
    dateOfBirth: "",
    doc: "",
    email: "",
    googleDriveLink: "",
    permissions: "",
    phoneNumber: "",
    picture: "",
    username: "",
    monthlyScore: 0,
    totalScore: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdm, setIsAdm] = useState<boolean>(false);

  const actualHeaders = headers || {};

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "");
    setUser(getLoggedUser);
    getLoggedUser.id === "651311fac3d58753aa9281c5" ? setIsAdm(true) : null;
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/scoresranking/`, {
        headers: actualHeaders,
      });
      setStudents(response.data.listOfStudents);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao encontrar alunos");
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const gettingMonth = async (item: any) => {
    console.log(item);
    setLoading(false);

    try {
      const response = await axios.get(
        `${backDomain}/api/v1/scorestotalranking/`,
        {
          headers: actualHeaders,
        }
      );
      setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }

  };
  const thisMonth = [
    {
      place: "1st",
      idx: 0,
      month: monthNow,

      backgroundColor: "gold radial-gradient(white, gold)",
      img: "https://ik.imagekit.io/vjz75qw96/assets/icons/10.png?updatedAt=1719494355076",
    },
    {
      place: "2nd",
      idx: 1,
      month: monthNow,

      backgroundColor: "grey radial-gradient(white, grey)",
      img: "https://ik.imagekit.io/vjz75qw96/assets/icons/11.png?updatedAt=1719494355185",
    },
    {
      place: "3rd",
      idx: 2,
      month: monthNow,
      backgroundColor: "#A0522D radial-gradient(white, #A0522D)",
      img: "https://ik.imagekit.io/vjz75qw96/assets/icons/12.png?updatedAt=1719494355128",
    },
  ];

  const history = [
    [
      {
        month: "Mai/2024",
        name: "Tamires",
        lastname: "Pereira de Paula",
        monthlyScore: 9610,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/tamires.png?updatedAt=1705579411543",
      },
      {
        month: "Mai/2024",
        name: "Ana",
        lastname: "Albuquerque",
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/ana.png?updatedAt=1710854639094",
        monthlyScore: 8315,
      },
      {
        month: "Mai/2024",
        name: "Fernando",
        lastname: "Zanatta",
        monthlyScore: 7515,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/fernando.jpg?updatedAt=1711499015088",
      },
    ],
    [
      {
        month: "Apr/2024",
        name: "Fernando",
        lastname: "Zanatta",
        monthlyScore: 12430,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/fernando.jpg?updatedAt=1711499015088",
      },
      {
        month: "Apr/2024",
        name: "Ana",
        lastname: "Albuquerque",
        monthlyScore: 12155,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/ana.png?updatedAt=1710854639094",
      },
      {
        month: "Apr/2024",
        name: "Tamires",
        lastname: "Pereira de Paula",
        monthlyScore: 11442,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/tamires.png?updatedAt=1705579411543",
      },
    ],
    [
      {
        month: "Mar/2024",
        name: "Tamires",
        lastname: "Pereira de Paula",
        monthlyScore: 13322,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/tamires.png?updatedAt=1705579411543",
      },
      {
        month: "Mar/2024",
        name: "Raquel",
        lastname: "Christina Audi Blotta",
        monthlyScore: 11685,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/raquel.png?updatedAt=1705579411544",
      },
      {
        month: "Mar/2024",
        name: "Nayara",
        lastname: "Arantes",
        monthlyScore: 9700,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/nayara.jpg?updatedAt=1706290399446",
      },
    ],
    [
      {
        month: "Fev/2024",
        name: "Raquel",
        lastname: "Christina Audi Blotta",
        monthlyScore: 10000,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/raquel.png?updatedAt=1705579411544",
      },
      {
        month: "Fev/2024",
        name: "Tamires",
        lastname: "Pereira de Paula",
        monthlyScore: 8400,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/tamires.png?updatedAt=1705579411543",
      },
      {
        name: "Gustavo",
        lastname: "Gomes",
        monthlyScore: 8000,
        picture:
          "https://ik.imagekit.io/vjz75qw96/assets/students/gustavo.png?updatedAt=1705579411629",
        month: "Fev/2024",
      },
    ],
  ];
  const a = useRef(null);

  const gold = {
    place: "1st",
    img: "https://ik.imagekit.io/vjz75qw96/assets/icons/10.png?updatedAt=1719494355076",
    backgroundColor: "gold radial-gradient(white, gold)",
  };
  const silver = {
    place: "2nd",
    img: "https://ik.imagekit.io/vjz75qw96/assets/icons/11.png?updatedAt=1719494355185",
    backgroundColor: "grey radial-gradient(white, grey)",
  };
  const bronze = {
    place: "3rd",
    img: "https://ik.imagekit.io/vjz75qw96/assets/icons/12.png?updatedAt=1719494355128",
    backgroundColor: "#A0522D radial-gradient(white, #A0522D)",
  };
  return ( <></>
    // <>
    //   {isAdm && (
    //     <div ref={a}>
    //       {loading ? (
    //         <CircularProgress style={{ color: secondaryColor() }} />
    //       ) : (
    //         <ul
    //           style={{
    //             height: "30rem",
    //             border: `#eee 1px solid`,
    //             background: `${alwaysWhite()} radial-gradient(white, ${alwaysWhite()})`,
    //             padding: "1rem",
    //             borderRadius: "5px",
    //             width: "70vw",
    //             maxWidth: "40rem",
    //             display: "grid",
    //             textAlign: "center",
    //             margin: "auto",
    //           }}
    //         >
    //           <HOne>{monthNow}</HOne>
    //           {thisMonth.map((item, index) => {
    //             return (
    //               <>
    //                 <ModelListItem
    //                   borderRadius={
    //                     index == 0 ? "1rem" : index == 1 ? "2rem" : "3rem"
    //                   }
    //                   key={index}
    //                   backgroundColor={
    //                     index == 0
    //                       ? gold.backgroundColor
    //                       : index == 1
    //                       ? silver.backgroundColor
    //                       : bronze.backgroundColor
    //                   }
    //                   img={
    //                     index == 0
    //                       ? gold.img
    //                       : index == 1
    //                       ? silver.img
    //                       : bronze.img
    //                   }
    //                   place={
    //                     index == 0
    //                       ? gold.place
    //                       : index == 1
    //                       ? silver.place
    //                       : bronze.place
    //                   }
    //                   name={students[index].name}
    //                   lastname={students[index].lastname}
    //                   monthlyScore={students[index].monthlyScore}
    //                   picture={students[index].picture}
    //                 />
    //               </>
    //             );
    //           })}
    //         </ul>
    //       )}
    //     </div>
    //   )}
    //   {history.map((month, index) => {
    //     return (
    //       <ul
    //         style={{
    //           height: "30rem",
    //           border: `#eee 1px solid`,
    //           background: `${lightGreyColor()} radial-gradient(white, ${lightGreyColor()})`,
    //           padding: "1rem",
    //           borderRadius: "5px",
    //           width: "70vw",
    //           maxWidth: "40rem",
    //           display: "grid",
    //           textAlign: "center",
    //           margin: "auto",
    //           marginTop: "1rem",
    //         }}
    //       >
    //         <HOne>{month[0].month}</HOne>
    //         <>
    //           {month.map((item, i) => (
    //             <span>
    //               <ModelListItem
    //                 borderRadius={i == 0 ? "1rem" : i == 1 ? "2rem" : "3rem"}
    //                 key={`${index}-${i}`}
    //                 backgroundColor={
    //                   i == 0
    //                     ? gold.backgroundColor
    //                     : i == 1
    //                     ? silver.backgroundColor
    //                     : bronze.backgroundColor
    //                 }
    //                 img={i == 0 ? gold.img : i == 1 ? silver.img : bronze.img}
    //                 place={
    //                   i == 0 ? gold.place : i == 1 ? silver.place : bronze.place
    //                 }
    //                 name={item.name}
    //                 lastname={item.lastname}
    //                 monthlyScore={item.monthlyScore}
    //                 picture={item.picture}
    //               />
    //             </span>
    //           ))}
    //         </>
    //       </ul>
    //     );
    //   })}
    //   <ArvinButton
    //     onDoubleClick={() => {
    //       gettingMonth(
    //         thisMonth.map((item, index) => ({
    //           month: monthNow,
    //           place: item.place,
    //           name: students[index].name,
    //           lastname: students[index].lastname,
    //           monthlyScore: students[index].monthlyScore,
    //           picture: students[index].picture,
    //         }))
    //       );
    //     }}
    //   >
    //     Gerar Mês De Junho
    //   </ArvinButton>
    // </>
  );
}
