import axios from "axios";
import { UserProfile } from "../user/type";

interface ListUsersResponse {
  users: UserProfile[];
  lastEvaluatedKey?: string;
}

export async function getUserLists(idToken: string) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  const { data } = await axiosInstance.get<
    unknown,
    { data: ListUsersResponse }
  >("/admin/users");

  return data;
}
