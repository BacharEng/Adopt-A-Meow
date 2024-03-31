import React from "react";
import { useCatStore } from "../store/useCatStore";
import CatItem from "./CatItem";
import { auth } from "../services/firebaseConfig";

const AccountCatList: React.FC = () => {
  //local states
  const cats = useCatStore((state) => state.cats);

  //global states

  return (
    <>
      <div className="container catGallery">
        <div className="row">
          {cats
            .filter((cat) => cat.fosterID === auth.currentUser?.uid)
            .map((cat) => (
              <div className="col-lg-4 col-sm-6 cat-list" key={cat.id}>
                <CatItem cat={cat} isAuth={true} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AccountCatList;
