import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCats } from "../services/catService";
import { useCatStore } from "../store/useCatStore";

export const useFetchAndUpdateCats = () => {
  const { data: cats } = useQuery("cats", fetchCats);
  const setCats = useCatStore((state) => state.setCats);

  useEffect(() => {
    if (cats) {
      setCats(cats);
    }
  }, [cats, setCats]);
};
