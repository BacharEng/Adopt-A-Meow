import { useState } from "react";
import ReactModal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import AddCat from "../components/AddCat";
import AccountCatList from "../components/AccountCatList";
import { useFetchAndUpdateCats } from "../hooks/useFetchAndUpdateCats";

ReactModal.setAppElement("#root");

const modalStyle = {
  overlay: {
    zIndex: 9999,
  },
  content: {
    left: "50%",
    top: "0",
    bottom: "0",
    transform: "translateX(-50%)",
    width: "50%",
    zIndex: 10000,
  },
};

const MyAccount = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useFetchAndUpdateCats();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <div>
              <button
                className="btn btn-lg dark-blue-bg sideBar btnHover white-text"
                onClick={openModal}
              >
                Add new cat
              </button>
              <ReactModal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={closeModal}
                contentLabel="Add Cat"
              >
                <FaWindowClose onClick={closeModal} />
                {modalIsOpen && (
                  <AddCat closeModal={closeModal} isOpen={modalIsOpen} />
                )}
              </ReactModal>
            </div>
          </div>
          <div className="col-sm-10">
            <AccountCatList />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
