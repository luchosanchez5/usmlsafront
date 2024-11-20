import React from 'react'

const InputField = ({ label, type, touched, value, error, className, ...props }) => {
  return (
    <>
      <label htmlFor="input">{label}</label>
      <input
        name={props.name}
        {...props}
        value={value ?? ''}
        type={type}
        className={className}
        autoComplete='off'

      />
      {touched && error ? <p className='text-danger'>{error}</p> : null}


    </>
  )
}

export default InputField