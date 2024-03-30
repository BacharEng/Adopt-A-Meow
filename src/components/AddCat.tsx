import React, { useState } from "react";
import { useMutation } from "react-query";
import { createCat } from "../services/catService";
import { useCatStore } from "../store/useCatStore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, auth } from "../services/firebaseConfig";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const AddCat = (props: Props) => {
  //Local states

  //cat local states
  const [catBannerImg, setCatBannerImg] = useState("");
  const [catImages, setCatImages] = useState([]);
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [catSex, setCatSex] = useState("");
  const [catBreed, setCatBreed] = useState("");
  const [catWeight, setCatWeight] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [fosterAddress, setFosterAddress] = useState("");
  const [fosterPhone, setFosterPhone] = useState("");
  const [fosterID, setFosterID] = useState(auth.currentUser?.uid);

  //Upload images local states
  const [downloadURLs, setDownloadURLs] = useState<string[]>([]);
  const [files, setFiles] = useState<File[] | null>([]);

  const addCat = useCatStore((state) => state.addCat);

  const { mutate, isLoading, error } = useMutation(createCat, {
    onSuccess: (data) => {
      console.log(downloadURLs[0]);
      console.log(downloadURLs);
      addCat({
        id: data.id,
        catName: catName,
        catAge: catAge,
        catSex: catSex,
        catBreed: catBreed,
        catWeight: catWeight,
        catDescription: catDescription,
        fosterAddress: fosterAddress,
        fosterPhone: fosterPhone,
        catBannerImg: downloadURLs[0],
        catImages: downloadURLs,
        fosterID,
      });

      setCatName("");
      setCatAge("");
      setCatSex("");
      setCatBreed("");
      setCatWeight("");
      setCatDescription("");
      setFosterAddress("");
      setFosterPhone("");
      setCatBannerImg("");
      setCatImages([]);
      setFosterID("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
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
      fosterID,
    });
    props.closeModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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

  function isError(error: unknown): error is Error {
    return error instanceof Error;
  }

  return (
    <div>
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

        <div className="form-check form-check-inline catForm">
          <input
            className="form-check-input"
            type="radio"
            name="sexRadioOptions"
            id="maleRadio"
            value="Male"
            checked={catSex === "Male"}
            onChange={(e) => setCatSex(e.target.value)}
          />
          <label className="form-check-label" htmlFor="maleRadio">
            Male
          </label>
        </div>

        <div className="form-check form-check-inline catForm">
          <input
            className="form-check-input"
            type="radio"
            name="sexRadioOptions"
            id="femaleRadio"
            value="Female"
            checked={catSex === "Female"}
            onChange={(e) => setCatSex(e.target.value)}
          />
          <label className="form-check-label" htmlFor="femaleRadio">
            Female
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            className="form-control catForm"
            placeholder="Add cat breed/Colours"
            value={catBreed}
            onChange={(e) => setCatBreed(e.target.value)}
            required
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
            required
          />
          <label>Cat Weight</label>
        </div>

        <div className="form-group catForm">
          <textarea
            className="form-control"
            id="CatDescription"
            rows={3}
            placeholder="Add the cats description"
            onChange={(e) => setCatDescription(e.target.value)}
          ></textarea>
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
            className="form-control catForm"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <label>Cat Image</label>
        </div>
        <div className="row">
          {downloadURLs.map((url, index) => (
            <div className="col-xl-3 col-md-4 col-sm-6" key={index}>
              <img
                className="uploadImage"
                src={url}
                alt={`Uploaded File ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-success btn-lg catForm"
          disabled={isLoading}
        >
          Add New Cat
        </button>

        {isError(error) && <p>Error adding cat: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddCat;
