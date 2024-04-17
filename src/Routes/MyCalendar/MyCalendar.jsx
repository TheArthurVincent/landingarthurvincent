import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import TopBar from "../../Application/TopBar/TopBar";
import { Link } from "react-router-dom";
import {
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";

export default function MyCalendar({ headers }) {
  const options = { weekday: "short" };
  const today = new Date(); // Data de hoje
  const futureDates = [];

  // Loop para calcular as datas futuras
  for (let i = 0; i < 31; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    futureDates.push(date);
  }

  const events = [
    {
      student: "Marco",
      date: new Date("2024-04-18"),
      id: 123,
      description: "Lorem",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      date: new Date("2024-05-02"),
      id: 1231,
      description: "Lorem LoremL orem",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      date: new Date("2024-04-19"),
      id: 1213,
      description: "5",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      date: new Date("2024-04-20"),
      id: 1423,
      description: "5",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      student: "Maria",
      date: new Date("2024-04-20"),
      id: 1243,
      description: "5",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "João",
      date: new Date("2024-05-10"),
      id: 11423,
      description: "5",
      link: "www.google.com",
      category: "Tutoring",
    },
  ];

  return (
    <>
      <TopBar />
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "50rem" }}>
          <RouteDiv>
            <div
              style={{
                overflow: "auto",
                display: "flex",
                gap: "1rem",
                height: "20rem",
              }}
            >
              {futureDates.map((date, index) => (
                <div style={{ minWidth: "15rem" }} key={index}>
                  <p
                    style={{
                      padding: "5px",
                      backgroundColor:
                        index !== 0 ? primaryColor() : secondaryColor(),
                      color:
                        index !== 0
                          ? textPrimaryColorContrast()
                          : textSecondaryColorContrast(),
                    }}
                  >
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
                    .map((event, indexx) => (
                      <div
                        style={{
                          borderRadius: "1rem",
                          margin: "5px 0",
                          border: `solid 1px ${
                            index !== 0 ? primaryColor() : secondaryColor()
                          }`,
                          padding: "10px 5px",
                          color:
                            index !== 0 ? primaryColor() : secondaryColor(),
                          backgroundColor:
                            index !== 0
                              ? textPrimaryColorContrast()
                              : textSecondaryColorContrast(),
                        }}
                        key={event + indexx}
                      >
                        <Link target="_blank" to={event.link}>
                          Access the class here
                        </Link>
                        <p>{event.category}</p>
                        {event.student && <p> {event.student}</p>}
                        <p>{event.description}</p>
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
