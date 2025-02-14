import React from "react";
import FindEvents from "../components/product/FindEvents";
import NavTopbar from "../pages/Home/NavTopbar";
import { useLocation } from "react-router-dom";
const GlobalLayout = (WrapComponent) => {
  return function Globally(props) {
    const location = useLocation();
    const pathname = ["/myaccount"];

    return (
      <React.Fragment>
        <NavTopbar />
        <div className="">
          <main className="">
            {!pathname.includes(location.pathname) ? <FindEvents /> : null}
            <WrapComponent {...props} />
          </main>
        </div>
      </React.Fragment>
    );
  };
};

export default GlobalLayout;
