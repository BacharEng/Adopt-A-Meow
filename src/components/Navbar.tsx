import { useState } from "react";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [islogin, setIsLogin] = useState(true);

  const logout = async () => {
    auth.signOut();
    setIsLogin(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg dark-blue-bg">
        <a className="navbar-brand" href="/homepage">
          <span className="light-green-text">Adopt</span>-A-Meow
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link white-text" href="/homepage">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link white-text" href="/myaccount">
                My Account
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn light-green-bg black-text btnHover my-2 my-sm-0"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
