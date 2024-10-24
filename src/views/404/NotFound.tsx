import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/auth/login");
  };

  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">
        Página No Encontrada
      </h1>
      <p className="mt-10 text-center text-white">
        Tal vez quieras volver a{" "}
        <Link className=" text-fuchsia-500" to={"/"}>
          Proyectos
        </Link>
      </p>

      <Button
        className="text-center"
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
        onClick={handleRedirect}
      >
        Login
      </Button>
    </>
  );
}
