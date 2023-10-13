import React from "react";
import NewStudent from "../Adm/NewStudent";
import { BackToHomePage } from "../../Resources/UniversalComponents";

export function SignUp() {
  return (
    <div
      style={{
        marginTop: "180px",
        maxWidth: "1000px",
        margin: "6rem auto",
      }}
    >
      <NewStudent />
      <BackToHomePage />
    </div>
  );
}

export default SignUp;
