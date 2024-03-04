import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

import { Flex } from "../Flex/Flex";
import { Text } from "../Text/Text";
import classNames from "classnames";

interface TextFieldProps<T extends FieldValues>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  errors?: FieldError;
  options: {
    label: string;
    value: string;
  }[];
}

export function SelectField<TValue extends FieldValues>({
  register,
  required = true,
  errors,
  name,
  options,
  ...rest
}: TextFieldProps<TValue>) {
  return (
    <div className="relative">
      <Flex className={classNames("textfield", errors && "!border-red-500")}>
        <select {...rest} {...register(name)}>
          {options.map(({ label, value }, idx) => (
            <option value={value} key={idx}>
              {label}
            </option>
          ))}
        </select>
      </Flex>
      {errors?.message && (
        <Text className="absolute text-start text-xs mx-5 text-[rgb(239,68,68)] w-full">
          {errors.message}
        </Text>
      )}
    </div>
  );
}
