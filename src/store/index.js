import { configureStore, createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  productId: null,
  productName: "",
  productPrice: "",
  productImage: "",
  productPath: "",
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    productDetail: (state, actions) => {
      state.productId = actions.payload.productId;
      state.productName = actions.payload.productName;
      state.productPrice = actions.payload.productPrice;
      state.productImage = actions.payload.productImage;
      state.productPath = actions.payload.productPath;
    },
  },
});

export const store = configureStore({ reducer: productSlice.reducer });
export const productActions = productSlice.actions;
