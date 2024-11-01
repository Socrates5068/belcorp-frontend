import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ConferenceRegistrationForm } from "@/types/index";
import { useForm } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";

interface CreateConferencesProps {
  open: boolean;
  handleClose: () => void;
  handleRegister: (data: ConferenceRegistrationForm) => void;
}

const CreateConferences: React.FC<CreateConferencesProps> = ({
  open,
  handleClose,
  handleRegister,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConferenceRegistrationForm>();

  const onSubmit = (data: ConferenceRegistrationForm) => {
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
      <DialogTitle id="form-dialog-title">Registrar Conferencia</DialogTitle>
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
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                type="date"
                label="Fecha"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("date", {
                  required: "La fecha de inicio es obligatoria",
                })}
                error={!!errors.date}
                helperText={errors.date?.message}
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

export default CreateConferences;
