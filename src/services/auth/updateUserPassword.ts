import axios from "axios";

export interface PasswordFormInput {
  newPassword: string;
  oldPassword?: string;
}

interface UpdateUserPasswordProps extends PasswordFormInput {
  firstTime?: boolean;
  username?: string;
  accessToken?: string;
}

export async function updateUserPassword({
  newPassword,
  oldPassword,
  firstTime = false,
  username,
  accessToken,
}: UpdateUserPasswordProps) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
  });

  const { status } = await axiosInstance.post("/user/changePassword", {
    password: { new: newPassword, old: oldPassword },
    username,
    firstTime,
    accessToken,
  });

  if (status === 201) {
    return;
  }

  return;
}
