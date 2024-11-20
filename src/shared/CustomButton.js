import React from 'react';
import { Button } from 'react-bootstrap';

import '../assets/css/custom-button.css';

const CustomButton = ({ children,className }) => {
    return (
        <Button className='cutom-btn'>{children}</Button>
    )
}

export default CustomButton;
