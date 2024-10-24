import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/api/UserAPI";
import { Navigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {
  UpdateUserForm,
} from "@/types/index";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getDocuments } from "@/api/DocumentAPI";
import EditUser from "../users/EditUser";
import DownloadIcon from "@mui/icons-material/Download";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CampaigResouces() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleClickOpen = (id: string) => {
    setSelectedUserId(id); // Establece el ID del usuario seleccionado
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const { mutate: mutateEdit } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleEdit = (data: UpdateUserForm) => mutateEdit(data);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocuments(),
    retry: false,
  });

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Título</StyledTableCell>
                <StyledTableCell align="right">Descripción</StyledTableCell>
                <StyledTableCell align="right">
                  Fecha de creación
                </StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((document) => (
                <StyledTableRow key={document._id}>
                  <StyledTableCell component="th" scope="row">
                    {document.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {document.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {document.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      href={`http://localhost:4000/api/documents/download/${document._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      aria-label="descargar documento"
                    >
                      <DownloadIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EditUser
          openEdit={openEdit}
          handleClose={handleClose}
          handleEdit={handleEdit}
          userId={selectedUserId}
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
