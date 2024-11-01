import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Grid2 } from "@mui/material";
import Divider from "@mui/material/Divider";
import { FraganceRegistrationForm } from "@/types/index";
import { isGerente, useAuth } from "@/hooks/useAuth";
import FragancesTable from "./FragancesTable";
import CreateFragance from "./CreateFragance";
import { createFragance } from "@/api/FragancesAPI";

export default function FragancesView() {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { data: user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: createFragance,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success('¡Fragancia registrada!');
      queryClient.invalidateQueries({ queryKey: ["fragances"] });
    },
  });

  const addButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{ mr: 1 }}
        onClick={handleClickOpen}
      >
        Agregar Fragancia
      </Button>
    );
  };

  const handleRegister = (data: FraganceRegistrationForm) => mutate(data);
  if (user)
    return (
      <Paper elevation={3}>
        <Grid2 container direction="column" spacing={2}>
          <Grid2 container justifyContent="flex-end" sx={{ p: 2, pr: 1 }}>
            {isGerente(user.roles) ? addButton() : ""}
            <CreateFragance
              open={open}
              handleClose={handleClose}
              handleRegister={handleRegister}
            />
          </Grid2>
        </Grid2>
        <Divider />
        <FragancesTable />
      </Paper>
    );
}
