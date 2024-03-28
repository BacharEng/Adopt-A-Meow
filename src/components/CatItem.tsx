import React, { useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { FaWindowClose } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import EditCat from "./EditCat";

// import react-query services
import { useMutation } from "react-query";

// import zustand services
import { deleteCat, updateCat } from "../services/catService";
import { useCatStore, Cat } from "../store/useCatStore";

// import firebase services
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../services/firebaseConfig";

interface CatItemProps {
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
  const [isEditView, setIsEditView] = useState(false);
  const [catName, setCatName] = useState(props.cat.catName);
  const [catAge, setCatAge] = useState(props.cat.catAge);
  const [fosterAddress, setFosterAddress] = useState(props.cat.fosterAddress);
  const [fosterPhone, setFosterPhone] = useState(props.cat.fosterPhone);
  const [catImage, setCatImage] = useState(props.cat.catImage);
  const [tempImage, setTempImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    deleteCatMutation.mutate();
  };

  const deleteCatMutation = useMutation(() => deleteCat(props.cat.id), {
    onSuccess: () => {
      useCatStore.getState().deleteCat(props.cat.id);
    },
  });

  const updateMutation = useMutation(
    ({ id, update }: { id: string; update: Partial<Omit<Cat, "id">> }) =>
      updateCat(id, update),
    {
      onSuccess: () => {
        useCatStore.getState().updateCat(props.cat.id, {
          catName: catName,
          catAge: catAge,
          fosterAddress: fosterAddress,
          fosterPhone: fosterPhone,
          catImage: catImage,
        });
        setIsEditView(false);
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMutation.mutate({
      id: props.cat.id,
      update: {
        catName,
        catAge,
        fosterAddress,
        fosterPhone,
        catImage,
      },
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTempImage(file);
    } else {
      console.log("No files were added by User");
    }
  };

  const uploadImage = async () => {
    setIsUploading(true);
    if (tempImage) {
      const storageRef = ref(storage, `catImages/${tempImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, tempImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              setCatImage(downloadURL);
              setIsUploading(false);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      );
    } else {
      setIsUploading(false);
      toast.error("No image was uploaded");
    }
  };

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
                catImage
                  ? catImage
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
        {modalIsOpen && <EditCat />}
      </ReactModal>
    </>
  );
};

export default CatItem;
