import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { getUserById } from "@/api/UserAPI";
import { useQuery } from "@tanstack/react-query";
import { UpdateUserForm } from "@/types/index";

interface EditUserProps {
  openEdit: boolean;
  handleClose: () => void;
  handleEdit: (data: UpdateUserForm) => void;
  userId: string | null; // Ahora puede ser string o null
}

const EditUser: React.FC<EditUserProps> = ({
  openEdit,
  handleClose,
  handleEdit,
  userId,
}) => {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["editUser", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId && openEdit, // Ejecuta la consulta solo si userId es válido y el diálogo está abierto
    retry: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserForm>();

  // Usamos useEffect para establecer los valores del formulario cuando se cargue el usuario
  React.useEffect(() => {
    if (user && openEdit) {
      reset({
        email: user.email,
        name: user.name,
        last_name: user.last_name,
        ci: user.ci,
      });
    }
  }, [user, openEdit, reset]);

  const onSubmit = (data: UpdateUserForm) => {
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
      <DialogTitle id="form-dialog-title">Editar Usuario</DialogTitle>
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
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;
