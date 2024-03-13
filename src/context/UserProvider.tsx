"use client";
import { useSession } from "next-auth/react";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  UserProfileResponse,
  getUserProfile,
} from "src/services/user/getUserProfile";

export interface UserContext extends UserProfileResponse {
  isAdmin: boolean;
  accessToken: string;
  idToken: string;
  userId: string;
  name: string;
  politicalStatement: string;
  refetch: () => void;
  email?: string;
}

export const userContext = createContext<UserContext | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const { data } = useSession();
  const [userData, setUserdata] = useState<UserProfileResponse>();
  const userId = data?.user?.id;
  const email = data?.user?.username;
  const isAdmin = data?.user?.isAdmin;

  const getUserDetails = useCallback(async (id: string) => {
    const response = await getUserProfile(id);
    setUserdata(response);
  }, []);

  async function refetch() {
    getUserDetails(userId!);
  }

  useEffect(() => {
    if (userId) {
      getUserDetails(userId);
    }
  }, [getUserDetails, userId]);

  return (
    <userContext.Provider
      value={{
        isAdmin: !!isAdmin,
        name: `${userData?.firstName} ${userData?.lastName}`,
        accessToken: data?.user?.accessToken || "",
        idToken: data?.user?.idToken || "",
        userId: userId || "",
        politicalStatement: `${userData?.role} at ${userData?.country} for ${userData?.party}`,
        email,
        refetch,
        ...userData!,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
