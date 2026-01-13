import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let isProductExist = false;
      state.items.map((item) => {
        if (item.prd_id === action.payload.prd_id) {
          isProductExist = true;
          item.qty += Number(action.payload.qty);
        }
      });

      if (!isProductExist) {
        state.items.push(action.payload);
      }
    },

    updateCart: (state, action) => {
      state.items.map((item) => {
        if (item.prd_id === action.payload.prd_id) {
          item.qty = Number(action.payload.qty);
        }
      });
    },

    deleteItemCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.prd_id !== action.payload.prd_id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export default cartReducer.reducer;
export const { addToCart, updateCart, deleteItemCart, clearCart } = cartReducer.actions;

