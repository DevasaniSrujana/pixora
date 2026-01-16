import { useEffect, useRef, useCallback } from "react";
import { fetchGIF, fetchPhotos, fetchVideos } from "../api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setResults,
  appendResults,
  setLoadingMore,
  incrementPage,
} from "../redux/features/searchSlice";
import ResultCard from "./ResultCard";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, loadingMore, error, page, hasMore } = useSelector(
    (state) => state.search
  );
  const observerRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || !query) return;
    
    try {
      dispatch(setLoadingMore());
      let response;
      
      switch (activeTab) {
        case "Photos":
          response = await fetchPhotos(query, page + 1);
          break;
        case "GIFs":
          response = await fetchGIF(query, 20);
          break;
        case "Videos":
          response = await fetchVideos(query, 20);
          break;
        default:
          return;
      }
      
      dispatch(appendResults(response));
      dispatch(incrementPage());
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [query, activeTab, page, hasMore, loadingMore, dispatch]);

  useEffect(() => {
    if (!query) return;
    
    const getData = async () => {
      try {
        dispatch(setLoading());
        let response;
        
        switch (activeTab) {
          case "All": {
            const [photos, gifs, videos] = await Promise.all([
              fetchPhotos(query, 1, 7),
              fetchGIF(query, 7),
              fetchVideos(query, 6),
            ]);
            // Combine results from all sources
            const allResults = [
              ...(photos.results || []),
              ...(gifs.results || []),
              ...(videos.results || []),
            ];
            response = {
              results: allResults,
              hasMore: photos.hasMore || gifs.hasMore || videos.hasMore,
            };
            break;
          }
          case "Photos":
            response = await fetchPhotos(query);
            break;
          case "GIFs":
            response = await fetchGIF(query);
            break;
          case "Videos":
            response = await fetchVideos(query);
            break;
          default:
            response = { results: [], hasMore: false };
        }
        
        dispatch(setResults(response));
      } catch (err) {
        dispatch(setError(err.message || "Failed to load results"));
      }
    };
    
    getData();
  }, [query, activeTab, dispatch]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loadingMore, loadMore]);

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={() => {
          dispatch(setError(null));
          // Retry logic will be triggered by useEffect
        }}
      />
    );
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!Array.isArray(results) || results.length === 0) {
    return <EmptyState query={query} activeTab={activeTab} />;
  }

  return (
    <>
      <div className="flex w-full justify-between gap-5 overflow-auto mt-10 pl-2 pr-2 flex-wrap">
        {results.map((item) => {
          return (
            <div key={item.id}>
              <ResultCard item={item} />
            </div>
          );
        })}
      </div>
      {hasMore && (
        <div ref={observerRef} className="h-20 flex items-center justify-center">
          {loadingMore && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-violet-600 rounded-full animate-spin"></div>
              <span>Loading more...</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ResultGrid;
