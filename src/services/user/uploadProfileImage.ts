import axios from "axios";
import { getSession } from "next-auth/react";

interface UpdateProfileImageProps {
  preSignedUrl: string;
  image: File;
}

export async function updateProfileImage({
  preSignedUrl,
  image,
}: UpdateProfileImageProps) {
  await axios.put(preSignedUrl, image, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
}
