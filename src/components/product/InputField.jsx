import React from "react";

const InputField = ({
  label,
  type,
  touched,
  value,
  error,
  className,
  labelClassName,
  ...props
}) => {
  return (
    <>
      <label htmlFor={label} className={labelClassName && labelClassName}>
        {label}
      </label>
      <input
        name={props.name}
        {...props}
        value={value ?? ""}
        type={type}
        className={className}
        autoComplete="off"
        min={type === "number" ? 0 : undefined}
      />
      {touched && error ? <p className="text-danger">{error}</p> : null}
    </>
  );
};

export default InputField;
