import Navbar from "react-bootstrap/Navbar";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { HiBars3 } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { GlobalInfo } from "../../App";
import logo from "../../assets/images/usmlsa_logo.png";
function NavTopbar() {
  const { user } = useSelector((state) => state.user);
  const { setIsSidebarOpen } = useContext(GlobalInfo);
  const Token = user?.access_token;
  const Navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("persist:grow-share");
  }, []);

  return (
    <>
      <Navbar className="bg-dark py-3 text-white justify-content-between justify-content-lg-baseline px-lg-5 ">
        <Image width={200} className="ps-2" src={logo} alt="" />
        <div className="d-none d-lg-flex gap-3 me-4">
          {Token ? (
            <>
              <button
                className="text-white py-2 px-3 Login-btn rounded"
                onClick={() => {
                  if (user.roles[0] === "ADMIN") {
                    Navigate("/dashboard");
                  } else if (user.roles[0] === "MANAGER") {
                    Navigate("/dashboard/allteams");
                  } else {
                    Navigate("/dashboard/yourteam");
                  }
                }}
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                className="text-white py-2 px-3 Login-btn rounded fw-bold"
                onClick={() => Navigate("/auth/login")}
              >
                Login
              </button>
              <button
                className="text-white py-2 px-3 Signup-btn rounded fw-bold"
                onClick={() => Navigate("/auth/register")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
        <div className="d-flex d-lg-none ">
          <HiBars3
            className="icon"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            fontSize={30}
          />
        </div>
      </Navbar>
    </>
  );
}

export default NavTopbar;
