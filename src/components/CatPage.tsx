import { useState } from "react";
import { CatItemProps } from "./CatItem";

const CatPage: React.FC<CatItemProps> = (props: CatItemProps) => {
  const [chooseBanner, setChooseBanner] = useState(props.cat.catBannerImg);

  //choose banner image
  const handleBannerClick = (catImage: string) => {
    setChooseBanner(catImage);
  };

  return (
    <>
      <h1>{`Welcome to ${props.cat.catName}s page!`}</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="col-lg-12">
              <img
                src={chooseBanner}
                className="img-fluid cat-image cat-banner-img"
              />
            </div>
            <p>Choose any cat image</p>
            <div className="row">
              {props.cat.catImages.map((catImage, index) => (
                <div className="col-lg-2 col-sm-4 col-6" key={index}>
                  <img
                    onClick={() => handleBannerClick(catImage)}
                    src={catImage}
                    className="img-fluid cat-image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-12">
            <p>{`Cat Age: ${props.cat.catAge}`}</p>
            <p>{`Cat Sex: ${props.cat.catSex}`}</p>
            <p>{`Cat Breed/Colour: ${props.cat.catBreed}`}</p>
            <p>{`Cat Weight: ${props.cat.catWeight}`}</p>
            <br />
            <h2>Cat Description:</h2>
            {props.cat.catDescription}
            <br />
            <h1>{`To set a meeting please call ${props.cat.fosterPhone}`}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatPage;
