import api from "@/lib/axios";
import {
  editSection,
  SectionRegistrationForm,
  sections,
  UpdateSectionForm,
} from "../types";
import { isAxiosError } from "axios";

export async function createSection(sectionFormData: SectionRegistrationForm) {
  try {
    const url = `/sections`;
    const { data } = await api.post(url, sectionFormData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getSections() {
  try {
    const url = `/sections`;
    const { data } = await api.get(url);
    const response = sections.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getSectionById(id: string | null) {
  if (!id) {
    throw new Error("ID de usuario no válido");
  }

  try {
    const { data } = await api(`/sections/${id}`);
    const response = editSection.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateSection(formData: UpdateSectionForm) {
  try {
    const url = `/sections/${formData._id}`;
    const { data } = await api.put(url, formData);

    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
