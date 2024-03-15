import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

import { Flex } from "../Flex/Flex";
import { Text } from "../Text/Text";
import classNames from "classnames";

interface TextFieldProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  errors?: FieldError;
  minLength?: number;
}

export function TextField<TValue extends FieldValues>({
  label,
  register,
  required = true,
  type = "text",
  errors,
  name,
  minLength,
  ...rest
}: TextFieldProps<TValue>) {
  return (
    <div className="relative">
      <Flex className={classNames("textfield", errors && "!border-red-500")}>
        <input
          type={type}
          {...rest}
          required
          autoComplete="off"
          {...register(name, {
            required,
            ...(minLength &&
              minLength > 0 && {
                minLength: {
                  value: minLength,
                  message: "Password should be at least 8 characters.",
                },
              }),
            ...(type === "email" && {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            }),
          })}
          className={classNames("peer z-10", label && "mt-3")}
        />
        {label && (
          <label
            className={classNames(
              "absolute left-5",
              "peer-invalid:top-2 peer-invalid:text-xs",
              "peer-focus:top-2 peer-focus:text-xs",
              "peer-valid:top-2 peer-valid:text-xs",
              "peer-disabled:top-2 peer-disabled:text-xs peer-disabled:opacity-50"
            )}
          >
            {label}
          </label>
        )}
      </Flex>
      {errors?.message && (
        <Text className="absolute text-start text-xs mx-5 text-[rgb(239,68,68)] w-full">
          {errors.message}
        </Text>
      )}
    </div>
  );
}
