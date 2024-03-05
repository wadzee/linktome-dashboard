"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (!data?.user?.accessToken) {
      return;
    }

    if (data?.user?.isAdmin) {
      redirect("/users");
    }

    redirect("/donations");
  }, [data, status]);

  return null;
}
