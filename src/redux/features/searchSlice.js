import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    activeTab: "Photos",
    results: [],
    loading: false,
    loadingMore: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
      state.results = [];
      state.hasMore = true;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
      state.page = 1;
      state.results = [];
      state.hasMore = true;
    },
    setResults(state, action) {
      const { results, hasMore } = action.payload;
      state.results = results;
      state.hasMore = hasMore;
      state.loading = false;
      state.loadingMore = false;
    },
    appendResults(state, action) {
      const { results, hasMore } = action.payload;
      state.results = [...state.results, ...results];
      state.hasMore = hasMore;
      state.loadingMore = false;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
      state.page = 1;
    },
    setLoadingMore(state) {
      state.loadingMore = true;
    },
    incrementPage(state) {
      state.page += 1;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.loadingMore = false;
    },
    clearResults(state) {
      state.results = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
});

export const {
  setQuery,
  setActiveTab,
  setResults,
  appendResults,
  setLoading,
  setLoadingMore,
  incrementPage,
  setError,
  clearResults,
} = searchSlice.actions;
export default searchSlice.reducer;
