import axios from "axios";
import { UserProfile } from "../user/type";

export interface Countries {
  id: string;
  active: boolean;
  parties: Parties[];
}

export interface Parties {
  id: string;
  country: string;
  label: string;
  member: number;
  active: boolean;
}

export async function getCountries() {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
  });

  const { data } = await axiosInstance.get<unknown, { data: Countries[] }>(
    "/countries"
  );

  return data;
}
