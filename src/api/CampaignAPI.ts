import api from "@/lib/axios";
import { CampaignRegistrationForm, campaigns, editCampaign, UpdateCampaignForm } from "../types";
import { isAxiosError } from "axios";

export async function getCampaigns() {
  try {
    const url = `/campaigns`;
    const { data } = await api.get(url);
    const response = campaigns.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function createCampaign(
  campaignsFormData: CampaignRegistrationForm
) {
  try {
    const url = `/campaigns`;
    const { data } = await api.post(url, campaignsFormData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getCampaignById(id: string | null) {
  if (!id) {
    throw new Error("ID de usuario no válido");
  }

  try {
    const { data } = await api(`/campaigns/${id}`);
    const response = editCampaign.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateCampaign(formData: UpdateCampaignForm) {
  try {
    const url = `/campaigns/${formData._id}`;
    const { data } = await api.put(url, formData);

    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
