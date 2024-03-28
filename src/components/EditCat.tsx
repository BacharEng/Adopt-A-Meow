import React from "react";

const EditCat = () => {

    
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
  );
};

export default EditCat;
