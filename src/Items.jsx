import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddItemDialog from "./AddItemDialog";

const Items = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Inventory Items
        </Typography>

        <Button
          variant="contained"
          //   startIcon={<AddIcon />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Item
        </Button>
      </Box>
      <AddItemDialog open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default Items;
