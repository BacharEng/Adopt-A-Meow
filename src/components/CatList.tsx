import React, { useState } from "react";

//React modal imports
import ReactModal from "react-modal";
import { FaWindowClose } from "react-icons/fa";

//zustand store hooks
import { useCatStore } from "../store/useCatStore";

//call pages needed
import CatItem from "./CatItem";
import CatPage from "./CatPage";

//Modal settings
const modalStyle = {
  overlay: {
    zIndex: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  content: {
    left: "34%",
    width: "34%",
    zIndex: 10000,
  },
};

const CatsList: React.FC = () => {
  //local states
  const cats = useCatStore((state) => state.cats);
  const [modalIsOpen, setIsOpen] = useState(false);

  //modal control functions
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="container catGallery">
        <div className="row">
          {cats.map((cat) => (
            <>
              <div className="col-lg-4 col-sm-6 cat-list" key={cat.id}>
                {/* <button onClick={openModal}> */}
                <CatItem cat={cat} />
                {/* </button> */}
              </div>

              <ReactModal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={closeModal}
                contentLabel="Cat Page"
              >
                <FaWindowClose onClick={closeModal} />
                {modalIsOpen && <CatPage cat={cat} />}
              </ReactModal>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default CatsList;
