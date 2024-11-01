import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { UpdateFraganceForm } from "@/types/index";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Grid2 from "@mui/material/Grid2";
import CardActionArea from "@mui/material/CardActionArea";
import { CardHeader, CardMedia, styled } from "@mui/material";
import { isGerente, useAuth } from "@/hooks/useAuth";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  deleteFraganceById,
  getFragances,
  updateFragance,
} from "@/api/FragancesAPI";
import EditFragance from "./EditFragance";

export default function FragancesTable() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null
  );

  const queryClient = useQueryClient();

  const handleClickOpen = (id: string) => {
    setSelectedCampaignId(id); // Establece el ID del usuario seleccionado
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const { mutate: mutateEdit } = useMutation({
    mutationFn: updateFragance,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado");
      queryClient.invalidateQueries({ queryKey: ["fragances"] });
    },
  });

  const {
    data: fragances,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fragances"],
    queryFn: () => getFragances(),
    retry: false,
  });

  const handleEdit = (data: UpdateFraganceForm) => mutateEdit(data);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteFraganceById,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Eliminado");
      queryClient.invalidateQueries({ queryKey: ["fragances"] });
    },
  });

  const handleDelete = (id: string) => mutateDelete(id);

  const { data: user } = useAuth();

  if (isLoading) {
    return (
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        Cargando...
      </Typography>
    );
  }
  if (isError) return <Navigate to={"/404"} />;
  if (Array.isArray(fragances) && fragances.length > 0) {
    return (
      <div className={"p-4"}>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {fragances?.map((fragance, index) => (
            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} key={index}>
              <Card sx={{ maxWidth: 400 }}>
                <CardHeader
                  action={
                    user && isGerente(user?.roles) ? (
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(fragance._id)} // Define this function to handle deletion
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null
                  }
                  title={fragance.name}
                />
                <CardActionArea sx={{ height: 350 }}>
                  <CardMedia
                    sx={{ height: 250 }}
                    component="img"
                    image={`http://localhost:4000/uploads/images/${fragance.imageUrl}`}
                    alt={fragance.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Descripción
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {fragance.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {user && isGerente(user?.roles) ? (
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClickOpen(fragance._id)}
                    >
                      Editar
                    </Button>
                  </CardActions>
                ) : null}
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <EditFragance
          open={openEdit}
          handleClose={handleClose}
          handleEdit={handleEdit}
          fraganceId={selectedCampaignId}
        />
      </div>
    );
  } else {
    const Div = styled("div")(({ theme }) => ({
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      display: "flex", // Usar flexbox para alinear el contenido
      justifyContent: "center", // Centra horizontalmente
      alignItems: "center", // Centra verticalmente
    }));

    return <Div>{"No hay Fragancias registradas"}</Div>;
  }
}
