import React from "react";

const Button = ({ text, classname }) => {
  return (
    // Button component
    <button
      className={classname}>
      {text}
    </button>
  );
};

export default Button;
