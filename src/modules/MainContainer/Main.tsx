"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { Flex } from "src/components/Flex/Flex";
import { Navbar } from "src/components/Navbar/Navbar";
import classNames from "classnames";
import "react-toastify/dist/ReactToastify.min.css";
import { usePathname } from "next/navigation";

export default function Main({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    setIsNavbarOpen(false);
  }, [pathname]);

  return (
    <Flex alignItems="items-start" gap="gap-0">
      <Navbar
        isOpen={isNavbarOpen}
        onChange={() => setIsNavbarOpen(!isNavbarOpen)}
      />
      <main
        className={classNames(
          "flex flex-col gap-6 px-4 py-5 sm:p-12",
          isNavbarOpen && "ml-16 sm:ml-[200px]"
        )}
      >
        {children}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </main>
    </Flex>
  );
}
