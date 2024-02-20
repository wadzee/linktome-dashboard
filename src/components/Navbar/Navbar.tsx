"use client";

import { useEffect, useState } from "react";

import { Flex } from "../Flex/Flex";
import Image from "next/image";
import Link from "next/link";
import { List } from "../List/List";
import { Text } from "../Text/Text";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Donations",
    link: "/donations",
  },
  {
    label: "Profile",
    link: "/profile",
  },
];

export const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
    <>
      <aside
        className={classNames(
          "sm:hidden sticky top-0 left-0 max-w-0 w-full h-screen pt-5",
          showMobileMenu &&
            "border-r border-dashed max-w-[4rem] transition-[max-width] duration-50 ease-in-out"
        )}
      >
        <List className="w-full" alignItems="items-center">
          <Link href="/donations">
            <Image
              src="/nav-icons/trend-up.svg"
              alt="donation-logo"
              height={24}
              width={24}
            />
          </Link>
          <Link href="/profile">
            <Image
              src="/nav-icons/account.svg"
              alt="linktome-logo"
              height={24}
              width={24}
            />
          </Link>
          {/* <Link href="/account">
            <Image
              src="/nav-icons/setting.svg"
              alt="linktome-logo"
              height={24}
              width={24}
            />
          </Link> */}
          <button>
            <Image
              src="/nav-icons/email.svg"
              alt="linktome-logo"
              height={24}
              width={24}
            />
          </button>
          <button>
            <Image
              src="/nav-icons/logout.svg"
              alt="logout-logo"
              height={24}
              width={24}
            />
          </button>
        </List>
      </aside>
      <nav
        className={classNames(
          "fixed left-0 top-0 p-4 sm:p-8 gap-8 flex flex-col w-full border-b border-dashed",
          "sm:max-w-[220px] sm:border-r sm:border-dashed sm:h-screen sm:border-0",
          showMobileMenu && "ml-16 sm:ml-0"
        )}
      >
        <Flex
          gap="gap-6"
          className="flex-row-reverse sm:justify-start sm:flex-row"
          justifyContent="justify-end"
        >
          <Link href="/">
            <Image
              src="/linktome-logo-light.svg"
              alt="linktome-logo"
              height={32}
              width={96}
            />
          </Link>
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Image
              src="/nav-icons/mobile-menu.svg"
              alt="hamburger-logo"
              height={20}
              width={20}
            />
          </button>
        </Flex>

        <List className="overflow-hidden hidden sm:flex">
          {links.map(({ label, link }, idx) => {
            const isActive = pathname.includes(link);
            return (
              <Link href={link} key={idx}>
                <Text className={classNames(isActive && "active-link")}>
                  {label}
                </Text>
              </Link>
            );
          })}
        </List>
      </nav>
    </>
  );
};
