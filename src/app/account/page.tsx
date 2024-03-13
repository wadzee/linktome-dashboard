"use client";

import { useContext, useEffect, useState } from "react";

import { Button } from "src/components/Button/Button";
import { Card } from "src/components/Card/Card";
import { Flag } from "src/components/Flag/Flag";
import { Flex } from "src/components/Flex/Flex";
import Link from "next/link";
import { List } from "src/components/List/List";
import { Text } from "src/components/Text/Text";
import { ImageInput } from "src/components/Inputs/ImageInput";
import { userContext } from "src/context/UserProvider";
import {
  UserProfileInputForm,
  updateUserProfile,
} from "src/services/user/updateUserProfile";
import { useForm } from "react-hook-form";
import { TextField } from "src/components/Inputs/TextField";
import {
  PasswordFormInput,
  updateUserPassword,
} from "src/services/auth/updateUserPassword";
import { TextAreaField } from "src/components/Inputs/TextAreaField";

enum EDIT_MODE {
  EMAIL = "EMAIL",
  NAME = "NAME",
  PASSWORD = "PASSWORD",
  NONE = "NONE",
}

export default function ProfilePage() {
  const data = useContext(userContext);
  const [isEditMode, setIsEditMode] = useState<EDIT_MODE>(EDIT_MODE.NONE);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UserProfileInputForm>({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("email", data.email);
    }
  }, [data, setValue]);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordError, isSubmitting: isSubmittingPassword },
  } = useForm<PasswordFormInput>();

  const handleEditMode = (mode: EDIT_MODE) => {
    if (mode !== isEditMode) {
      setIsEditMode(mode);
    }
    if (mode === isEditMode) {
      setIsEditMode(EDIT_MODE.NONE);
    }
  };

  const onPasswordSubmit = async (input: PasswordFormInput) => {
    try {
      await updateUserPassword({
        ...input,
        accessToken: data?.accessToken,
      });
      setIsEditMode(EDIT_MODE.NONE);

      data?.refetch();
    } catch (err) {
      console.log("err", err);
    }
  };
  const onSubmit = async (input: UserProfileInputForm) => {
    try {
      await updateUserProfile({
        idToken: data?.idToken!,
        userId: data?.userId!,
        firstName: data?.firstName,
        lastName: data?.lastName,
        username: data?.username,
        ...input,
      });
      setIsEditMode(EDIT_MODE.NONE);

      data?.refetch();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <Flex justifyContent="justify-between">
        <h2>Account</h2>
        <Link
          href={"https://staging.linktome.xyz/politician/acct_1OgAOzEZcwACFEpu"}
          target="_blank"
        >
          <Button variant="secondary">Preview profile</Button>
        </Link>
      </Flex>
      <section className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-12 sm:w-4/5 sm:mx-auto sm:mt-20  ">
        <List className=" col-span-1 sm:col-span-4">
          <Card>
            <Flex>
              <ImageInput
                src={
                  data?.image
                    ? `https://linktome-assets.s3.ap-southeast-1.amazonaws.com/${data?.userId}/${data?.image}`
                    : "/default_profile.png"
                }
                className="rounded-full"
                imageSize={{
                  width: 50,
                  height: 50,
                }}
              />
              <List gap="gap-2">
                <Text>{data?.name}</Text>
                <Text>Active since {data?.createdAt}</Text>
              </List>
            </Flex>
          </Card>
        </List>
        <List className="col-span-1 sm:col-span-8 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-dashed">
          <List gap="gap-2" className="pb-8">
            <Flex justifyContent="justify-between">
              <Text>Name</Text>
              <Button
                variant="secondary"
                className="border-none"
                onClick={() => handleEditMode(EDIT_MODE.NAME)}
              >
                {isEditMode === EDIT_MODE.NAME ? "Cancel" : "Edit"}
              </Button>
            </Flex>
            {isEditMode !== EDIT_MODE.NAME && (
              <Text className="text-light-navy">{data?.name}</Text>
            )}
            {isEditMode === EDIT_MODE.NAME && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <List gap="gap-4">
                  <TextField<UserProfileInputForm>
                    label="First name"
                    name="firstName"
                    register={register}
                    errors={errors.firstName}
                  />
                  <TextField<UserProfileInputForm>
                    label="Last name"
                    name="lastName"
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
              <Text>Email</Text>
              <Button
                variant="secondary"
                className="border-none"
                onClick={() => handleEditMode(EDIT_MODE.EMAIL)}
              >
                {isEditMode === EDIT_MODE.EMAIL ? "Cancel" : "Edit"}
              </Button>
            </Flex>
            {isEditMode !== EDIT_MODE.EMAIL && (
              <Text className="text-light-navy">{data?.email}</Text>
            )}
            {isEditMode === EDIT_MODE.EMAIL && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <List gap="gap-4">
                  <TextField<UserProfileInputForm>
                    label="Email"
                    name="email"
                    register={register}
                    errors={errors.email}
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
              <Text>Password</Text>
              <Button
                variant="secondary"
                className="border-none"
                onClick={() => handleEditMode(EDIT_MODE.PASSWORD)}
              >
                {isEditMode === EDIT_MODE.PASSWORD ? "Cancel" : "Edit"}
              </Button>
            </Flex>
            {isEditMode !== EDIT_MODE.PASSWORD && (
              <Text className="text-light-navy">****************</Text>
            )}
            {isEditMode === EDIT_MODE.PASSWORD && (
              <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                <List gap="gap-2">
                  <TextField<PasswordFormInput>
                    label="Current Password"
                    name="oldPassword"
                    type="password"
                    register={registerPassword}
                    errors={passwordError.oldPassword}
                  />
                  <TextField<PasswordFormInput>
                    label="New password"
                    name="newPassword"
                    type="password"
                    register={registerPassword}
                    errors={passwordError.newPassword}
                  />
                  <Button
                    type="submit"
                    className="w-fit h-fit mt-4"
                    isLoading={isSubmittingPassword}
                  >
                    Save
                  </Button>
                </List>
              </form>
            )}
          </List>
        </List>
      </section>
    </>
  );
}
