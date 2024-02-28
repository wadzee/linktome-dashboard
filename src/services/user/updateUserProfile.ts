import axios from "axios";
import { getSession } from "next-auth/react";

export interface UserProfileInputForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  country: string;
  party: string;
  role: string;
  about: string;
  image: string;
  uniqueUrl: string;
}

export async function updateUserProfile({
  uniqueUrl,
  ...rest
}: UserProfileInputForm) {
  const session = await getSession();
  const userId = session?.user?.attributes.find(
    ({ Name }) => Name === "sub"
  )?.Value;

  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${session?.user?.idToken}` },
  });

  const { data } = await axiosInstance.put(`/user/${userId}/update`, {
    ...rest,
  });

  console.log("data", data);

  return data;
}
