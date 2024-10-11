import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { UpdateSectionForm } from "@/types/index";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getSections, updateSection } from "@/api/SectionAPI";
import Grid2 from "@mui/material/Grid2";
import EditSection from "./EditSection";
import { sections } from "@/hooks/sections";

export default function SectionsTable() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();

  const handleClickOpen = (id: string) => {
    setSelectedSectionId(id); // Establece el ID del usuario seleccionado
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const { mutate: mutateEdit } = useMutation({
    mutationFn: updateSection,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });

  const handleEdit = (data: UpdateSectionForm) => mutateEdit(data);

  const { data, isError, isLoading } = sections();

  if (isLoading) {
    return (
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        Cargando...
      </Typography>
    );
  }
  if (isError) return <Navigate to={"/404"} />;
  if (data) {
    return (
      <div className={"p-4"}>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data?.map((section, index) => (
            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} key={index}>
              <Card sx={{ minWidth: 190 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {section.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    Lorem ipsum dolor sit, amet consectetur
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    adjective
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleClickOpen(section._id)}
                  >
                    Editar
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <EditSection
          openEdit={openEdit}
          handleClose={handleClose}
          handleEdit={handleEdit}
          userId={selectedSectionId}
        />
      </div>
    );
  } else {
    return (
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        No hay usuarios registrados
      </Typography>
    );
  }
}
