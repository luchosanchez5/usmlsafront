import React from 'react';
import InputField from './components/product/InputField';

const Form = () => {
    return (
<form action="http://localhost:8000/index.php" method="POST">

            <InputField
                type='text'
                name='name'
                placeholder='Enter your name'
            />
            <InputField
                type='number'
                name='age'
                placeholder='Enter your age'
            />
            <InputField
                type='email'
                name='email'
                placeholder='Enter your email'
            />
            <InputField
                type='number'
                name='phone'
                placeholder='Enter your phone number'
            />
            <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <InputField
                type='text'
                name='desk'
                placeholder='Enter your desk'
            />
            <button type='submit'>Submit</button>
        </form>
    );
}

export default Form;
