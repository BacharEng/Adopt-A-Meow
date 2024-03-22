import { useState } from "react";
import AddCat from "../components/AddCat";

const MyAccount = () => {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <button
              className="btn btn-lg dark-blue-bg sideBar btnHover white-text"
              onClick={() => {
                setIsAdd(!isAdd);
              }}
            >
              Add new cat
            </button>
          </div>
          <div className="col-sm-4">{isAdd && <AddCat />}</div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
