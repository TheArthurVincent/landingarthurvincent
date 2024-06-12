import React from "react";
import { alwaysBlack, alwaysWhite } from "../../Styles/Styles";
import Helmets from "../../Resources/Helmets";
import { BackToHomePage } from "../../Resources/UniversalComponents";

export function MessageDrive() {
  return (
    <div
      style={{
        backgroundColor: alwaysWhite(),
        color: alwaysBlack(),
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2rem",
        marginTop: "180px",
        display: "grid",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <Helmets text="Google Drive" />
      <BackToHomePage />
      <p>Você ainda não tem uma pasta de arquivos. Fale com o professor.</p>
    </div>
  );
}
