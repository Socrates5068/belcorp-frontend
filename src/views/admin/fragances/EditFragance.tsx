import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { UpdateFraganceForm } from "@/types/index";
import { useForm } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import { getFraganceById } from "@/api/FragancesAPI";
import FormHelperText from "@mui/material/FormHelperText";

interface EditFraganceProps {
  open: boolean;
  handleClose: () => void;
  handleEdit: (data: UpdateFraganceForm) => void;
  fraganceId: string | null;
}

const EditFragance: React.FC<EditFraganceProps> = ({
  open,
  handleClose,
  handleEdit,
  fraganceId,
}) => {
  const {
    data: fragance,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["editFragance", fraganceId],
    queryFn: () => getFraganceById(fraganceId),
    enabled: !!fraganceId && open, // Ejecuta la consulta solo si userId es válido y el diálogo está abierto
    retry: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateFraganceForm>();

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  // Usamos useEffect para establecer los valores del formulario cuando se cargue el usuario
  React.useEffect(() => {
    if (fragance && open) {
      reset({
        name: fragance.name,
        description: fragance.description,
      });
    }
  }, [fragance, open, reset]);

  const onSubmit = (data: UpdateFraganceForm) => {
    if (selectedFile) {  // Ensure selectedFile is not null
      handleEdit({ ...data, _id: fraganceId, file: selectedFile });
      reset();
      handleClose(); // Close the modal after submitting
    } else {
      // Handle the case where no file is selected
      console.error('No file selected');
    }
  };

  // Función para manejar el cierre y resetear el formulario
  const handleCancel = () => {
    reset(); // Resetear el formulario a los valores iniciales o a vacío
    handleClose();
  };

  if (isLoading) return null; // Puedes mostrar un indicador de carga si lo deseas

  if (isError) return "Error al cargar los datos del usuario.";

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Editar Sección</DialogTitle>
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
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFragance;
