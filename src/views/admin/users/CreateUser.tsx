import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  userPermissions,
  UserRegistrationFormEnhanced,
  userRoles,
} from "@/types/index";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useSections } from "@/hooks/sections";
import { isGerente, useAuth } from "@/hooks/useAuth";

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

  const { data: user } = useAuth();
  let roles;

  if (user && isGerente(user?.roles)) {
    roles = {
      socia: "Socia",
    };
  } else {
    roles = userRoles;
  }

  const { data } = useSections();
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

            {/* Campo de Rol */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.roles}>
                <InputLabel id="roles">Roles</InputLabel>
                <Select
                  labelId="roles"
                  label="Roles"
                  multiple
                  {...register("roles", {
                    required: "Al menos un rol es obligatorio",
                  })}
                  defaultValue={[]}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {Object.values(roles).map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
                {errors.roles && (
                  <FormHelperText>{errors.roles.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Campo de Secciones */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.section}>
                <InputLabel id="section">Sección</InputLabel>
                <Select
                  labelId="section"
                  label="Sección"
                  {...register("section", {
                    required: "La Sección es obligatoria",
                  })}
                  defaultValue={[]}
                >
                  {data?.map((section) => (
                    <MenuItem key={section._id} value={section._id}>
                      {section.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.section && (
                  <FormHelperText>{errors.section?.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* Campo para permisos */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.permissions}>
                <InputLabel id="roles">Permisos</InputLabel>
                <Select
                  labelId="permisos"
                  label="Permisos"
                  multiple
                  {...register("permissions", {
                    required: "Al menos un rol es obligatorio",
                  })}
                  defaultValue={[]}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {Object.values(userPermissions).map((permission) => (
                    <MenuItem key={permission} value={permission}>
                      {permission}
                    </MenuItem>
                  ))}
                </Select>
                {errors.permissions && (
                  <FormHelperText>{errors.permissions.message}</FormHelperText>
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
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUser;
