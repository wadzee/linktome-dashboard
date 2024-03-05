import "src/styles/globals.css";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SessionProvider from "src/context/SessionProvider";
import { getServerSession } from "next-auth";
import { UserProvider } from "src/context/UserProvider";
import Main from "src/modules/MainContainer/Main";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linktome | Streamlining donations",
  description: "Streamlining donations",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

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
