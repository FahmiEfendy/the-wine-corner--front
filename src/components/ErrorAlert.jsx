import { Alert, AlertTitle, Snackbar } from "@mui/material";

const ErrorAlert = ({ error, onClose }) => {
  return (
    <Snackbar open={!!error} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
