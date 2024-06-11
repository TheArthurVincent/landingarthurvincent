import axios from "axios";
import { backDomain } from "../../Resources/UniversalComponents";

export const addNewCardExternal = async (
  newCards: any,
  id: string,
  headers: any
) => {
  const actualHeaders = headers || {};

  try {
    const response = await axios.post(
      `${backDomain}/api/v1/flashcard/${id}`,
      { newCards },
      { headers: actualHeaders }
    );
  } catch (error) {
    alert("Erro ao enviar cards");
  }
};
