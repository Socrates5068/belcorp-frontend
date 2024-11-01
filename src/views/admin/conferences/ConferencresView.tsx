import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Grid2 } from "@mui/material";
import Divider from "@mui/material/Divider";
import { ConferenceRegistrationForm } from "@/types/index";
import { isGerente, useAuth } from "@/hooks/useAuth";
import ConferencesTable from "./ConferencesTable";
import CreateConferences from "./CreateConferences";
import { createConference } from "@/api/ConferencesAPI";

export default function ConferencresView() {
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
    mutationFn: createConference,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["conferences"] });
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
        Agregar Conferencia
      </Button>
    );
  };

  const handleRegister = (data: ConferenceRegistrationForm) => mutate(data);
  if (user)
    return (
      <Paper elevation={3}>
        <Grid2 container direction="column" spacing={2}>
          <Grid2 container justifyContent="flex-end" sx={{ p: 2, pr: 1 }}>
            {isGerente(user.roles) ? addButton() : ""}
            <CreateConferences
              open={open}
              handleClose={handleClose}
              handleRegister={handleRegister}
            />
          </Grid2>
        </Grid2>
        <Divider />
        <ConferencesTable />
      </Paper>
    );
}
