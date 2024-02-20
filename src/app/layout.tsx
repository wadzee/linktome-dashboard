import "src/styles/globals.css";

import { Flex } from "src/components/Flex/Flex";
import { Footer } from "src/components/Footer/Footer";
import type { Metadata } from "next";
import { Navbar } from "src/components/Navbar/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linktome | Streamlining donations",
  description: "Streamlining donations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Flex alignItems="items-start" gap="gap-0">
          <Navbar />
          {children}
        </Flex>
      </body>
    </html>
  );
}
