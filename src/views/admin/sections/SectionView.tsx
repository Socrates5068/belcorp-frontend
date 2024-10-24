import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { SectionRegistrationForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Grid2 } from "@mui/material";
import Divider from "@mui/material/Divider";
import { createSection } from "@/api/SectionAPI";
import CreateSection from "./CreateSection";
import SectionsTable from "./SectionsTable";

export default function SectionView() {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: createSection,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });

  const handleRegister = (data: SectionRegistrationForm) => mutate(data);

  return (
    <Paper elevation={3}>
      <Grid2 container direction="column" spacing={2}>
        <Grid2 container justifyContent="flex-end" sx={{ p: 2, pr: 1 }}>
          {/* <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            onClick={handleClickOpen}
          >
            Agregar Sección
          </Button>
          <CreateSection
            open={open}
            handleClose={handleClose}
            handleRegister={handleRegister}
          /> */}
        </Grid2>
      </Grid2>
      <Divider />
      <SectionsTable />
    </Paper>
  );
}
