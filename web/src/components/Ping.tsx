import React, { useState } from "react";
import axios from "../utils/axios";

// Testing Module to Ensure Everything Works
const Ping: React.FC = () => {
  const [text, setText] = useState("");

  const handlePing = () => {
    axios.get("/ping").then((res: any) => {
      setText(res.data);
    });
  };
  return (
    <div>
      <h1>Test Module</h1>
      <button onClick={handlePing}>Ping</button>
      <p>{text}</p>
    </div>
  );
};

export default Ping;
