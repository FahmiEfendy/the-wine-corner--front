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
  useMediaQuery,
} from "@mui/material";

import { ImageUpload } from "./";
import useHttpHook from "../hooks/http-hook";
import AuthContext from "../context/auth-context";
import ErrorAlert from "../components/ErrorAlert";

const style = (matches) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "15px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: matches ? "20rem" : "40rem",
  height: matches ? "50rem" : "50rem",
  backgroundColor: "white",
  border: "2px solid #AF1515",
});

const InputModal = ({ isOpen, closeModalHandler, id = null, path = "" }) => {
  const auth = useContext(AuthContext);

  const matches = useMediaQuery("(max-width:768px)");

  const [updateFile, setUpdateFile] = useState();
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

    if (id == null) {
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
    } else {
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
        `${process.env.REACT_APP_BACKEND_URL}/${id}`,
        "PATCH",
        {
          Authorization: `Bearer ${auth.userToken}`,
        },
        formData
      );

      closeModalHandler();
      window.location.reload(true);
    }
  };

  // GET Category List
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

  // GET Product Detail
  useEffect(() => {
    const fetchRequest = async () => {
      if (!id) {
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductImage("");
        setUpdateFile("");
        return;
      }

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}${path}/${id}`
        );

        setProductName(responseData.data.productName);
        setProductPrice(responseData.data.productPrice.replace(/[^\d]/g, ""));
        setProductCategory(responseData.data.productCategory);
        setProductImage(responseData.data.productImage);
        setUpdateFile(
          `${process.env.REACT_APP_ASSET_URL}/${responseData.data.productImage}`
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRequest();
  }, [id, path, sendRequest]);

  return (
    <Modal open={isOpen} onClose={closeModalHandler}>
      <Box style={style(matches)}>
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
        <Typography variant={`${matches ? "h6" : "h4"}`}>{`${
          id ? "Update" : "Add"
        } Product`}</Typography>
        {!error &&
          (isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem 0",
              }}
            >
              <CircularProgress color="error" />
            </Box>
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
                sx={{ width: `${matches ? "15rem" : "30rem"}`, m: "2rem 0" }}
                variant="outlined"
                label="Product Name"
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => productNameChangeHandler(e)}
              />
              <TextField
                sx={{ width: `${matches ? "15rem" : "30rem"}` }}
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
                updateFile={updateFile}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "2rem" }}
              >
                {`${id ? "Update" : "Add"} Product`}
              </Button>
            </form>
          ))}
        <ErrorAlert error={error} onClose={clearErrorHandler} />
      </Box>
    </Modal>
  );
};

export default InputModal;
