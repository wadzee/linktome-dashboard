import "src/styles/globals.css";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SessionProvider from "src/context/SessionProvider";
import { Session, getServerSession } from "next-auth";
import { UserProvider } from "src/context/UserProvider";
import Main from "src/modules/MainContainer/Main";
import { headers } from "next/headers";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linktome | Streamlining donations",
  description: "Streamlining donations",
};

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <UserProvider>
            <Main>{children}</Main>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
