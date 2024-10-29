import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { createAccountEnhanced } from "@/api/AuthAPI";
import { UserRegistrationFormEnhanced } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isGerente, useAuth } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";

export default function UserView() {

  const { data: user } = useAuth();

  return (
    <Paper sx={{ maxWidth: "max-w-96", margin: "auto", overflow: "hidden" }}>
      <UsersTable />
    </Paper>
  );
}
