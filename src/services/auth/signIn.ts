import axios from "axios";

export interface SignInFormProps {
  username: string;
  password: string;
}

interface SignInResponse {
  username: string;
  idToken: string;
  accessToken: string;
  challenge: string;
  attributes: Array<{
    Name: "given_name" | "custom:isAdmin" | "custom:stripeId" | "sub";
    Value: string;
  }>;
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
