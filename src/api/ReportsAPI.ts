import api from "@/lib/axios";
import {
  editFragance,
  ReportRegistrationForm,
  reports,
} from "../types";
import { isAxiosError } from "axios";

export async function getReports() {
  try {
    const url = `/reports`;
    const { data } = await api.get(url);
    const response = reports.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function geReportByUserId(id: string | null) {
  try {
    const url = `/reports/user/${id}`;
    const { data } = await api.get(url);

    // Check if data is an empty array
    if (Array.isArray(data) && data.length === 0) {
      return []; // Return an empty array or handle this case as needed
    }

    const response = reports.safeParse(data);
    if (response.success) {
      return response.data;
    }

    return null; // This can act as a fallback for unexpected data structures
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error; // Ensure any other errors are still thrown
  }
}

export async function createReport(
  reportFormData: ReportRegistrationForm
) {
  try {
    const formData = new FormData();
    formData.append("name", reportFormData.name);
    formData.append("reportType", reportFormData.reportType);
    formData.append("userId", reportFormData.userId);
    formData.append("file", reportFormData.file); // Assuming file is an array

    const url = `/reports`;
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


export async function deleteReportById(id: string | null) {
  if (!id) {
    throw new Error("ID de usuario no válido");
  }

  try {
    const { data } = await api.delete(`/reports/${id}`);
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
