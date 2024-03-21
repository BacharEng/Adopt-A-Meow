import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const connectWithEmailPassword = async () => {
    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          navigate("/homepage");
        })
        .catch((error) => {
          let errMessage = "";
          console.log(error.message);

          switch (error.message) {
            case "Firebase: Error (auth/invalid-credential).":
              errMessage = "Username does not exist";
              break;
            default:
              break;
          }
          toast.error(errMessage);
        });
    } else {
      toast.error("Please provide email and password");
    }
  };

  return (
    <>
      <ToastContainer />
      <h1>Welcome to Adopt-A-Meow</h1>
      <h2>Sign in to your account</h2>
      <h3 className="dark-blue-text">
        Enter your email and password to sign in
      </h3>
      <input
        className="form-control inputLogin"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@domain.com"
      />
      <input
        className="form-control inputLogin"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button
        onClick={connectWithEmailPassword}
        className="btn btn-lg black-bg white-text loginBtn"
      >
        Sign in
      </button>
      <p className="dividerText dark-grey-text">Or continue with</p>
    </>
  );
};

export default Login;
