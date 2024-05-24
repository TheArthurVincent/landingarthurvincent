import React from "react";
import { Link } from "react-router-dom";
import { RouteDiv } from "../../../../Resources/Components/RouteBox";
import { linksInfo } from "./LinksManagementAssets/UsefulLinksList";

export function UsefulLinks() {
  return (
    <>
      <ul
        style={{
          display: "flex",
          padding: "1rem",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {linksInfo.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.link} target="_blank">
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default UsefulLinks;
