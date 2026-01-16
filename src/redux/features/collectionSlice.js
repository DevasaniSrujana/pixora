import { createSlice } from "@reduxjs/toolkit";
import { toast, Bounce } from "react-toastify";

// Safe localStorage parsing
const getInitialItems = () => {
  try {
    const stored = localStorage.getItem("collection");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error parsing collection from localStorage:", error);
    return [];
  }
};

// Safe localStorage writing
const setLocalStorage = (items) => {
  try {
    localStorage.setItem("collection", JSON.stringify(items));
  } catch (error) {
    console.error("Error saving collection to localStorage:", error);
  }
};

const initialState = {
  items: getInitialItems(),
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addToCollection: (state, action) => {
      const alreadyExists = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!alreadyExists) {
        state.items.push(action.payload);
        setLocalStorage(state.items);
      }
    },
    removeCollection: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      setLocalStorage(state.items);
    },
    clearCollection: (state) => {
      state.items = [];
      try {
        localStorage.removeItem("collection");
      } catch (error) {
        console.error("Error clearing collection from localStorage:", error);
      }
    },
    addToast: () => {
      toast.info("Added to Collection", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
    removeToast: () => {
      toast.error("Removed from Collection", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
    clearToast: () => {
      toast.error("Collection is Cleared", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  },
});

export const {
  addToCollection,
  removeCollection,
  clearCollection,
  addToast,
  removeToast,
  clearToast,
} = collectionSlice.actions;
export default collectionSlice.reducer;
