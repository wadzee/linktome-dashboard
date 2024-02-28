"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button } from "src/components/Button/Button";
import { Card } from "src/components/Card/Card";
import { Flag } from "src/components/Flag/Flag";
import { Flex } from "src/components/Flex/Flex";
import Image from "next/image";
import Link from "next/link";
import { List } from "src/components/List/List";
import QRCode from "qrcode";
import { Text } from "src/components/Text/Text";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data } = useSession();
  const [linkCopied, setLinkCopied] = useState(false);
  const [qrCodeDownloaded, setQRCodeDownloaded] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");

  const userStripeId = useMemo(
    () =>
      data?.user?.attributes?.find(({ Name }) => Name === "custom:stripeId")
        ?.Value,
    [data]
  );

  const generateQrCode = useCallback(() => {
    QRCode.toDataURL(
      `staging.linktome.xyz/politician/${userStripeId}`,
      {
        width: 512,
      },
      (err, url) => {
        if (err) {
          return console.error(err);
        }
        setQrCode(url);
      }
    );
  }, [userStripeId]);

  useEffect(() => {
    generateQrCode();
  }, [generateQrCode]);

  const handleCopyURL = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        `staging.linktome.xyz/politician/${userStripeId}`
      );
      setLinkCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, [userStripeId]);

  return (
    <>
      <Flex justifyContent="justify-between">
        <h2>Profile</h2>
        <Link
          href={`https://staging.linktome.xyz/politician/${userStripeId}`}
          target="_blank"
        >
          <Button variant="secondary">Preview profile</Button>
        </Link>
      </Flex>
      <section className="grid grid-cols-1 sm:grid-cols-12 sm:gap-12 sm:w-4/5 sm:mx-auto sm:mt-20  ">
        <List className=" col-span-1 sm:col-span-4 order-2 sm:order-1">
          <Card label="Your unique URL" className="gap-6">
            <span className="bg-[rgba(255,255,255,0.05)] p-3 rounded-xl">
              {`linktome.xyz/politician/${userStripeId}`}
            </span>
            <Button
              onClick={handleCopyURL}
              variant={linkCopied ? "secondary" : "primary"}
            >
              {linkCopied ? "Link copied!" : "Copy Link"}
            </Button>
          </Card>
          <Card label="Your unique QR code" className="gap-6">
            {qrCode && (
              <Image
                src={qrCode}
                alt="qr-code"
                width={128}
                height={128}
                className="mx-auto rounded-xl"
              />
            )}
            <Link href={qrCode} download="politician-qr" target="_blank">
              <Button
                variant={qrCodeDownloaded ? "secondary" : "primary"}
                className="w-full"
              >
                {qrCodeDownloaded ? "Downloaded!" : "Download QR code"}
              </Button>
            </Link>
          </Card>
        </List>
        <List className="col-span-1 sm:col-span-8 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-dashed order-1 sm:order-2">
          <List gap="gap-2" className="pb-8">
            <Flex justifyContent="justify-between">
              <Text>Profile picture</Text>
              <Button variant="secondary" className="border-none">
                Edit
              </Button>
            </Flex>
            <Image
              src="/profile.png"
              alt="profile-picture"
              width={300}
              height={300}
              className="aspect-square"
            />
          </List>

          <List gap="gap-2" className="pb-8">
            <Flex justifyContent="justify-between">
              <Text>Political party</Text>
              <Button variant="secondary" className="border-none">
                Edit
              </Button>
            </Flex>
            <Flag
              flag="/flags/australia.png"
              name="Prime Minister at Australian Labor Party"
            />
          </List>
          <List gap="gap-2" className="pb-8">
            <Flex justifyContent="justify-between">
              <Text>About</Text>
              <Button variant="secondary" className="border-none">
                Edit
              </Button>
            </Flex>
            <Text className="sm:w-4/5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              velit ante, posuere vulputate sollicitudin ac, egestas vel mi.
              Vivamus finibus auctor massa, in malesuada purus euismod eget.
            </Text>
          </List>
        </List>
      </section>
    </>
  );
}
