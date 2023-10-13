import React from "react";
import NewStudent from "../Adm/NewStudent";
import { BackToHomePage } from "../../Resources/UniversalComponents";

export function SignUp() {
  return (
    <div style={{ marginTop: "5rem" }}>
      <BackToHomePage />
      <NewStudent />
    </div>
  );
}

export default SignUp;
