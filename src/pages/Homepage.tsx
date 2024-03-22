import CatsList from "../components/CatList";
import { useFetchAndUpdateCats } from "../hooks/useFetchAndUpdateCats";

const Homepage = () => {
  useFetchAndUpdateCats();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 bannerImg">
            <img
              src="src\assets\cat-banner-1980x350.jpg"
              className="img-fluid"
            />
          </div>
          <CatsList />
        </div>
      </div>
    </>
  );
};

export default Homepage;
