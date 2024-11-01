import api from "@/lib/axios";
import {
  editFragance,
  FraganceRegistrationForm,
  fragances,
  UpdateFraganceForm,
} from "../types";
import { isAxiosError } from "axios";

export async function getFragances() {
  try {
    const url = `/fragances`;
    const { data } = await api.get(url);
    const response = fragances.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function createFragance(
  fraganceFormData: FraganceRegistrationForm
) {
  try {
    const formData = new FormData();
    formData.append("name", fraganceFormData.name);
    formData.append("description", fraganceFormData.description);
    formData.append("file", fraganceFormData.file); // Assuming file is an array

    const url = `/fragances`;
    const token = localStorage.getItem("AUTH_TOKEN");
    const { data } = await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateFragance(fraganceFormData: UpdateFraganceForm) {
  console.log("🚀 ~ updateFragance ~ fraganceFormData:", fraganceFormData);
  try {
    const formData = new FormData();
    formData.append("name", fraganceFormData.name);
    formData.append("description", fraganceFormData.description);
    formData.append("file", fraganceFormData.file);

    const url = `/fragances/${fraganceFormData._id}`;
    const token = localStorage.getItem("AUTH_TOKEN");
    console.log("🚀 ~ updateFragance ~ url:", url);
    const { data } = await api.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getFraganceById(id: string | null) {
  if (!id) {
    throw new Error("ID de usuario no válido");
  }

  try {
    const { data } = await api(`/fragances/${id}`);
    const response = editFragance.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteFraganceById(id: string | null) {
  if (!id) {
    throw new Error("ID de usuario no válido");
  }

  try {
    const { data } = await api.delete(`/fragances/${id}`);
    const response = editFragance.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
