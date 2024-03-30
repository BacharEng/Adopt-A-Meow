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
        </div>
      </div>
    </>
  );
};

export default CatPage;
