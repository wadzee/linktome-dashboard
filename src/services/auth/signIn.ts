import axios from "axios";

export interface SignInFormProps {
  username: string;
  password: string;
}

interface SignInResponse {
  username: string;
  accessToken: string;
  challenge: string;
}

export const SignInUser = async (props: SignInFormProps) => {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
  });

  const { data } = await axiosInstance.post<SignInResponse>(
    "/user/signin",
    props
  );

  return data;
};
