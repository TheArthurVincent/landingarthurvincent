import {
  HThree,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";

export default function NotFound({ headers, oi }) {
  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <HThree>Not Found!</HThree>
      </RouteDiv>
    </RouteSizeControlBox>
  );
}
