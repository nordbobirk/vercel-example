"use client";

import { useState } from "react";
import { action } from "./action";

export default function Button() {
  const [res, setRes] = useState("no response");

  const handleClick = () => {
    action().then((res) => {
      if (res && res.success) {
        setRes("success");
      } else {
        setRes("error: " + res.error);
      }
    });
  };

  return (
    <div>
      Action response: {res}
      <br />
      <button onClick={handleClick}>
        Press this button to call server action
      </button>
    </div>
  );
}
