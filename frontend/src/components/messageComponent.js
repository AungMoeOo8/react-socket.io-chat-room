import React from "react";

function MessageComponent({ message }) {
  return (
    <>
      <span
        style={{
          display: "block",
          fontSize: "0.75rem",
          fontWeight: "bold",
        }}
      >
        {message.author}{" "}
        <span style={{ color: "slateBlue", fontSize: "0.7rem" }}>
          {message.time}
        </span>
      </span>
      <span
        style={{
          fontSize: "0.9rem",
          backgroundColor: "lavender",
          padding: "2px 8px",
          borderRadius: "0.2rem",
        }}
      >
        {message.message}
      </span>
    </>
  );
}

export default MessageComponent;
