import api from "@/lib/axios";
import {
  DocumentRegistrationForm,
  documents,
} from "../types";
import { isAxiosError } from "axios";

export async function createDocument(
  documentFormData: DocumentRegistrationForm
) {
  try {
    const formData = new FormData();
    formData.append("title", documentFormData.title);
    formData.append("description", documentFormData.description);
    formData.append("campaign", documentFormData.campaign);
    formData.append("section", documentFormData.section);
    formData.append("file", documentFormData.file); // Assuming file is an array

    const url = `/documents`;
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

export async function getDocuments() {
  try {
    const url = `/documents`;
    const { data } = await api.get(url);
    const response = documents.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
