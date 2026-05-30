import { useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { Controller, useForm } from "react-hook-form";
import BarcodeScanner from "react-qr-barcode-scanner";

const AddItemDialog = (props) => {
  const { open, handleClose } = props;

  const [openScanner, setOpenScanner] = useState(false);
  const [stopStream, setStopStream] = useState(true);

  const { control, watch, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      barcode: "",
    },
  });

  const startScanner = async () => {
    setStopStream(false);
    setOpenScanner(true);
  };

  const stopScanner = () => {
    setStopStream(true);

    setTimeout(() => {
      setOpenScanner(false);
    }, 100);
  };

  const barcode = watch("barcode");

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add Item
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
              mb: 3,
              alignItems: "center",
            }}
          >
            <Controller
              name="barcode"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Barcode" />
              )}
            />

            {/* Upload Barcode Image */}
            <Button
              variant="outlined"
              onClick={startScanner}
              sx={{
                minWidth: "50px",
                height: "56px",
              }}
            >
              <CameraAltIcon />
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={openScanner} onClose={stopScanner} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Scan Barcode
          <IconButton onClick={stopScanner}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <BarcodeScanner
            width="100%"
            height={300}
            facingMode="user"
            stopStream={stopStream}
            delay={500}
            onError={(error) => {
              console.log(error);
            }}
            onUpdate={(err, result) => {
              if (result) {
                setValue("barcode", result.text);

                // Stop camera first
                setStopStream(true);

                // Close dialog after stream stops
                setTimeout(() => {
                  setOpenScanner(false);
                }, 100);
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddItemDialog;
