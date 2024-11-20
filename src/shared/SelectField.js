import React from "react";
import { ErrorMessage, useField } from "formik";
import { Form } from "react-bootstrap";

import "../assets/css/text-field.css";

const SelectField = ({ icon, defaulText, choices, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <React.Fragment>
      <div className="mb-2 field-container">
        <div className="d-flex align-items-center">
          {icon}
          <Form.Select
            className={`form-control custom-field shadow-none ${meta.touched && meta.error ? "is-invalid" : ""
              }`}
            {...field}
            {...props}
          >
            <option value="" disabled>{defaulText}</option>
            {choices?.map((choice, index) => (
              <option key={index} value={choice.value}>
                {choice?.option}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
      <ErrorMessage
        component="small"
        name={field.name}
        className="text-danger fw-bold"
      />
    </React.Fragment>
  );
};

export default SelectField;
