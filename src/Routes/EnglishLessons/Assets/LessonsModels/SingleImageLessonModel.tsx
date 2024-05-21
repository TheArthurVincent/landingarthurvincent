import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
interface SingleImageLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function SingleImageLessonModel({
  headers,
  element,
}: SingleImageLessonModelProps) {
  return (
    <div>
      {element.images &&
        element.images.map((image: string, i: number) => (
          <img
            style={{
              maxWidth: "50vw",
              margin: "auto ",
              marginBottom: "3rem",
              display: "block",
            }}
            key={i}
            src={image}
            alt="img"
          />
        ))}
    </div>
  );
}
