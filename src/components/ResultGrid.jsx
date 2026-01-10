import { useEffect } from "react";
import { fetchGIF, fetchPhotos, fetchVideos } from "../api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setResults,
} from "../redux/features/searchSlice";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector(
    (state) => state.search
  );
  useEffect(
    function () {
      if (!query) return;
      const getData = async () => {
        try {
          dispatch(setLoading());
          let response = [];
          if (activeTab === "All") {
            const [photos, gifs, videos] = await Promise.all([
              fetchPhotos(query, 1, 7),
              fetchGIF(query, 7),
              fetchVideos(query, 6),
            ]);

            response = [...photos, ...gifs, ...videos];
          }
          if (activeTab == "Photos") {
            response = await fetchPhotos(query);
          }
          if (activeTab == "GIFs") {
            response = await fetchGIF(query);
          }
          if (activeTab == "Videos") {
            response = await fetchVideos(query);
          }
          dispatch(setResults(response));
        } catch (error) {
          dispatch(setError(error.message));
        }
      };
      getData();
    },
    [query, activeTab, dispatch]
  );
  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading....</h1>;
  return (
    <div className="flex w-full justify-between gap-5 overflow-auto mt-10 pl-2 pr-2  flex-wrap">
      {results.map((item) => {
        return (
          <div key={item.id}>
            <ResultCard item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default ResultGrid;
