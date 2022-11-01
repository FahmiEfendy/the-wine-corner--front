import { configureStore, createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  productPath: "",
  productType: "",
  productId: null,
  productName: "",
  productPrice: "",
  productImage: "",
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    productDetail: (state, actions) => {
      state.productPath = actions.payload.productPath;
      state.productType = actions.payload.productType;
      state.productId = actions.payload.productId;
      state.productName = actions.payload.productName;
      state.productPrice = actions.payload.productPrice;
      state.productImage = actions.payload.productImage;
    },
  },
});

export const store = configureStore({ reducer: productSlice.reducer });
export const productActions = productSlice.actions;
