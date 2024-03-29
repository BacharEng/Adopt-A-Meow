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

export interface CatItemProps {
  cat: Cat;
  isAuth?: boolean;
}

const modalStyle = {
  overlay: {
    zIndex: 9999,
  },
  content: {
    left: "34%",
    width: "34%",
    zIndex: 10000,
  },
};

const CatItem: React.FC<CatItemProps> = (props: CatItemProps) => {
  //Local states
  const [modalIsOpen, setIsOpen] = useState(false);

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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="container cat-item cat-item-lg cat-item-sm">
        <div className="row">
          <div className="col-lg-6">
            <h1>{`This is ${props.cat.catName}`}</h1>
            <p>{`Age: ${props.cat.catAge}`}</p>
            <p>{`Address: ${props.cat.fosterAddress}`}</p>
            <p>{`Foster Phone number: ${props.cat.fosterPhone}`}</p>
          </div>
          <div className="col-lg-6">
            <img
              src={
                props.cat.catBannerImg
                  ? props.cat.catBannerImg
                  : "https://firebasestorage.googleapis.com/v0/b/adopt-a-meow.appspot.com/o/catImages%2Fdefault-cat-image.png?alt=media&token=140769a9-12c9-4f86-af43-5ad822c2c88b"
              }
              className="img-fluid cat-image"
            />
            {props.isAuth && (
              <>
                <FiEdit onClick={openModal} className="editIcon" />
                <TiUserDeleteOutline
                  onClick={handleDelete}
                  className="deleteIcon"
                />
              </>
            )}
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
        {modalIsOpen && <EditCat cat={props.cat} closeModal={closeModal} />}
      </ReactModal>
    </>
  );
};

export default CatItem;
