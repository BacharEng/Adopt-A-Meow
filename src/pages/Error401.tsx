import React from "react";
import { Link } from "react-router-dom";

const Error401 = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Sorry but you are unauthorized, please login</h2>
                </div>
                <div className="col-sm-12">
                  <Link to={"/"}>
                    <button className="btn btn-primary btn-lg">
                      Redirect to login page
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
};

export default Error401;
