import {
  PasswordFormInput,
  updateUserPassword,
} from "src/services/auth/updateUserPassword";
import { useEffect, useState } from "react";

import { Button } from "src/components/Button/Button";
import { Flex } from "src/components/Flex/Flex";
import { List } from "src/components/List/List";
import { Text } from "src/components/Text/Text";
import { TextField } from "src/components/Inputs/TextField";
import { TickIcon } from "src/components/Icons/TickIcon";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

interface CreateAPasswordProps {
  username: string;
  next: () => void;
}

export function CreateAPassword({ username, next }: CreateAPasswordProps) {
  const [containNumber, setContainNumber] = useState(false);
  const [containUppercaseLetter, setContainUpperCaseLetter] = useState(false);
  const [containMinimumLength, setContainMinimumLength] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormInput>({
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit = async (input: PasswordFormInput) => {
    try {
      await updateUserPassword({
        newPassword: input.newPassword,
        firstTime: true,
        username,
      });

      await signIn("credentials", {
        username,
        password: input.newPassword,
        callbackUrl: window.location.href + "&nextStage=PROFILE_CREATION",
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    const numberRegex = new RegExp("(?=.*?[0-9])");
    const upperCaseRegex = new RegExp("(?=.*?[A-Z])");
    const subscription = watch(({ newPassword }) => {
      const password = newPassword as string;
      if (numberRegex.test(password as string)) {
        setContainNumber(true);
      } else {
        setContainNumber(false);
      }
      if (upperCaseRegex.test(password as string)) {
        setContainUpperCaseLetter(true);
      } else {
        setContainUpperCaseLetter(false);
      }
      if (password.length >= 8) {
        setContainMinimumLength(true);
      } else {
        setContainMinimumLength(false);
      }
      return () => subscription.unsubscribe();
    });
  }, [watch]);

  return (
    <List>
      <h3>Create a password</h3>
      <Text className="text-light-navy">
        Please create a password for your account. Your username will be your
        email address.
      </Text>
      <Text>Your password must have</Text>
      <List gap="gap-4">
        <Flex>
          <TickIcon
            className={classNames({
              ["fill-light-navy"]: !containMinimumLength,
              ["fill-green"]: containMinimumLength,
            })}
            width={20}
            height={20}
          />
          <Text>8 or more characters</Text>
        </Flex>
        <Flex>
          <TickIcon
            className={classNames({
              ["fill-light-navy"]: !containUppercaseLetter,
              ["fill-green"]: containUppercaseLetter,
            })}
            width={20}
            height={20}
          />
          <Text>At least one capital letter</Text>
        </Flex>
        <Flex>
          <TickIcon
            className={classNames({
              ["fill-light-navy"]: !containNumber,
              ["fill-green"]: containNumber,
            })}
            width={20}
            height={20}
          />
          <Text>At least one number</Text>
        </Flex>
      </List>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <TextField<PasswordFormInput>
          label="Password"
          name="newPassword"
          type="password"
          register={register}
          errors={errors.newPassword}
        />
        <Button
          type="submit"
          disabled={
            !containMinimumLength || !containNumber || !containUppercaseLetter
          }
          className="w-full sm:w-fit"
        >
          Next
        </Button>
      </form>
    </List>
  );
}
