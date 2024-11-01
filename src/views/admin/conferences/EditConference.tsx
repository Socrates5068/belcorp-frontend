import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { UpdateConferenceForm } from "@/types/index";
import { useForm } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import { getConferenceById } from "@/api/ConferencesAPI";

interface EditConferencesProps {
  open: boolean;
  handleClose: () => void;
  handleEdit: (data: UpdateConferenceForm) => void;
  userId: string | null;
}

const EditCampaign: React.FC<EditConferencesProps> = ({
  open,
  handleClose,
  handleEdit,
  userId,
}) => {
  const {
    data: conference,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["editConference", userId],
    queryFn: () => getConferenceById(userId),
    enabled: !!userId && open, // Ejecuta la consulta solo si userId es válido y el diálogo está abierto
    retry: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateConferenceForm>();

  // Usamos useEffect para establecer los valores del formulario cuando se cargue el usuario
  React.useEffect(() => {
    if (conference && open) {
      const formattedtDate = conference.date
        ? new Date(conference.date).toISOString().substring(0, 10)
        : "";
      reset({
        name: conference.name,
        date: formattedtDate,
      });
    }
  }, [conference, open, reset]);

  const onSubmit = (data: UpdateConferenceForm) => {
    handleEdit({ ...data, _id: userId });
    reset();
    handleClose(); // Cerrar el modal después de enviar
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
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCampaign;
