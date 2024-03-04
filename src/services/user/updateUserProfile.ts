import axios from "axios";
import { UserProfile } from "./type";

export interface UserProfileInputForm
  extends Omit<Partial<UserProfile>, "email"> {
  uniqueUrl: string;
}

interface UserProfileUpdateResponse {
  data: {
    preSignedUrl: string;
  };
}

export async function updateUserProfile({
  uniqueUrl,
  idToken,
  userId,
  ...rest
}: UserProfileInputForm & { idToken: string; userId: string; email?: string }) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  const {
    data: { preSignedUrl },
  } = await axiosInstance.put<UserProfile, UserProfileUpdateResponse>(
    `/user/${userId}/update`,
    rest
  );

  return preSignedUrl;
}
