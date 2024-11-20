import React from "react";

import { Form } from "react-bootstrap";
import "../../assets/css/login-form.css";

const ProviderRadios = ({ imgSrc, text }) => {
  //   const [selectedButton, setSelectedButton] = useState(null);
  //   const handleButtonClick = (buttonId) => {
  //     setSelectedButton(buttonId);
  //   };
  return (
    <div className="register-form-space mt-5 " >
      <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
        {/* <div className={`radio bg-grey text-grey px-2 py-3 d-flex flex-column text-center rounded align-items-center button ${selectedButton === 1 ? 'selected' : ''}`} onClick={() => handleButtonClick(1)} > */}
        <div className="radio bg-grey text-grey px-2 py-3 d-flex flex-column text-center rounded align-items-center custom-radio-btn">
          <span className="icon">{imgSrc}</span>
          <Form.Check
            inline
            label={text}
            name="group1"
            className="m-0 p-0 line-1 mt-2"
            type="radio"
          />
        </div>
      </div>
    </div>
  );
};

export default ProviderRadios;
