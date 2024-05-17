import React from "react";
import { alwaysBlack, alwaysWhite } from "../../Styles/Styles";

export function MessageDrive() {
  return (
    <div
      style={{
        backgroundColor: alwaysWhite(),
        color: alwaysBlack(),
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "3rem 0",
        marginTop: "180px",
        display: "grid",
        justifyContent: "center",
      }}
    >
      Você ainda não tem uma pasta no Drive. Fale com o professor.
    </div>
  );
}
