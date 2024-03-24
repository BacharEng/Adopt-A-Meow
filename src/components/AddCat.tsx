import React, { useState } from "react";
import { useMutation } from "react-query";
import { createCat } from "../services/catService";
import { useCatStore } from "../store/useCatStore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { storage, auth } from "../services/firebaseConfig";

const AddCat: React.FC = () => {
  const [catImage, setCatImage] = useState("");
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [fosterAddress, setFosterAddress] = useState("");
  const [fosterPhone, setFosterPhone] = useState("");
  const [fosterID, setFosterID] = useState(auth.currentUser?.uid);
  const [tempImage, setTempImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const addCat = useCatStore((state) => state.addCat);

  const { mutate, isLoading, error } = useMutation(createCat, {
    onSuccess: (data) => {
      addCat({
        id: data.id,
        catName,
        catAge,
        fosterAddress,
        fosterPhone,
        catImage,
        fosterID,
      });

      setCatName("");
      setCatAge("");
      setFosterAddress("");
      setFosterPhone("");
      setCatImage("");
      setFosterID("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ catName, catAge, fosterAddress, fosterPhone, catImage, fosterID });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTempImage(file);
    } else {
      console.log("No files were added by User");
    }
  };

  function isError(error: unknown): error is Error {
    return error instanceof Error;
  }

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

  return (
    <div>
      <h1>{`This is the UID: ${auth.currentUser?.uid}`}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            className="form-control catForm"
            placeholder="Name of the cat"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            required
          />
          <label>Cat Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control catForm"
            placeholder="Age of the cat"
            value={catAge}
            onChange={(e) => setCatAge(e.target.value)}
            required
          />
          <label>Cat Age</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control catForm"
            placeholder="Foster Family Address"
            value={fosterAddress}
            onChange={(e) => setFosterAddress(e.target.value)}
            required
          />
          <label>Foster Address</label>
        </div>
        <div className="form-floating">
          <input
            type="tel"
            className="form-control catForm"
            placeholder="Phone number of foster family"
            value={fosterPhone}
            onChange={(e) => setFosterPhone(e.target.value)}
            required
          />
          <label>Phone Number</label>
        </div>
        <div className="form-floating">
          <input
            type="file"
            className="form-control catForm"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label>Cat Image</label>
        </div>
        {isUploading ? (
          <>
            <p>Loading...</p>
            <p>{progress}</p>
          </>
        ) : (
          <>
            <div className="form-floating">
              <button
                type="button"
                className="btn btn-lg btn-warning catForm"
                onClick={uploadImage}
              >
                Upload image
              </button>
            </div>
          </>
        )}

        <button
          type="submit"
          className="btn btn-success btn-lg catForm"
          disabled={isLoading || isUploading}
        >
          Add New Cat
        </button>

        {isError(error) && <p>Error adding cat: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddCat;
