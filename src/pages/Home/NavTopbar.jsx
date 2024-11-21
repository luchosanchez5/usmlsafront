import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Offcanvas } from "react-bootstrap";
import { HiBars3 } from "react-icons/hi2";
import { useSelector } from "react-redux";
function NavTopbar() {
  const [showCanvas, setShowCanvas] = useState(false);
  const handleClose = () => setShowCanvas(false);
  const handleShow = () => setShowCanvas(true);
  const { user } = useSelector((state) => state.user);
  const Token = user?.access_token;
  const [LoggedIn, SetLoggedIn] = useState(false);
  const Navigate = useNavigate();

  // Effect to check if the user is logged in based on localStorage
  useEffect(() => {
    localStorage.removeItem("persist:grow-share");
  }, []);

  return (
    <>
      <Navbar className="bg-dark py-3 text-white justify-content-between justify-content-lg-baseline">
        <Image
          width={200}
          className="ps-2"
          src="https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png"
          alt=""
        />
        <div className="d-none d-lg-flex gap-3 me-4">
          {Token ? (
            <>
              <button
                className="text-white py-2 px-3 Login-btn"
                onClick={() => Navigate("/myaccount")}
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                className="text-white py-2 px-3 Login-btn"
                onClick={() => Navigate("/auth/login")}
              >
                Login
              </button>
              <button
                className="text-white py-2 px-3 Signup-btn"
                onClick={() => Navigate("/auth/register")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
        <div className="d-flex d-lg-none">
          <HiBars3 onClick={handleShow} fontSize={30} />
        </div>
      </Navbar>

      <Offcanvas show={showCanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled">
            <li className="py-2" onClick={() => Navigate("/")}>
              Home
            </li>
            <li className="py-2" onClick={() => Navigate("/about")}>
              About
            </li>
            <li className="py-2" onClick={() => Navigate("/contact")}>
              Contact
            </li>
            <li className="py-2" onClick={() => Navigate("/newspaper")}>
              News Paper
            </li>
            <hr />
            {LoggedIn ? (
              <>
                <button
                  className="w-100 mb-3 text-white py-2 Login-btn"
                  onClick={() => Navigate("/myaccount")}
                >
                  My Account
                </button>{" "}
                {/* <button className="w-100 mb-3 text-white py-2 Login-btn" onClick={() => Navigate('/myaccount')}>My Account</button> */}
                <button
                  className="w-100 mb-3 text-white py-2 Login-btn"
                  onClick={() => Navigate("/myaccount")}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-100 mb-3 text-white py-2 Login-btn"
                  onClick={() => Navigate("/auth/login")}
                >
                  Login
                </button>
                <button
                  className="w-100 text-white py-2 Signup-btn"
                  onClick={() => Navigate("/auth/register")}
                >
                  Sign Up
                </button>
              </>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavTopbar;
