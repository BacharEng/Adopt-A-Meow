import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const logout = async () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <h1>Home Page</h1>
            <button
              className="btn btn-lg dark-green-bg black-text"
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
