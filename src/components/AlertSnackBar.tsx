import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export default function AlertSnackBar({stat, type, message }: any) {
  const [open, setOpen] = useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      autoHideDuration={2000}
      className=" z-30"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={stat}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
