import React from "react";

const InputField = ({
  label,
  type,
  touched,
  value,
  error,
  className,
  labelClassName,
  min,
  ...props
}) => {
  const isTextArea = type === "textarea";

  return (
    <>
      <label htmlFor={props.name} className={labelClassName ?? ""}>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          {...props}
          value={value ?? ""}
          className={className}
          rows={4} // You can adjust number of rows here
        />
      ) : (
        <input
          {...props}
          value={value ?? ""}
          type={type}
          className={className}
          autoComplete="off"
          min={type === "number" ? 0 : min}
        />
      )}
      {touched && error ? <p className="text-danger">{error}</p> : null}
    </>
  );
};

export default InputField;