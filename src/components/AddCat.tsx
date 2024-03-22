import React, { useState } from "react";
import { useMutation } from "react-query";
import { createCat } from "../services/catService";
import { useCatStore } from "../store/useCatStore";

const AddCat: React.FC = () => {
  const [catImage, setCatImage] = useState<File | null>(null);
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [fosterAddress, setFosterAddress] = useState("");
  const [fosterPhone, setFosterPhone] = useState("");

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
      });

      setCatName("");
      setCatAge("");
      setFosterAddress("");
      setFosterPhone("");
      setCatImage(null);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ catName, catAge, fosterAddress, fosterPhone, catImage });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCatImage(file);
    } else {
      console.log("No files were added by User");
    }
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
            className="form-control inputLogin"
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
            className="form-control inputLogin"
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
            className="form-control inputLogin"
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
            className="form-control inputLogin"
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
            className="form-control inputLogin"
            onChange={handleImageChange}
          />
          <label>Cat Image</label>
        </div>

        <button
          type="submit"
          className="btn btn-success btn-lg inputLogin"
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
