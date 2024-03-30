import React, { useState } from "react";
import ReactModal from "react-modal";
import { FiEdit } from "react-icons/fi";
import { FaWindowClose } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import EditCat from "./EditCat";

// import react-query services
import { useMutation } from "react-query";

// import zustand services
import { deleteCat } from "../services/catService";
import { useCatStore, Cat } from "../store/useCatStore";
import CatPage from "./CatPage";

export interface CatItemProps {
  cat: Cat;
  isAuth?: boolean;
}

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

const CatItem: React.FC<CatItemProps> = (props: CatItemProps) => {
  //Local states
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  //functions for CRUD
  const handleDelete = () => {
    deleteCatMutation.mutate();
  };

  const deleteCatMutation = useMutation(() => deleteCat(props.cat.id), {
    onSuccess: () => {
      useCatStore.getState().deleteCat(props.cat.id);
    },
  });

  //modal control functions
  const handleShowMoreInfo = () => {
    setIsShowMore(true);
    openModal();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setIsShowMore(false);
  }

  return (
    <>
      <div className="container-fluid cat-item cat-item-lg cat-item-sm">
        <div className="row justify-content-center">
          <div className="col-lg-12 d-flex justify-content-center">
            <img
              src={
                props.cat.catBannerImg
                  ? props.cat.catBannerImg
                  : "https://firebasestorage.googleapis.com/v0/b/adopt-a-meow.appspot.com/o/catImages%2Fdefault-cat-image.png?alt=media&token=140769a9-12c9-4f86-af43-5ad822c2c88b"
              }
              className="img-fluid cat-image"
            />
          </div>
          {props.isAuth && (
            <>
              <div className="col-lg-12 light-blue-bg">
                <FiEdit onClick={openModal} className="editIcon" />
                <TiUserDeleteOutline
                  onClick={handleDelete}
                  className="deleteIcon"
                />
              </div>
            </>
          )}
          <div className="col-lg-12 light-blue-bg">
            <h1>{`This is ${props.cat.catName}`}</h1>
            <p>{`Age: ${props.cat.catAge}`}</p>
            <p>{`Address: ${props.cat.fosterAddress}`}</p>
            <p>{`Foster Phone number: ${props.cat.fosterPhone}`}</p>
            <button
              className="btn btn-success btn-lg catForm btnHover"
              onClick={handleShowMoreInfo}
            >
              Show more info
            </button>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        style={modalStyle}
        onRequestClose={closeModal}
        contentLabel="Edit Cat"
      >
        <FaWindowClose onClick={closeModal} />
        {modalIsOpen && (
          <>
            {isShowMore ? (
              <>
                <CatPage cat={props.cat} />
              </>
            ) : (
              <>
                <EditCat cat={props.cat} closeModal={closeModal} />
              </>
            )}
          </>
        )}
      </ReactModal>
    </>
  );
};

export default CatItem;
