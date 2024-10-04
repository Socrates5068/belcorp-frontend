import api from "@/lib/axios";
import {
  editUser,
  UpdateUserForm,
  UpdateUserStatusForm,
  users,
} from "../types";
import { isAxiosError } from "axios";

export async function getUsers() {
  try {
    const url = `/users`;
    const { data } = await api(url);
    const response = users.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUserById(id: string | null) {
  if (!id) {
    throw new Error("ID de usuario no válido");
  }

  try {
    const { data } = await api(`/users/${id}`);
    const response = editUser.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateUser(formData: UpdateUserForm) {
  try {
    const url = `/users/${formData._id}`;
    const { data } = await api.put<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateUserStatus(formData: UpdateUserStatusForm) {
  try {
    const url = `/users/status/${formData._id}`;
    const { data } = await api.put(url, { status: formData.status });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
