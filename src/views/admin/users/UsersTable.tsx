import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUser, updateUserStatus } from "@/api/UserAPI";
import { Navigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import {
  UpdateUserForm,
  UpdateUserStatusForm,
  User,
  userStatus,
} from "@/types/index";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import EditUser from "./EditUser";
import React, { useState } from "react";
import { toast } from "react-toastify";

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

export default function UsersTable() {
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

  const editIcon = (status: boolean, id: string) => (
    <IconButton
      aria-label="delete"
      color="success"
      disabled={status}
      onClick={() => handleClickOpen(id)}
    >
      <EditIcon />
    </IconButton>
  );

  const { mutate: mutateStatus } = useMutation({
    mutationFn: updateUserStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleStatus = (data: UpdateUserStatusForm) => mutateStatus(data);

  const handleStatusClick = (user: User) => {
    const newStatus =
      user.status === userStatus.active
        ? userStatus.inactive
        : userStatus.active;

    const updateData: UpdateUserStatusForm = {
      _id: user._id,
      status: newStatus,
    };

    handleStatus(updateData);
  };

  const activeIcon = (user: User) => (
    <IconButton
      aria-label="change status to inactive"
      color="success"
      onClick={() => handleStatusClick(user)}
    >
      <CheckCircleIcon />
    </IconButton>
  );

  const inactiveIcon = (user: User) => (
    <IconButton
      aria-label="change status to active"
      color="error"
      onClick={() => handleStatusClick(user)}
    >
      <BlockIcon />
    </IconButton>
  );

  const statusIcons = {
    [userStatus.active]: activeIcon,
    [userStatus.inactive]: inactiveIcon,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
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
                <StyledTableCell>C.I.</StyledTableCell>
                <StyledTableCell align="right">Nombres</StyledTableCell>
                <StyledTableCell align="right">Apellidos</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((user) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    {user.ci}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.status == userStatus.inactive
                      ? editIcon(true, user._id)
                      : editIcon(false, user._id)}
                    {statusIcons[user.status](user)}
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
