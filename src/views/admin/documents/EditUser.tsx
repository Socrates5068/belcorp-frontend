import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { getUserById } from "@/api/UserAPI";
import { useQuery } from "@tanstack/react-query";
import { UpdateUserForm, userRoles } from "@/types/index";
import { useSections } from "@/hooks/sections";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

interface EditUserProps {
  openEdit: boolean;
  handleClose: () => void;
  handleEdit: (data: UpdateUserForm) => void;
  userId: string | null;
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
    enabled: !!userId && openEdit,
    retry: false,
  });

  const { data } = useSections();
  const {
    control,
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
        roles: user.roles,
        section: user.section,
      });
    }
  }, [user, openEdit, reset]);

  const onSubmit = (data: UpdateUserForm) => {
    handleEdit({ ...data, _id: userId });
    reset();
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
    reset();
  };

  if (isLoading) return null;
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

            {/* Campo de Rol */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.roles}>
                <InputLabel id="roles">Roles</InputLabel>
                <Controller
                  name="roles"
                  control={control}
                  rules={{ required: "Al menos un rol es obligatorio" }}
                  render={({ field }) => (
                    <Select
                      labelId="roles"
                      label="Roles"
                      multiple
                      {...field}
                      renderValue={(selected) =>
                        (selected as string[]).join(", ")
                      }
                    >
                      {Object.values(userRoles).map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.roles && (
                  <FormHelperText>{errors.roles.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Campo de Sección */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.section}>
                <InputLabel id="section">Sección</InputLabel>
                <Controller
                  name="section"
                  control={control}
                  rules={{ required: "La Sección es obligatoria" }}
                  render={({ field }) => (
                    <Select labelId="section" label="Sección" {...field}>
                      {data?.map((section) => (
                        <MenuItem key={section._id} value={section._id}>
                          {section.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.section && (
                  <FormHelperText>{errors.section.message}</FormHelperText>
                )}
              </FormControl>
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
