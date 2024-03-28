import React from "react";
import { useCatStore } from "../store/useCatStore";
import CatItem from "./CatItem";

const CatsList: React.FC = () => {
  //local states
  const cats = useCatStore((state) => state.cats);

  //global states

  return (
    <>
      <div className="container catGallery">
        <div className="row">
          {cats.map((cat) => (
            <div className="col-lg-3 col-sm-6 cat-list" key={cat.id}>
              <CatItem cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CatsList;
