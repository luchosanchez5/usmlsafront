import React from "react";
import { useLocation } from "react-router-dom";

const SelectTag = ({
  label,
  error,
  touched,
  options,
  deFaultValue,
  onChange,
  className,
  icon,
  ...props
}) => {
  const location = useLocation();
  const IsPathauthRegister = location.pathname === "/auth/register";
  const Isregisterteam = location.pathname === "/dasboard/registerteam";
  return (
    <>
      <div className={` ${IsPathauthRegister && "field-container-1 "}   `}>
        {label && <label htmlFor="">{label}</label>}
        <div className={` ${icon && "d-flex align-items-center"}`}>
          {icon}
          <select
            {...props}
            onChange={onChange}
            className={` ${className}   bg-white`}
          >
         
            {options?.map((option) => (
              <option
                key={option?.value}
                defaultValue={deFaultValue}
                value={option?.value}
                className="bg-dark text-white"
              >
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {touched && error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default SelectTag;
