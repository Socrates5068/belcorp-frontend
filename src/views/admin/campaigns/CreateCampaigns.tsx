import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CampaignRegistrationForm } from "@/types/index";
import { useForm } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";

interface CreateCampaignsProps {
  open: boolean;
  handleClose: () => void;
  handleRegister: (data: CampaignRegistrationForm) => void;
}

const CreateCampaign: React.FC<CreateCampaignsProps> = ({
  open,
  handleClose,
  handleRegister,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignRegistrationForm>();

  const onSubmit = (data: CampaignRegistrationForm) => {
    handleRegister(data);
    reset();
    handleClose(); // Cerrar el modal después de enviar
  };

  // Función para manejar el cierre y resetear el formulario
  const handleCancel = () => {
    reset(); // Resetear el formulario a los valores iniciales o a vacío
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Registrar Sección</DialogTitle>
      <DialogContent sx={{ width: 484 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2} size={12}>
            {/* Campo de Nombre */}
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                label="Nombre"
                sx={{ mt: 1 }}
                {...register("name", {
                  required: "El nombre es obligatorio",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid2>
            {/* Campo de Fecha de Inicio */}
            <Grid2 size={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Fecha de Inicio"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("startDate", {
                  required: "La fecha de inicio es obligatoria",
                })}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
            </Grid2>
            {/* Campo de Fecha de Fin */}
            <Grid2 size={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Fecha de Fin"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("endDate", {
                  required: "La fecha de fin es obligatoria",
                })}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            </Grid2>
          </Grid2>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancelar
        </Button>
        <Button type="submit" onClick={handleSubmit(onSubmit)} color="primary">
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCampaign;
