import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DocumentRegistrationForm } from "@/types/index";
import { useForm } from "react-hook-form";
import Grid2 from "@mui/material/Grid2";
import FormHelperText from "@mui/material/FormHelperText";
import { useCampaigns } from "@/hooks/campaigns";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";
import { useSections } from "@/hooks/sections";

interface CreateSectionProps {
  open: boolean;
  handleClose: () => void;
  handleRegister: (data: DocumentRegistrationForm) => void;
}

const CreateDocument: React.FC<CreateSectionProps> = ({
  open,
  handleClose,
  handleRegister,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DocumentRegistrationForm>();

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmit = (data: DocumentRegistrationForm) => {
    if (selectedFile) {
      handleRegister({ ...data, file: selectedFile });
      reset();
      setSelectedFile(null); // Resetea el estado del archivo
      handleClose(); // Cierra el modal
    } else {
      console.error("No se ha seleccionado un archivo");
    }
  };
  
  const { data: campaigns } = useCampaigns();
  const { data: sections } = useSections();


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
      <DialogTitle id="form-dialog-title">Subir Archivo</DialogTitle>
      <DialogContent sx={{ width: 484 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2} size={12}>
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                label="Título"
                sx={{ mt: 1 }}
                {...register("title", {
                  required: "El nombre es obligatorio",
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                label="Descripción"
                sx={{ mt: 1 }}
                {...register("description", {
                  required: "El nombre es obligatorio",
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
                {!selectedFile && "El archivo es obligatorio"}
              </FormHelperText>

              <FormHelperText>{errors.file?.message}</FormHelperText>
            </Grid2>

            {/* Campo de Campañas */}
            <Grid2 size={6}>
              <FormControl fullWidth required error={!!errors.campaign}>
                <InputLabel id="campaign">Sección</InputLabel>
                <Select
                  labelId="campaign"
                  label="Campaña"
                  {...register("campaign", {
                    required: "La Sección es obligatoria",
                  })}
                  defaultValue={[]}
                >
                  {campaigns?.map((campaign) => (
                    <MenuItem key={campaign._id} value={campaign._id}>
                      {campaign.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.campaign && (
                  <FormHelperText>{errors.campaign?.message}</FormHelperText>
                )}
              </FormControl>
            </Grid2>

            {/* Campo de Secciones */}
            <Grid2 size={6}>
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
                  {sections?.map((section) => (
                    <MenuItem key={section._id} value={section._id}>
                      {section.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.section && (
                  <FormHelperText>{errors.section?.message}</FormHelperText>
                )}
              </FormControl>
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

export default CreateDocument;
