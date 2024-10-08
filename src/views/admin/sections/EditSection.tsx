import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { UpdateSectionForm } from "@/types/index";
import Grid2 from "@mui/material/Grid2";
import { getSectionById } from "@/api/SectionAPI";

interface EditSectionProps {
  openEdit: boolean;
  handleClose: () => void;
  handleEdit: (data: UpdateSectionForm) => void;
  userId: string | null; // Ahora puede ser string o null
}

const EditSection: React.FC<EditSectionProps> = ({
  openEdit,
  handleClose,
  handleEdit,
  userId,
}) => {
  const {
    data: section,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["editSection", userId],
    queryFn: () => getSectionById(userId),
    enabled: !!userId && openEdit, // Ejecuta la consulta solo si userId es válido y el diálogo está abierto
    retry: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateSectionForm>();

  // Usamos useEffect para establecer los valores del formulario cuando se cargue el usuario
  React.useEffect(() => {
    if (section && openEdit) {
      reset({
        name: section.name,
      });
    }
  }, [section, openEdit, reset]);

  const onSubmit = (data: UpdateSectionForm) => {
    handleEdit({ ...data, _id: userId });
    reset();
    handleClose(); // Cerrar el modal después de enviar
  };

  // Función para manejar el cierre y resetear el formulario
  const handleCancel = () => {
    handleClose();
    reset(); // Resetear el formulario a los valores iniciales o a vacío
  };

  if (isLoading) return null; // Puedes mostrar un indicador de carga si lo deseas

  if (isError) return "Error al cargar los datos del usuario.";

  return (
    <Dialog
      open={openEdit}
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

export default EditSection;
