import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { UpdateCampaignForm, UpdateSectionForm } from "@/types/index";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateSection } from "@/api/SectionAPI";
import Grid2 from "@mui/material/Grid2";
import { useCampaigns } from "@/hooks/campaigns";
import CardActionArea from "@mui/material/CardActionArea";
import { formatDate } from "@/utils/utils";
import { CardHeader } from "@mui/material";
import EditCampaign from "./EditCampaign";
import { updateCampaign } from "@/api/CampaignAPI";
import { isGerente, useAuth } from "@/hooks/useAuth";

interface CampaignsTableProps {
  navigate: (changedData: string) => void; // Ajusta 'any' según sea necesario
}

export default function CampaignsTable({
  navigate,
}: Readonly<CampaignsTableProps>) {
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
    mutationFn: updateCampaign,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Actualizado");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });

  const handleEdit = (data: UpdateCampaignForm) => mutateEdit(data);

  const { data: campaigns, isError, isLoading } = useCampaigns();

  const { data: user } = useAuth();

  if (isLoading) {
    return (
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        Cargando...
      </Typography>
    );
  }
  if (isError) return <Navigate to={"/404"} />;
  if (campaigns) {
    return (
      <div className={"p-4"}>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {campaigns?.map((campaign, index) => (
            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} key={index}>
              <Card
                sx={{ maxWidth: 345 }}
                onClick={() => {
                  navigate(`/campaigns/${index + 1}`);
                }}
              >
                <CardHeader
                  title={campaign.name}
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
                      Fecha inicio
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {formatDate(campaign.startDate)}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Fecha fin
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {formatDate(campaign.endDate)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {user && isGerente(user?.roles) ? (
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClickOpen(campaign._id)}
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
    return (
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        No hay Campañas registradas
      </Typography>
    );
  }
}
