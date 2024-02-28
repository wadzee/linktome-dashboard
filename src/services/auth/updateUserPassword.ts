import axios from "axios";

export interface PasswordFormInput {
  newPassword: string;
  oldPassword?: string;
}

interface UpdateUserPasswordProps extends PasswordFormInput {
  firstTime?: boolean;
  username: string;
}

export async function updateUserPassword({
  newPassword,
  oldPassword,
  firstTime,
  username,
}: UpdateUserPasswordProps) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
  });

  const { status } = await axiosInstance.post("/user/changePassword", {
    password: { new: newPassword, old: oldPassword },
    username,
    firstTime,
  });

  if (status === 201) {
    return;
  }

  return;
}
