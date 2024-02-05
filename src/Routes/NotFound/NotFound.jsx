import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { RouteDiv } from "../../Resources/Components/RouteBox";

export default function NotFound({ headers, oi }) {
  const { UniversalTexts } = useUserContext();
  return <RouteDiv>Not Found!</RouteDiv>;
}
