import React, { useState } from "react";

export default function TextAreaLesson() {
  const [value, setValue] = useState("");
  const [className, setClassName] = useState("no-print");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setClassName(newValue ? "" : "no-print");
  };

  return (
    <textarea
      className={`comments ${value == "" ? "no-print" : ""}`}
      value={value}
      onChange={handleChange}
    />
  );
}
