import { useContext, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import ImageUpload from "./ImageUpload";
import useHttpHook from "../hooks/http-hook";
import AuthContext from "../context/auth-context";
import ErrorAlert from "../components/ErrorAlert";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "15px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40rem",
  height: "50rem",
  backgroundColor: "white",
  border: "2px solid #AF1515",
};

const InputModal = ({ isOpen, closeModalHandler }) => {
  const auth = useContext(AuthContext);

  const [productName, setProductName] = useState("");
  const [productList, setProductList] = useState([]);
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpHook();

  const productNameChangeHandler = (e) => {
    setProductName(e.target.value);
  };

  const productPriceChangeHandler = (e) => {
    setProductPrice(e.target.value);
  };

  const productCategoryChangeHandler = (e) => {
    setProductCategory(e.target.value);
  };

  const submitNewProductHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("productName", productName);
      formData.append(
        "productPrice",
        Number(productPrice)
          .toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
          .replace(",00", "")
          .replace(/\s/g, "")
      );

      formData.append("productCategory", productCategory);
      formData.append("productImage", productImage);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/product`,
        "POST",
        {
          Authorization: `Bearer ${auth.userToken}`,
        },
        formData
      );

      closeModalHandler();
      window.location.reload(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/product`
        );

        setProductList(responseData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRequest();
  }, [sendRequest]);

  return (
    <Modal open={isOpen} onClose={closeModalHandler}>
      <Box style={style}>
        <IconButton
          sx={{
            marginLeft: "auto",
            m: "1rem 1rem 1rem auto",
            color: "#AF1515",
          }}
          onClick={closeModalHandler}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4">Add Product</Typography>
        {!error &&
          (isLoading ? (
            <CircularProgress />
          ) : (
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onSubmit={submitNewProductHandler}
            >
              <TextField
                sx={{ width: "30rem", m: "2rem 0" }}
                variant="outlined"
                label="Product Name"
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => productNameChangeHandler(e)}
              />
              <TextField
                sx={{ width: "30rem" }}
                variant="outlined"
                label="Product Price"
                type="number"
                id="productPrice"
                value={productPrice}
                onChange={(e) => productPriceChangeHandler(e)}
              />
              <FormControl sx={{ marginTop: "2rem" }}>
                <InputLabel>Product Category</InputLabel>
                <Select
                  id="productCategory"
                  value={productCategory}
                  label="Product Category"
                  onChange={(e) => {
                    productCategoryChangeHandler(e);
                  }}
                >
                  {productList &&
                    productList.map((product) => (
                      <MenuItem value={product.id} key={product.id}>
                        {product.productType}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <ImageUpload
                id="productImage"
                setProductImage={setProductImage}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "2rem" }}
              >
                Add Product
              </Button>
            </form>
          ))}
        <ErrorAlert error={error} onClose={clearErrorHandler} />
      </Box>
    </Modal>
  );
};

export default InputModal;
