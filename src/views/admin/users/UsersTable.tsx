import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/UserAPI";
import { Navigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import { userStatus } from "@/types/index";
import EditIcon from "@mui/icons-material/Edit";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Typography from "@mui/material/Typography";

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

const editIcon = (status?: boolean) => (
  <IconButton aria-label="delete" color="success" disabled={status}>
    <EditIcon />
  </IconButton>
);

const activeIcon = (
  <IconButton aria-label="delete" color="success">
    <CheckCircleIcon />
  </IconButton>
);

const inactiveIcon = (
  <IconButton aria-label="delete" color="error">
    <BlockIcon />
  </IconButton>
);

const pendingIcon = (
  <IconButton aria-label="delete" color="warning">
    <HourglassBottomIcon />
  </IconButton>
);

const statusIcons = {
  [userStatus.active]: activeIcon,
  [userStatus.inactive]: inactiveIcon,
  [userStatus.pending]: pendingIcon,
};

export default function UsersTable() {
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
                  <StyledTableCell align="right">{user.last_name}</StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.status == userStatus.inactive
                      ? editIcon(true)
                      : editIcon(false)}
                    {statusIcons[user.status]}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
