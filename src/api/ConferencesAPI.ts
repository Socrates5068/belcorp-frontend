import api from "@/lib/axios";
import { ConferenceRegistrationForm, conferences, editConference, UpdateConferenceForm } from "../types";
import { isAxiosError } from "axios";

export async function getConferences() {
  try {
    const url = `/conferences`;
    const { data } = await api.get(url);
    const response = conferences.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function createConference(
  conferencesFormData: ConferenceRegistrationForm
) {
  console.log("🚀 ~ conferencesFormData:", conferencesFormData)
  try {
    const url = `/conferences`;
    const { data } = await api.post(url, conferencesFormData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getConferenceById(id: string | null) {
  if (!id) {
    throw new Error("ID de usuario no válido");
  }

  try {
    const { data } = await api(`/conferences/${id}`);
    const response = editConference.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateConference(formData: UpdateConferenceForm) {
  try {
    const url = `/conferences/${formData._id}`;
    const { data } = await api.put(url, formData);

    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}