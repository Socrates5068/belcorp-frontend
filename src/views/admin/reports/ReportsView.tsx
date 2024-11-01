import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Grid2 } from "@mui/material";
import Divider from "@mui/material/Divider";
import { ReportRegistrationForm } from "@/types/index";
import { isSocia, useAuth } from "@/hooks/useAuth";
import FragancesTable from "./ReportsTable";
import { createReport } from "@/api/ReportsAPI";
import CreateReport from "./CreateReport";

export default function ReportsView() {
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
    mutationFn: createReport,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success('¡Reporte registrado!');
      queryClient.invalidateQueries({ queryKey: ["reports"] });
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
        Agregar reporte
      </Button>
    );
  };

  const handleRegister = (data: ReportRegistrationForm) => mutate(data);
  if (user)
    return (
      <Paper elevation={3}>
        <Grid2 container direction="column" spacing={2}>
          <Grid2 container justifyContent="flex-end" sx={{ p: 2, pr: 1 }}>
            {isSocia(user.roles) ? addButton() : ""}
            <CreateReport
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
