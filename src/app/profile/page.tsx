"use client";

import { useCallback, useEffect, useContext, useState } from "react";

import { Button } from "src/components/Button/Button";
import { Card } from "src/components/Card/Card";
import { Flag } from "src/components/Flag/Flag";
import { Flex } from "src/components/Flex/Flex";
import Image from "next/image";
import Link from "next/link";
import { List } from "src/components/List/List";
import QRCode from "qrcode";
import { Text } from "src/components/Text/Text";
import { userContext } from "src/context/UserProvider";
import { TextAreaField } from "src/components/Inputs/TextAreaField";
import {
  UserProfileInputForm,
  updateUserProfile,
} from "src/services/user/updateUserProfile";
import { useForm } from "react-hook-form";
import { SelectField } from "src/components/Inputs/SelectField";
import { TextField } from "src/components/Inputs/TextField";
import { ImageInput } from "src/components/Inputs/ImageInput";
import { updateProfileImage } from "src/services/user/uploadProfileImage";

const Party = {
  Malaysia: [
    {
      label: "Parti Keadilan Rakyat",
      value: "PKR",
    },
    {
      label: "Barisan Nasional",
      value: "BN",
    },
    {
      label: "Democratic Action Party",
      value: "DAP",
    },
  ],
  Australia: [
    {
      label: "Labor Party",
      value: "Labor Party",
    },
    {
      label: "Liberal Party",
      value: "Liberal Party",
    },
    {
      label: "Australian Greens",
      value: "Australian Greens",
    },
  ],
};

enum EDIT_MODE {
  ABOUT_US = "ABOUT_US",
  PROFILE_PICTURE = "PROFILE_PICTURE",
  POLITICAL_PARTY = "POLITICAL_PARTY",
  NONE = "NONE",
}

