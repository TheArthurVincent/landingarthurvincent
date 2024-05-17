import React, { FC } from "react";
import { Helmet } from "react-helmet";
import "font-awesome/css/font-awesome.min.css";

interface HelmetsTypes {
  text: string;
}

const Helmets: FC<HelmetsTypes> = ({ text }) => {
  return (
    <Helmet>
      <title>{text} | Arthur Vincent</title>
    </Helmet>
  );
};

export default Helmets;
