import React from "react";
import { Image } from "react-bootstrap";

const ErrorComponent = () => {
  return (
    <div
    className="bg-black d-flex flex-column justify-content-center align-items-center  text-center"
      style={{
        height: "100vh", 
      }}
    >
      <Image
        width={300}
        className="ps-2"
        src="https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png"
        alt="Error Image"
      />
      <h1 className="text-white pt-4">Not Authorized</h1>
    </div>
  );
};

export default ErrorComponent;
