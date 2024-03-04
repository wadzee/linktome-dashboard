import axios from "axios";
import { UserProfile } from "./type";

export interface UserProfileResponse extends UserProfile {
  username: string;
  stripeId: string;
}

export async function getUserProfile(userId: string) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
  });

  const { data } = await axiosInstance.get<
    unknown,
    { data: UserProfileResponse }
  >(`/user/${userId}`, {
    data: {
      type: "username",
    },
  });

  return data;
}
