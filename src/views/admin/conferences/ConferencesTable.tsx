import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { UpdateConferenceForm } from "@/types/index";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Grid2 from "@mui/material/Grid2";
import CardActionArea from "@mui/material/CardActionArea";
import { formatDate } from "@/utils/utils";
import { CardHeader, styled } from "@mui/material";
import EditCampaign from "./EditConference";
import { isGerente, useAuth } from "@/hooks/useAuth";
import { getConferences, updateConference } from "@/api/ConferencesAPI";

export default function ConferencesTable() {
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
    mutationFn: updateConference,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado");
      queryClient.invalidateQueries({ queryKey: ["conferences"] });
    },
  });

  const {
    data: conferences,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["conferences"],
    queryFn: () => getConferences(),
    retry: false,
  });

  const handleEdit = (data: UpdateConferenceForm) => mutateEdit(data);

  const { data: user } = useAuth();

  if (isLoading) {
    return (
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        Cargando...
      </Typography>
    );
  }
  if (isError) return <Navigate to={"/404"} />;
  if (Array.isArray(conferences) && conferences.length > 0) {
    return (
      <div className={"p-4"}>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {conferences?.map((conference, index) => (
            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title={conference.name}
                  /* subheader="September 14, 2016" */
                />
                <CardActionArea>
                  {/* <CardMedia
                    component="img"
                    height="140"
                    image="/reptile.jpg"
                    alt="green iguana"
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Fecha
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {formatDate(conference.date)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {user && isGerente(user?.roles) ? (
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClickOpen(conference._id)}
                    >
                      Editar
                    </Button>
                  </CardActions>
                ) : (
                  ""
                )}
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <EditCampaign
          open={openEdit}
          handleClose={handleClose}
          handleEdit={handleEdit}
          userId={selectedCampaignId}
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
