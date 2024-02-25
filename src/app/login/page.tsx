"use client";

import { signIn, useSession } from "next-auth/react";

import { Button } from "src/components/Button/Button";
import { SignInFormProps } from "src/services/auth/signIn";
import { Text } from "src/components/Text/Text";
import { TextField } from "src/components/Inputs/TextField";
import classNames from "classnames";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormProps>();

  if (status === "authenticated") {
    redirect("/");
  }

  const onSubmit = async (input: SignInFormProps) => {
    const response = await signIn("credentials", {
      username: input.username,
      password: input.password,
    });

    if (response?.ok) {
      redirect("/");
    }
  };

  return (
    <section
      className={classNames(
        "sm:-ml-[220px] -mt-[56px] sm:mt-0",
        "h-full flex flex-col justify-center"
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-[600px] mx-auto justify-center w-full"
      >
        <h3>Login</h3>
        <Text>Enter your account details to login</Text>
        <TextField<SignInFormProps>
          label="Email"
          name="username"
          register={register}
          errors={errors.username}
        />
        <TextField<SignInFormProps>
          label="Password"
          name="password"
          type="password"
          register={register}
          errors={errors.password}
        />
        <Button
          isLoading={isSubmitting}
          type="submit"
          className="px-6 w-[160px] rounded-full "
        >
          Login
        </Button>
      </form>
    </section>
  );
}
