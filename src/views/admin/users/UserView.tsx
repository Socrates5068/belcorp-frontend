import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import UsersTable from "./UsersTable";
import CreateUser from "./CreateUser";
import { createAccountEnhanced } from "@/api/AuthAPI";
import { UserRegistrationFormEnhanced } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function UserView() {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: createAccountEnhanced,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleRegister = (data: UserRegistrationFormEnhanced) => mutate(data);

  return (
    <Paper sx={{ maxWidth: "max-w-96", margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end">

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={handleClickOpen}
              >
                Agregar usuario
              </Button>
              <CreateUser
                open={open}
                handleClose={handleClose}
                handleRegister={handleRegister}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <UsersTable />
    </Paper>
  );
}
