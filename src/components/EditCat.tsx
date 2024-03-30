import React, { useState } from "react";
import { CatItemProps } from "./CatItem";

// import react-query services
import { useMutation } from "react-query";

// import zustand services
import { updateCat } from "../services/catService";
import { useCatStore, Cat } from "../store/useCatStore";

// import firebase services
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, auth } from "../services/firebaseConfig";

interface EditCatProps extends CatItemProps {
  closeModal: () => void;
}

const EditCat: React.FC<EditCatProps> = (props: EditCatProps) => {
  //local states

  //local cat states
  const [catName, setCatName] = useState(props.cat.catName);
  const [catAge, setCatAge] = useState(props.cat.catAge);
  const [fosterAddress, setFosterAddress] = useState(props.cat.fosterAddress);
  const [fosterPhone, setFosterPhone] = useState(props.cat.fosterPhone);
  const [catSex, setCatSex] = useState("");
  const [catBreed, setCatBreed] = useState("");
  const [catWeight, setCatWeight] = useState("");
  const [catDescription, setCatDescription] = useState("");

  //local image states
  const [downloadURLs, setDownloadURLs] = useState<string[]>(
    props.cat.catImages
  );
  const [files, setFiles] = useState<File[] | null>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMutation.mutate({
      id: props.cat.id,
      update: {
        catName,
        catAge,
        catSex,
        catBreed,
        catWeight,
        catDescription,
        fosterAddress,
        fosterPhone,
        catBannerImg: downloadURLs[0],
        catImages: downloadURLs,
      },
    });
    props.closeModal();
  };

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
          catBannerImg: downloadURLs[0],
          catImages: downloadURLs,
        });
      },
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const selectedFiles: File[] = Array.from(fileList);
      setFiles(selectedFiles); // Set the files in state
      uploadFiles(selectedFiles); // Call uploadFiles immediately
    }
  };

  const uploadFiles = async (filesToUpload: File[]) => {
    await filesToUpload.forEach((file) => {
      const storageRef = ref(
        storage,
        `catImages/${auth.currentUser?.uid}/${Date.now()}_${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(`Image is ${prog}/100% done`);
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDownloadURLs((prevURLs) => [...prevURLs, downloadURL]);
          });
        }
      );
    });
  };

  return (
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

          <label className="radio-label catForm">
            Male
            <input
              className="form-control catForm"
              type="radio"
              name="sex"
              value="Male"
              placeholder="Male"
              checked={catSex === "male"}
              onChange={(e) => setCatSex(e.target.value)}
            />
          </label>
          <label className="radio-label catForm">
            Female
            <input
              className="form-control catForm"
              type="radio"
              name="sex"
              value="Female"
              placeholder="Female"
              checked={catSex === "Female"}
              onChange={(e) => setCatSex(e.target.value)}
            />
          </label>

          <div className="form-floating">
            <input
              type="text"
              className="form-control catForm"
              placeholder="Add cat breed/Colours"
              value={catBreed}
              onChange={(e) => setCatBreed(e.target.value)}
            />
            <label>Cat breed/colours</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control catForm"
              placeholder="Cat Weight"
              value={catWeight}
              onChange={(e) => setCatWeight(e.target.value)}
            />
            <label>Cat Weight</label>
          </div>

          <div className="form-group catForm">
            <textarea
              className="form-control"
              id="CatDescription"
              rows={3}
              placeholder="Add the cats description"
            ></textarea>
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
              accept="image/*"
              multiple
              className="form-control catForm"
              onChange={handleFileChange}
            />
            <label>Cat Image</label>
          </div>

          <div className="row">
            {downloadURLs && (
              <>
                {downloadURLs.map((url, index) => (
                  <div className="col-xl-3 col-md-4 col-sm-6" key={index}>
                    <img
                      className="uploadImage"
                      src={url}
                      alt={`Uploaded File ${index + 1}`}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success btn-sm catForm right-mar-6"
            disabled={updateMutation.isLoading}
          >
            Submit Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCat;
