import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ReportRegistrationForm } from "@/types/index";
import { useForm } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "@/hooks/useAuth";

interface CreateReportsProps {
  open: boolean;
  handleClose: () => void;
  handleRegister: (data: ReportRegistrationForm) => void;
}

const reportTypes = {
  reportNews: "Reporte de nuevas y prospecto",
  reportPegs: "Reporte de PEGS",
};

const reportTypesArray = Object.entries(reportTypes).map(([key, value]) => ({
  key,
  value,
}));

const CreateReport: React.FC<CreateReportsProps> = ({
  open,
  handleClose,
  handleRegister,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportRegistrationForm>();

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  const { data: user } = useAuth();
  const onSubmit = (data: ReportRegistrationForm) => {
    if (selectedFile) {
      handleRegister({ ...data, file: selectedFile, userId: user._id });
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

            {/* Campo de tipo de reporte */}
            <Grid2 size={12}>
              <FormControl fullWidth required error={!!errors.reportType}>
                <InputLabel id="reportType">Tipo de reporte</InputLabel>
                <Select
                  labelId="reportType"
                  label="Tipo de reporte"
                  {...register("reportType", {
                    required: "El tipo es obligatorio",
                  })}
                  defaultValue={[]}
                >
                  {reportTypesArray?.map((reportType) => (
                    <MenuItem key={reportType.key} value={reportType.value}>
                      {reportType.value}
                    </MenuItem>
                  ))}
                </Select>
                {errors.reportType && (
                  <FormHelperText>{errors.reportType?.message}</FormHelperText>
                )}
              </FormControl>
            </Grid2>

            <Grid2 size={12}>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ width: "100%", marginTop: "8px" }}
              />
              <FormHelperText style={!selectedFile ? { color: "red" } : {}}>
                {!selectedFile && "La imagen es obligatoria"}
              </FormHelperText>

              <FormHelperText
                style={errors.file?.message ? { color: "red" } : {}}
              >
                {errors.file?.message}
              </FormHelperText>
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

export default CreateReport;
