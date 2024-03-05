import axios from "axios";
import { Countries } from "./getCountries";

export interface CountryInputForm extends Pick<Countries, "active" | "id"> {}

export interface UpdatePartiesRequest extends CountryInputForm {
  idToken: string;
}

export async function updateCountry({
  idToken,
  ...rest
}: UpdatePartiesRequest) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  await axiosInstance.post("/countries", {
    ...rest,
  });
}
