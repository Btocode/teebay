import React from "react";

const Button = ({ text, classname, onclick }) => {
  return (
    // Button component
    <button
      onClick={onclick}
      className={classname}>
      {text}
    </button>
  );
};

export default Button;
