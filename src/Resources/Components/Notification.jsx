import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Notification = ({ text, color, reload /*, showNotification */ }) => {
  const Not = styled.div`
    animation-name: notif;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  `;

  const [isVisible, setIsVisible] = useState(false);

  const view = async () => {
    setIsVisible(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 3000);
    });
    setIsVisible(false);
    reload ? window.location.reload() : null;
  };

  useEffect(() => {
    view();
  }, []);

  return (
    <Not
      className="box-shadow-pattern notification"
      style={{
        backgroundColor:
          color === 1
            ? "green"
            : color === 2
            ? "#FA7800"
            : color === 3
            ? "red"
            : "white",
        display: isVisible ? "block" : "none",
        padding: "0.5rem 1.5rem",
        color: "white",
        textAlign: "right",
        minWidth: "10rem",
        fontWeight: 500,
        border: "white solid 2px",
        position: "fixed",
        top: 50,
        right: 20,
        zIndex: 100000000,
      }}
    >
      <p
        style={{
          fontWeight: 800,
          marginBottom: "0.3rem",
        }}
      >
        <p>
          {color === 1
            ? "Success!"
            : color === 2
            ? "Alert!"
            : color === 3
            ? "Error"
            : null}
        </p>
      </p>
      {text}
    </Not>
  );
};

export default Notification;

export const showNotification = (
  text,
  color,
  reload /*, showNotification*/
) => {
  return (
    <Notification
      text={text}
      color={color}
      reload={reload} /*showNotification={showNotification} */
    />
  );
};
