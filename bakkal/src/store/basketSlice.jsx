import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
};

export const basketSlice = createSlice({
  name: "basketSlice",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const index = state.basket.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        console.log("index sayı", action.payload);
        action.payload = { ...action.payload, count: 1 };
        state.basket[index].count += action.payload.count;
      } else state.basket.push({ ...action.payload, count: 1 });
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    deleteItem: (state, action) => {
      state.basket = [
        ...state.basket.filter((item) => item.id !== action.payload.id),
      ];
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    clearBasket: (state) => {
      state.basket = [];
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    increaseItem: (state, action) => {
      const index = state.basket.findIndex(
        (item) => item.id === action.payload.id
      );
      state.basket[index].count += 1;
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    decreaseItem: (state, action) => {
      console.log("decrese", action.payload);
      if (action.payload.count <= 1) {
        state.basket = state.basket.filter(
          (item) => item.id !== action.payload.id
        );
        console.log("slice", state.basket);
        localStorage.setItem("basket", JSON.stringify(state.basket));
      } else {
        const index = state.basket.findIndex(
          (item) => item.id === action.payload.id
        );
        state.basket[index].count += -1;
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }
    },
  },
});

export const {
  addToBasket,

  clearBasket,
  increaseItem,
  decreaseItem,
  deleteItem,
} = basketSlice.actions;
export default basketSlice.reducer;
