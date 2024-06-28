import React, { useEffect, useState } from "react";

export default function TextAreaLesson() {
  const [value, setValue] = useState("");
  const [permissions, setPermissions] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions } = JSON.parse(user);
      setPermissions(permissions);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <textarea
      style={{ display: permissions === "superadmin" ? "block" : "none" }}
      className={`comments ${value == "" ? "no-print" : ""}`}
      value={value}
      onChange={handleChange}
    />
  );
}
