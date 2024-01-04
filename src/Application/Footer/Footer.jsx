import React from "react";
export default function Footer() {
  return (
    <footer
      style={{
        bottom: "0vh",
        fontSize: "12px",
        alignItems: "center",
        backgroundColor: "#111",
        color: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100vw",
      }}
    >
      <img
        style={{
          maxWidth: "6rem",
        }}
        src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/arvintranmsp?updatedAt=1703788108765"
        alt="logo arvin"
      />
      <span
        style={{
          marginBottom: "1rem",
        }}
      >
        This platform is powered by ARVIN ENGLISH SCHOOL © Some rights reserved{" "}
        <br />
        Arthur Vincent
        <br />
        +55 11 91585-7807
      </span>
    </footer>
  );
}