export default function ProfilePage() {
  const data = useContext(userContext);
  const [file, setFile] = useState<File>();
  const [isEditMode, setIsEditMode] = useState<EDIT_MODE>(EDIT_MODE.NONE);
  const [linkCopied, setLinkCopied] = useState(false);
  const [qrCodeDownloaded, setQRCodeDownloaded] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UserProfileInputForm>({
    defaultValues: {
      role: data?.role,
      party: data?.party,
      country: data?.country,
    },
  });

  const generateQrCode = useCallback((username: string) => {
    QRCode.toDataURL(
      `linktome.xyz/politician/${username}`,
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
  }, []);

  useEffect(() => {
    if (data?.username) {
      generateQrCode(data.username);
    }
  }, [data, generateQrCode]);

  const handleCopyURL = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        `linktome.xyz/politician/${data?.username}`
      );
      setLinkCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, [data?.username]);

  const onSubmit = async (input: UserProfileInputForm) => {
    try {
      const s3SignedUrl = await updateUserProfile({
        idToken: data?.idToken!,
        userId: data?.userId!,
        firstName: data?.firstName,
        lastName: data?.lastName,
        username: data?.username,
        ...input,
      });
      setIsEditMode(EDIT_MODE.NONE);

      if (s3SignedUrl && file) {
        await updateProfileImage({ preSignedUrl: s3SignedUrl, image: file });
      }

      data?.refetch();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleEditMode = (mode: EDIT_MODE) => {
    if (mode !== isEditMode) {
      setIsEditMode(mode);
    }
    if (mode === isEditMode) {
      setIsEditMode(EDIT_MODE.NONE);
    }
  };

  const handleImageUpload = (image: File) => {
    setValue("image", image.name);
    setFile(image);
  };

  return (
    <>
      <Flex justifyContent="justify-between">
        <h2>Profile</h2>
        <Link
          href={`https://linktome.xyz/politician/${data?.username}`}
          target="_blank"
        >
          <Button variant="secondary">Preview profile</Button>
        </Link>
      </Flex>
      <section className="grid grid-cols-1 sm:grid-cols-12 sm:gap-12 sm:w-4/5 sm:mx-auto sm:mt-20  ">
        <List className=" col-span-1 sm:col-span-4 order-2 sm:order-1">
          <Card label="Your unique URL" className="gap-6">
            <span className="bg-[rgba(255,255,255,0.05)] p-3 rounded-xl">
              {`linktome.xyz/politician/${data?.username}`}
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
            <Link
              href={qrCode}
              download="politician-qr"
              target="_blank"
              onClick={() => setQRCodeDownloaded(true)}
            >
              <Button
                variant={qrCodeDownloaded ? "secondary" : "primary"}
                className="w-full"
              >
                {qrCodeDownloaded ? "QR code downloaded!" : "Download QR code"}
              </Button>
            </Link>
          </Card>
        </List>
        <List className="col-span-1 sm:col-span-8 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-dashed order-1 sm:order-2">
          <List gap="gap-2" className="pb-8">
            <Flex justifyContent="justify-between">
              <Text>Profile picture</Text>
              <Button
                variant="secondary"
                className="border-none"
                onClick={() => handleEditMode(EDIT_MODE.PROFILE_PICTURE)}
              >
                {isEditMode === EDIT_MODE.PROFILE_PICTURE ? "Cancel" : "Edit"}
              </Button>
            </Flex>
            <ImageInput
              src={
                data?.image
                  ? `https://linktome-assets.s3.ap-southeast-1.amazonaws.com/${data?.userId}/${data?.image}`
                  : "/default_profile.png"
              }
              className="w-[300px] h-[300px]"
              imageSize={{
                width: 300,
                height: 300,
              }}
              onImageUploaded={handleImageUpload}
              customFilename="image"
              allowEdit={isEditMode === EDIT_MODE.PROFILE_PICTURE}
            />
            {isEditMode === EDIT_MODE.PROFILE_PICTURE && (
              <Button
                type="submit"
                className="w-fit h-fit mt-4"
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
              >
                Save
              </Button>
            )}
          </List>

          <List gap="gap-2" className="pb-8">
            <Flex justifyContent="justify-between">
              <Text>Political party</Text>
              <Button
                variant="secondary"
                className="border-none"
                onClick={() => handleEditMode(EDIT_MODE.POLITICAL_PARTY)}
              >
                {isEditMode === EDIT_MODE.POLITICAL_PARTY ? "Cancel" : "Edit"}
              </Button>
            </Flex>
            {isEditMode !== EDIT_MODE.POLITICAL_PARTY && (
              <Flag
                flag={`/flags/${
                  data?.country?.toLowerCase() || "malaysia"
                }.png`}
                name={data?.politicalStatement}
              />
            )}
            {isEditMode === EDIT_MODE.POLITICAL_PARTY && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <List gap="gap-4">
                  <SelectField<UserProfileInputForm>
                    name="country"
                    register={register}
                    defaultValue="Malaysia"
                    options={[
                      {
                        label: "Malaysia",
                        value: "Malaysia",
                      },
                      { label: "New Zealand", value: "New Zealand" },
                      { label: "Australia", value: "Australia" },
                    ]}
                  />
                  <SelectField<UserProfileInputForm>
                    name="party"
                    register={register}
                    options={Party["Malaysia"]}
                  />
                  <TextField<UserProfileInputForm>
                    label="Role"
                    name="role"
                    register={register}
                    errors={errors.lastName}
                  />
                  <Button
                    type="submit"
                    className="w-fit h-fit mt-4"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </List>
              </form>
            )}
          </List>
          <List gap="gap-2" className="pb-8">
            <Flex justifyContent="justify-between">
              <Text>About</Text>
              <Button
                variant="secondary"
                className="border-none"
                onClick={() => handleEditMode(EDIT_MODE.ABOUT_US)}
              >
                {isEditMode === EDIT_MODE.ABOUT_US ? "Cancel" : "Edit"}
              </Button>
            </Flex>
            {isEditMode !== EDIT_MODE.ABOUT_US && (
              <Text className="sm:w-4/5">{data?.about}</Text>
            )}
            {isEditMode === EDIT_MODE.ABOUT_US && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextAreaField<UserProfileInputForm>
                  name="about"
                  register={register}
                  rows={5}
                  placeholder="Tell your audience a bit about yourself..."
                  className="resize-none bg-transparent"
                />
                <Button
                  type="submit"
                  className="w-fit h-fit mt-4"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </form>
            )}
          </List>
        </List>
      </section>
    </>
  );
}
