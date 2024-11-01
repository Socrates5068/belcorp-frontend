import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FraganceRegistrationForm } from "@/types/index";
import { useForm } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";
import FormHelperText from "@mui/material/FormHelperText";

interface FraganceReportsProps {
  open: boolean;
  handleClose: () => void;
  handleRegister: (data: FraganceRegistrationForm) => void;
}

const CreateFragance: React.FC<FraganceReportsProps> = ({
  open,
  handleClose,
  handleRegister,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FraganceRegistrationForm>();

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmit = (data: FraganceRegistrationForm) => {
    if (selectedFile) {
      handleRegister({ ...data, file: selectedFile });
      reset();
      setSelectedFile(null); // Resetea el estado del archivo
      handleClose(); // Cierra el modal
    } else {
      console.error("No se ha seleccionado un archivo");
    }
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
                type="description"
                label="Descripción"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid2>

            <Grid2 size={12}>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ width: "100%", marginTop: "8px" }}
              />
              <FormHelperText>
                {!selectedFile && "La imagen es obligatoria"}
              </FormHelperText>

              <FormHelperText>{errors.file?.message}</FormHelperText>
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

export default CreateFragance;
