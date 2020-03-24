import React from "react";

export default function Input(props) {
  const { name, value, onChange, onBlur } = props;
  const [error, setError] = React.useState("");
  const handleBlur = () => {
    const isValid = onBlur?.(value);
    if (isValid) {
      setError("");
    } else {
      const _value = `Invalid ${name}`;
      setError(_value);
    }
  };
  return (
    <div>
      <input
        {...props}
        autoComplete="off"
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={onChange}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}
