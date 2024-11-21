import React from 'react';
import { ErrorMessage, useField } from 'formik';
import '../assets/css/text-field.css';

const TextField = ({ righticon, icon, margin, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <React.Fragment>
            <div className={`mb-2 field-container ${margin}`} >
                <div className="d-flex align-items-center">
                    {icon}
                    <input
                        className={`form-control custom-field shadow-none ${meta.touched && meta.error ? "is-invalid" : ""
                            }`}
                        {...field}
                        {...props}
                        autoComplete="off"
                        style={{ flexGrow: 1 }}
                    />
                    {righticon}
                </div>
            </div>
            <ErrorMessage
                component="small"
                name={field.name}
                className="text-danger fw-bold"
            />
        </React.Fragment>
    );
}

export default TextField;
