import React from "react";

//zustand store hooks
import { useCatStore } from "../store/useCatStore";

//call pages needed
import CatItem from "./CatItem";

const CatsList: React.FC = () => {
  //local states
  const cats = useCatStore((state) => state.cats);

  return (
    <>
      <div className="container catGallery">
        <div className="row">
          {cats.map((cat) => (
            <div className="col-lg-2 col-sm-6" key={cat.id}>
              <CatItem cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CatsList;
