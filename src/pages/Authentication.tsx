import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, database } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Authentication: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [loginView, setLoginView] = useState(true);

  const navigate = useNavigate();

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

  const signup = async () => {
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      phone !== ""
    ) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
          addDoc(collection(database, "accounts"), {
            uid: result.user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
          }).then((account_created) => {
            navigate("/homepage");
          });
        })
        .catch((error) => {
          let errMessage = "";
          console.log(error.message);

          switch (error.message) {
            case "Firebase: Error (auth/invalid-credential).":
              errMessage = "Username not exist";
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

  const cleanState = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setPassword("");
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-sm-2"></div>
          <div className="col-lg-6 col-sm-8 login d-flex align-items-center flex-column">
            {loginView ? (
              <>
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
                  className="btn btn-lg black-bg white-text loginBtn btnHover"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    cleanState();
                    setLoginView(!loginView);
                  }}
                  className="btn btn-outline-secondary btn-lg loginBtn"
                >
                  Don't have an account?
                </button>
              </>
            ) : (
              <>
                <h1>Welcome to Adopt-A-Meow</h1>
                <h2>Create a new user</h2>
                <h3 className="dark-blue-text">
                  Enter the following fields to sign up
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
                <input
                  className="form-control inputLogin"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
                <input
                  className="form-control inputLogin"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
                <input
                  className="form-control inputLogin"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                />
                <button
                  onClick={signup}
                  className="btn btn-lg black-bg white-text loginBtn btnHover"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    cleanState();
                    setLoginView(!loginView);
                  }}
                  className="btn btn-outline-secondary btn-lg loginBtn"
                >
                  Already have an account?
                </button>
              </>
            )}
          </div>
          <div className="col-lg-3 col-sm-2"></div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
