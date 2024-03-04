import axios from "axios";

export interface SignInFormProps {
  username: string;
  password: string;
}

interface SignInResponse {
  id: string;
  username: string;
  idToken: string;
  accessToken: string;
  challenge: string;
}

export async function signInUser(props: SignInFormProps) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
  });

  const { data } = await axiosInstance.post<SignInResponse>(
    "/user/signin",
    props
  );

  return data;
}
