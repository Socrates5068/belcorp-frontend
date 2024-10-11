import { Card, CardContent, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SelectView = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleRedirect = (module: string) => {
    navigate(`/${module}`);
  };

  return (
    <Grid2
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid2>
        <Card
          onClick={() => handleRedirect("gerente")}
          onMouseEnter={() => setHoveredCard("gerente")}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            width: "350px",
            height: "350px",
            cursor: "pointer",
            transform: hoveredCard === "gerente" ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h2" align="center">
              Módulo Gerente
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2>
        <Card
          onClick={() => handleRedirect("lider")}
          onMouseEnter={() => setHoveredCard("lider")}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            width: "350px",
            height: "350px",
            cursor: "pointer",
            transform: hoveredCard === "lider" ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h2" align="center">
              Módulo Socias Empresarias Lider
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2>
        <Card
          onClick={() => handleRedirect("consultora")}
          onMouseEnter={() => setHoveredCard("consultora")}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            width: "350px",
            height: "350px",
            cursor: "pointer",
            transform:
              hoveredCard === "consultora" ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h2" align="center">
              Módulo Consultoras PEGS
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2>
        <Card
          onClick={() => handleRedirect("seguimiento")}
          onMouseEnter={() => setHoveredCard("seguimiento")}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            width: "350px",
            height: "350px",
            cursor: "pointer",
            transform:
              hoveredCard === "seguimiento" ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h2" align="center">
              Módulo de Seguimiento
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default SelectView;
