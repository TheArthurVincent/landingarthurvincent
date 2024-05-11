import React from "react";
import { SignUp } from "./types.SignUp";
import { secondaryColor } from "../../../Styles/Styles";

export function InputFieldSignUp({
  value,
  onChange,
  id,
  placeholder,
  type,
}: SignUp) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Athiti",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: "3px",
          fontWeight: 800,
          fontFamily: "Athiti",
          textAlign: "center",
        }}
      >
        {placeholder}
      </p>
      <input
        style={{
          padding: "0.5rem",
          margin: "0.3rem",
          fontFamily: "Athiti",
          fontSize: "1rem",
          fontWeight: 500,
          border: `1px solid ${secondaryColor()}`,
          width: "90%",
        }}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
}
