import axios from "axios";
import { UserProfile } from "../user/type";

export interface InviteUserForm extends Partial<UserProfile> {
  uniqueUrl?: string;
}

export interface InviteUserRequest extends Partial<UserProfile> {
  idToken: string;
}

export async function inviteUser({ idToken, ...rest }: InviteUserRequest) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  const { data } = await axiosInstance.post<
    InviteUserRequest,
    { data: { preSignedUrl: string } }
  >("/admin/user", {
    ...rest,
  });

  return data.preSignedUrl;
}
