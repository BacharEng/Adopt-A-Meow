import { useState } from "react";
import { useFetchAndUpdateCats } from "../hooks/useFetchAndUpdateCats";
import AddCat from "../components/AddCat";

const MyAccount = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [catName, setCatName] = useState("");
  const [catAge, setCatAge] = useState("");
  const [catAddress, setCatAddress] = useState("");
  const [fosterPhone, setFosterPhone] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    } else {
      console.log("No files were added by User");
    }
  };

  const handleSubmit = async () => {
    console.log("Cat Added");
    setCatName("");
    setCatAge("");
    setCatAddress("");
    setFosterPhone("");
    setImage(null);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <button
              className="btn btn-lg dark-blue-bg sideBar btnHover white-text"
              onClick={() => {
                setIsAdd(!isAdd);
              }}
            >
              Add new cat
            </button>
          </div>
          <div className="col-sm-4">{isAdd && <AddCat />}</div>
          <div className="col-sm-4">
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected Image"
                className="img-fluid"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
