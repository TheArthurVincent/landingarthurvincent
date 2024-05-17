import React from "react";
import { alwaysBlack, alwaysWhite } from "../../Styles/Styles";
import Helmets from "../../Resources/Helmets";

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
      <Helmets text="Google Drive" />
      Você ainda não tem uma pasta no Drive. Fale com o professor.
    </div>
  );
}
