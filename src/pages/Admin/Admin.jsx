import React, { useContext, useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ErrorAlert } from "../../components";
import { useNavigate } from "react-router-dom";
import useHttpRequest from "../../hooks/http-hook";
import AuthContext from "../../context/auth-context";
import InputModal from "../../components/InputModal";

const Admin = () => {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [productList, setProductList] = useState([]);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  const productDetailHandler = (productId, productPath) => {
    navigate(`${productPath}/${productId}`);
  };

  const logoutHandler = () => {
    auth.logout();
  };

  const addProductHandler = () => {
    setIsInputModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsInputModalOpen(false);
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
    <React.Fragment>
      {!error &&
        (isLoading ? (
          <CircularProgress />
        ) : (
          productList && (
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "2rem",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={addProductHandler}
                >
                  ADD PRODUCT
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#AF1515" }}
                  onClick={logoutHandler}
                >
                  LOGOUT
                </Button>
              </Box>
              <TableContainer component={Paper} sx={{ mt: 5 }}>
                <Table size="small">
                  {productList.map((product) => {
                    const productPath = product.productPath;
                    return (
                      <React.Fragment key={product.id}>
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={4} align="center" size="big">
                              <Typography variant="h4">
                                {product.productType}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography variant="h5">
                                Product Image
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h5">Product Name</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h5">
                                Product Price
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h5">Action</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {product.products.map((product) => {
                            return (
                              <TableRow key={product.id}>
                                <TableCell style={{ maxWidth: "10rem" }}>
                                  <img
                                    src={`${process.env.REACT_APP_ASSET_URL}/${product.productImage}`}
                                    alt={product.productName}
                                    style={{ width: "30%" }}
                                  />
                                </TableCell>
                                <TableCell
                                  onClick={() => {
                                    productDetailHandler(
                                      product.id,
                                      productPath
                                    );
                                  }}
                                >
                                  <Typography variant="h6">
                                    {product.productName}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="h6">
                                    {product.productPrice}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <>
                                    <IconButton
                                      onClick={() => {
                                        console.log(product.id);
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => {
                                        console.log(product.id);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </React.Fragment>
                    );
                  })}
                </Table>
              </TableContainer>
            </Container>
          )
        ))}

      <InputModal
        isOpen={isInputModalOpen}
        closeModalHandler={closeModalHandler}
      />

      <ErrorAlert error={error} onClose={clearErrorHandler} />
    </React.Fragment>
  );
};

export default Admin;
