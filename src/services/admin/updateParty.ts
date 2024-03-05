import axios from "axios";
import { Parties } from "./getCountries";

export interface PartyInputForm
  extends Pick<Parties, "active" | "label" | "country"> {}

export interface UpdatePartiesRequest extends PartyInputForm {
  idToken: string;
}

export async function updateParties({
  idToken,
  ...rest
}: UpdatePartiesRequest) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  await axiosInstance.post("/countries/party", {
    ...rest,
  });
}
