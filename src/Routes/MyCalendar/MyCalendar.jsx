import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import TopBar from "../../Application/TopBar/TopBar";
import { Link } from "react-router-dom";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  primaryColor,
} from "../../Styles/Styles";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";

export default function MyCalendar({ headers }) {
  const today = new Date();
  const futureDates = [];

  for (let i = 0; i < 31; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    futureDates.push(date);
  }

  const events = [
    {
      date: new Date(2024, 3, 17, 7, 30, 0, 0),
      id: 10023,
      status: "marcado",
      description: "Live class for the students",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      student: "Nik",
      date: new Date(2024, 3, 17, 9, 0, 0, 0),
      id: 123,
      status: "marcado",
      description: "",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "Kaulienderson",
      date: new Date(2024, 3, 17, 12, 0, 0, 0),
      id: 123,
      status: "marcado",
      description: "Tutoring session for Kauli",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "Tati",
      date: new Date(2024, 3, 17, 13, 0, 0, 0),
      id: 123,
      status: "marcado",
      description: "Tutoring session for tati",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      date: new Date(2024, 3, 17, 17, 0, 0, 0),
      id: 1231,
      status: "desmarcado",
      student: "Hebert",
      description: "Hebert Hebert",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      date: new Date(2024, 3, 17, 18, 0, 0, 0),
      id: 1231,
      status: "desmarcado",
      student: "Gisele",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      date: new Date(2024, 3, 20, 2, 30, 0, 0),
      id: 1213,
      status: "marcado",
      description: "Group class on Chemistry reactions",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      date: new Date(2024, 3, 19, 1, 30, 0, 0),
      id: 1231,
      status: "desmarcado",
      description: "Lorem LoremL orem",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      date: new Date(2024, 3, 20, 2, 30, 0, 0),
      id: 1213,
      status: "marcado",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      student: "Maria",
      date: new Date(2024, 3, 18, 11, 30, 0, 0),
      id: 1243,
      status: "marcado",
      description: "5",
      link: "www.google.com",
      category: "Prize Tutoring",
    },
    {
      student: "João",
      date: new Date(2024, 3, 21, 12, 30, 0, 0),
      id: 11423,
      status: "marcado",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "João",
      date: new Date(2024, 3, 21, 8, 30, 0, 0),
      id: 11423,
      status: "marcado",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "João",
      date: new Date(2024, 3, 21, 12, 30, 0, 0),
      id: 11423,
      status: "marcado",
      description: "5",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "João",
      date: new Date(2024, 3, 21, 12, 30, 0, 0),
      id: 11423,
      status: "marcado",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "João",
      date: new Date(2024, 3, 21, 13, 30, 0, 0),
      id: 11423,
      status: "marcado",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      date: new Date(2024, 3, 21, 14, 30, 0, 0),
      id: 11423,
      status: "desmarcado",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      student: "João",
      date: new Date(2024, 3, 21, 12, 30, 0, 0),
      id: 11423,
      status: "marcado",
      description: "5",
      link: "www.google.com",
      category: "Tutoring",
    },
  ];
  const { UniversalTexts } = useUserContext();

  return (
    <>
      <TopBar />
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
          <RouteDiv>
            <HOne>{UniversalTexts.calendar}</HOne>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                overflow: "auto",
              }}
            >
              {futureDates.map((date, index) => (
                <div
                  style={{
                    boxShadow: `1px 1px 5px 1px ${lightGreyColor()}`,
                    padding: "0px 0px 10px 0px",
                    margin: "10px 0px",
                    border: `1px solid ${lightGreyColor()}`,
                    minWidth: "14rem",
                    height: "30rem",
                    overflow: "auto",
                  }}
                  key={index}
                >
                  <p
                    style={{
                      padding: "5px",
                      fontFamily: "Athiti",
                      position: "sticky",
                      top: 0,
                      zIndex: 999,
                      fontWeight: 900,
                      textAlign: "center",
                      backgroundColor: index !== 0 ? alwaysBlack() : "#439906",
                      color: alwaysWhite(),
                    }}
                  >
                    {index == 0 && "Today - "}
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {events
                    .filter(
                      (event) =>
                        event.date.toDateString() === date.toDateString()
                    )
                    .sort((a, b) => a.date - b.date)
                    .map((event, indexx) => (
                      <div
                        style={{
                          margin: "5px",
                          padding: "10px 5px",
                          color: alwaysWhite(),
                          backgroundColor:
                            event.category == "Group Class"
                              ? "#306E04"
                              : event.category == "Tutoring"
                              ? primaryColor()
                              : event.category == "Prize Tutoring"
                              ? "#F55C2B"
                              : "#000",
                          textAlign: "center",
                          display: "grid",
                        }}
                        key={event + indexx}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginBottom: "1rem",
                            backgroundColor:
                              event.status == "marcado"
                                ? "#A7D1AE"
                                : event.status == "desmarcado"
                                ? "#E0B5B2"
                                : "#000",
                            padding: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <p
                            style={{
                              color: "black",
                              fontWeight: 600,
                            }}
                          >
                            {event.status == "marcado"
                              ? "Scheduled"
                              : "Canceled"}
                          </p>
                          <i
                            className="fa fa-check-circle-o"
                            aria-hidden="true"
                            style={{
                              fontSize:
                                event.status == "marcado" ? "20px" : "10px",
                              color:
                                event.status == "marcado" ? "green" : "grey",
                            }}
                          />
                          <i
                            className="fa fa-times-circle-o"
                            aria-hidden="true"
                            style={{
                              fontSize:
                                event.status == "desmarcado" ? "20px" : "10px",
                              color:
                                event.status == "desmarcado" ? "red" : "grey",
                            }}
                          />
                        </div>
                        <p
                          style={{
                            fontWeight: 600,
                            fontFamily: "Athiti",
                            fontSize: "1.1rem",
                          }}
                        >
                          <i
                            className={
                              event.category == "Group Class"
                                ? "fa fa-graduation-cap"
                                : event.category == "Tutoring"
                                ? "fa fa-book"
                                : event.category == "Prize Tutoring"
                                ? "fa fa-trophy"
                                : "fa fa-star"
                            }
                            aria-hidden="true"
                          />{" "}
                          {event.category}{" "}
                          {event.student && `- ${event.student}`}
                        </p>
                        <p style={{ fontWeight: 600 }}>
                          <i className={"fa fa-clock-o"} aria-hidden="true" />{" "}
                          {event.date.getHours()}:{event.date.getMinutes()}
                        </p>
                        {event.description && <p>{event.description}</p>}{" "}
                        <span
                          style={{
                            padding: "5px",
                            marginTop: "10px",
                            backgroundColor: alwaysWhite(),
                          }}
                        >
                          <Link target="_blank" to={event.link}>
                            Click here
                          </Link>
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </RouteDiv>
        </RouteSizeControlBox>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}
