import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

import classNames from "classnames";
import { List } from "../List/List";
import { Text } from "../Text/Text";

interface TextAreaFieldProps<T extends FieldValues>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
}

export function TextAreaField<TValue extends FieldValues>({
  label,
  register,
  required = true,
  name,
  className,
  ...rest
}: TextAreaFieldProps<TValue>) {
  return (
    <List gap="gap-4">
      {label && <Text>{label}</Text>}
      <textarea
        {...rest}
        {...register(name)}
        required
        autoComplete="off"
        className={classNames("textfield w-full", className)}
      />
    </List>
  );
}
