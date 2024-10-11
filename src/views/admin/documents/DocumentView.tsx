import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { DocumentRegistrationForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Grid2 } from "@mui/material";
import Divider from "@mui/material/Divider";
import CreateDocument from "./CreateDocument";
import DocumentsTable from "./DocumentsTable";
import { createDocument } from "@/api/DocumentAPI";

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
    mutationFn: createDocument,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  const handleRegister = (data: DocumentRegistrationForm) => mutate(data);

  return (
    <Paper elevation={3}>
      <Grid2 container direction="column" spacing={2}>
        <Grid2 container justifyContent="flex-end" sx={{ p: 2, pr: 1 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            onClick={handleClickOpen}
          >
            Agregar Documento
          </Button>
          <CreateDocument
            open={open}
            handleClose={handleClose}
            handleRegister={handleRegister}
          />
        </Grid2>
      </Grid2>
      <Divider />
      <DocumentsTable />
    </Paper>
  );
}
