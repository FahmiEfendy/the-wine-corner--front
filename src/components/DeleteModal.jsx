import { useContext } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";

import ErrorAlert from "./ErrorAlert";
import useHttpRequest from "../hooks/http-hook";
import AuthContext from "../context/auth-context";

const style = (matches) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "15px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: matches ? "18rem" : "40rem",
  height: matches ? "10rem" : "10rem",
  backgroundColor: "white",
  border: "2px solid #AF1515",
  padding: "1rem",
});

const DeleteModal = ({ isOpen, closeDeleteModalHandler, id, name }) => {
  const auth = useContext(AuthContext);

  const matches = useMediaQuery("(max-width:768px)");

  const { isLoading, error, sendRequest, errorClearHandler } = useHttpRequest();

  const deleteProductHandler = async () => {
    try {
      sendRequest(`${process.env.REACT_APP_BACKEND_URL}/${id}`, "DELETE", {
        Authorization: `Bearer ${auth.userToken}`,
      });

      closeDeleteModalHandler();

      window.location.reload(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Modal open={isOpen} onClose={closeDeleteModalHandler}>
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box style={style(matches)}>
            <Typography
              variant={matches ? "body1" : "h5"}
              sx={{ margin: "2rem 0" }}
            >
              {`Are you sure want to delete ${name} ?`}
            </Typography>
            <Box sx={{ display: "flex", margin: "0 2rem 0 auto" }}>
              <Button
                variant="outlined"
                sx={{ color: "#AF1515", marginRight: "1rem" }}
                onClick={closeDeleteModalHandler}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#AF1515" }}
                onClick={deleteProductHandler}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
        <ErrorAlert error={error} onClose={errorClearHandler} />
      </Box>
    </Modal>
  );
};

export default DeleteModal;
