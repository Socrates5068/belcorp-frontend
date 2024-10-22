import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "@/api/AuthAPI";
import { userRoles } from "../types";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["role"],
    queryFn: getUserRole,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};

export function isAdmin(roles: string[]): boolean {
  return roles.includes(userRoles.administrador);
}

export function isGerente(roles: string[]): boolean {
  return roles.includes(userRoles.gerente);
}

export function isSocia(roles: string[]): boolean {
  return roles.includes(userRoles.socia);
}

export function isConsultora(roles: string[]): boolean {
  return roles.includes(userRoles.consultora);
}
