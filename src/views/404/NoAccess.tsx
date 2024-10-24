import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function NoAccess() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/selec');
  };

  return (
    <div className='p-10'>
      <h1>Acceso Denegado</h1>
      <p>No tienes los permisos necesarios para acceder a esta página.</p>

      <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleRedirect}>
        Regresar
      </Button>
    </div>
  );
}
