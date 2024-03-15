import axios from "axios";
import { UserProfile } from "./type";

export interface UserProfileInputForm extends Partial<UserProfile> {
  email?: string;
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
}: UserProfileInputForm & {
  idToken: string;
  userId: string;
  email?: string;
  username?: string;
  firstSetup?: boolean;
}) {
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
