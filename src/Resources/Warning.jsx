import React from "react";

export default function WarningText({ text }) {
  return (
    <div
      style={{
        fontFamily: "Athiti",
        borderRadius: "1rem",
        padding: "1rem",
        textAlign: "center",
        margin: "1rem",
        marginRight: "auto",
        marginLeft: "auto",
        display: "grid",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
        maxWidth: "15rem",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontSize: "2rem",
          borderRadius: "1rem",
          backgroundColor: "#FF2214",
          color: "#FFF",
        }}
      >
        ⚠
      </span>
      <span
        style={{
          fontSize: "1.1rem",
          borderRadius: "1rem",
          color: "#FF2214",
        }}
      >
        {" "}
        {text}
      </span>
    </div>
  );
}
