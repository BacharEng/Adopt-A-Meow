import CatsList from "../components/CatList";
import { useFetchAndUpdateCats } from "../hooks/useFetchAndUpdateCats";
import { useUserStore } from "../store/useUserStore";

const Homepage = () => {
  const { id } = useUserStore();
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
          <h1 style={{ paddingBottom: "36px" }}>{`Hello user: ${id}`}</h1>
          <CatsList />
        </div>
      </div>
    </>
  );
};

export default Homepage;
