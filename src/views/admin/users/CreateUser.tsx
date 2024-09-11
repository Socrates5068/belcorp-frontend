import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { UserRegistrationFormEnhanced } from "@/types/index";
import { useForm } from "react-hook-form";

interface CreateUserProps {
  open: boolean;
  handleClose: () => void;
  handleRegister: (data: UserRegistrationFormEnhanced) => void;
}

const CreateUser: React.FC<CreateUserProps> = ({
  open,
  handleClose,
  handleRegister,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationFormEnhanced>();

  const onSubmit = (data: UserRegistrationFormEnhanced) => {
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
      <DialogTitle id="form-dialog-title">Registrar Usuario</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Campo de Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                sx={{ mt: 1 }}
                {...register("email", {
                  required: "El Email de registro es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            {/* Campo de Nombre */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nombre"
                {...register("name", {
                  required: "El nombre es obligatorio",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            {/* Campo de Apellido */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Apellido"
                {...register("last_name", {
                  required: "El apellido es obligatorio",
                })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>

            {/* Campo de CI */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Cédula de Identidad"
                {...register("ci", {
                  required: "La cédula de identidad es obligatoria",
                })}
                error={!!errors.ci}
                helperText={errors.ci?.message}
              />
            </Grid>
          </Grid>
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

export default CreateUser;
