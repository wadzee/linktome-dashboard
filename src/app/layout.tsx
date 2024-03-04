import "src/styles/globals.css";

import { Flex } from "src/components/Flex/Flex";
import type { Metadata } from "next";
import { Navbar } from "src/components/Navbar/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";
import SessionProvider from "src/context/SessionProvider";
import { getServerSession } from "next-auth";
import { UserProvider } from "src/context/UserProvider";

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
            <Flex alignItems="items-start" gap="gap-0">
              <Navbar />
              <main className="flex flex-col gap-6 px-4 py-5 sm:p-12">
                {children}
              </main>
            </Flex>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
