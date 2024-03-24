import React, { useState } from "react";
import { useMutation } from "react-query";
import { deleteCat, updateCat } from "../services/catService";
import { useCatStore, Cat } from "../store/useCatStore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../services/firebaseConfig";
import { toast } from "react-toastify";

interface CatItemProps {
  cat: Cat;
}

const CatItem: React.FC<CatItemProps> = ({ cat }) => {
  const [isEditView, setIsEditView] = useState(false);
  const [catName, setCatName] = useState(cat.catName);
  const [catAge, setCatAge] = useState(cat.catAge);
  const [fosterAddress, setFosterAddress] = useState(cat.fosterAddress);
  const [fosterPhone, setFosterPhone] = useState(cat.fosterPhone);
  const [catImage, setCatImage] = useState(cat.catImage);
  const [tempImage, setTempImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDelete = () => {
    deleteCatMutation.mutate();
  };

  const deleteCatMutation = useMutation(() => deleteCat(cat.id), {
    onSuccess: () => {
      useCatStore.getState().deleteCat(cat.id);
    },
  });

  const updateMutation = useMutation(
    ({ id, update }: { id: string; update: Partial<Omit<Cat, "id">> }) =>
      updateCat(id, update),
    {
      onSuccess: () => {
        useCatStore.getState().updateCat(cat.id, {
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
      id: cat.id,
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

  return (
    <>
      {isEditView ? (
        <>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control catForm"
                  placeholder="Name of the cat"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
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
                      className="btn btn-sm btn-warning catForm"
                      onClick={uploadImage}
                    >
                      Upload image
                    </button>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn btn-success btn-sm catForm right-mar-6"
                disabled={updateMutation.isLoading}
              >
                Edit Cat
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm catForm right-mar-6"
                onClick={() => setIsEditView(!isEditView)}
              >
                Exit edit mode
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h1>{`This is ${cat.catName}`}</h1>
                <p>{`Age: ${cat.catAge}`}</p>
                <p>{`Address: ${cat.fosterAddress}`}</p>
                <p>{`Foster Phone number: ${cat.fosterPhone}`}</p>
              </div>
              <div className="col-lg-6">
                <img
                  src={
                    catImage
                      ? catImage
                      : "https://firebasestorage.googleapis.com/v0/b/adopt-a-meow.appspot.com/o/catImages%2Fdefault-cat-image.png?alt=media&token=140769a9-12c9-4f86-af43-5ad822c2c88b"
                  }
                  className="img-fluid"
                />
                <button
                  onClick={() => setIsEditView(!isEditView)}
                  className="btn btn-sm btn-warning top-mar-6 right-mar-6"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-sm btn-danger top-mar-6 right-mar-6"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CatItem;
