import React from "react";
import { useCatStore } from "../store/useCatStore";
import CatItem from "./CatItem";

const CatsList: React.FC = () => {
  const cats = useCatStore((state) => state.cats);

  return (
    <>
      <div className="container">
        <div className="row">
          {cats.map((cat) => (
            <div className="col-lg-3 col-sm-6" key={cat.id}>
              <CatItem cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CatsList;
