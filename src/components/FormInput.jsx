import React, { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);

  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const selectStyle = {
    color: "rgb(93, 91, 91)",
    width: "264px", // Adjust the width as needed
  };

  const handleFocus = (e) => {
    setFocused(true);
  };

  if (inputProps.type === "dropdown") {
    return (
      <div className="inputContainer">
        <label htmlFor={inputProps.name} className="label">
          {label}
        </label>

        <div className="inputWrapper">
          <select
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            id={inputProps.name}
            className={`input ${errorMessage ? "error" : ""}`}
            focused={focused.toString()}
            style={selectStyle}
          >
            {inputProps.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {errorMessage && <span className="errorMessage">{errorMessage}</span>}
        </div>
      </div>
    );
  } else {
    return (
      <div className="inputContainer">
        <label htmlFor={inputProps.name} className="label">
          {label}
        </label>

        <div className="inputWrapper">
          <input
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            id={inputProps.name}
            className={`input ${errorMessage ? "error" : ""}`}
            focused={focused.toString()}
          />

          {errorMessage && <span className="errorMessage">{errorMessage}</span>}
        </div>
      </div>
    );
  }
};

export default FormInput;
