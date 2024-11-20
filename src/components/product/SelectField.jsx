import React from 'react'

const SelectField = ({ label, error, touched, options,deFaultValue, ...props }) => {
    return (
        <>
            <label >{label}</label>
            <select  {...props} >
                <option label={deFaultValue} disabled  selected/>
                {options?.map(option => (
                    <option key={option?.value} value={option?.value} className='bg-dark text-white' label={option?.label}>
                        {option?.label}
                    </option>
                ))}
            </select>
            {touched && error ? <p className='text-danger'>{error}</p> : null}

        </>

    )
}

export default SelectField