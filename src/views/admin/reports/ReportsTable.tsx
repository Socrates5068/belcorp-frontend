import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import DownloadIcon from "@mui/icons-material/Download";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { isGerente, isSocia, useAuth } from "@/hooks/useAuth";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/utils/utils";
import {
  deleteReportById,
  geReportByUserId,
  getReports,
} from "@/api/ReportsAPI";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ReportsTable() {
  const queryClient = useQueryClient();

  const { data: user } = useAuth();

  const gerente = user && isGerente(user?.roles);

  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: () => (gerente ? getReports() : geReportByUserId(user._id)),
    retry: false,
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteReportById,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Eliminado");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  const handleDelete = (id: string) => mutateDelete(id);

  if (isLoading) {
    return (
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        Cargando...
      </Typography>
    );
  }
  if (isError) return <Navigate to={"/404"} />;
  if (Array.isArray(reports) && reports.length > 0) {
    return (
      <div className={"p-4"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Nomnbre</StyledTableCell>
                <StyledTableCell align="right">
                  Fecha de creación
                </StyledTableCell>
                <StyledTableCell align="right">Tipo de reporte</StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <StyledTableRow key={report._id}>
                  <StyledTableCell component="th" scope="row">
                    {report.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatDate(report.creationDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {report.reportType}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div>
                      <IconButton
                        href={`http://localhost:4000/uploads/reports/${report.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        aria-label="descargar documento"
                      >
                        <DownloadIcon />
                      </IconButton>
                      {user && isSocia(user.roles) && (
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(report._id)} // Define this function to handle deletion
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                      )}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

    return <Div>{"No hay Reportes registrados"}</Div>;
  }
}
