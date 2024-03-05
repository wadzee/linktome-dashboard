import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Spinner } from "../Icons";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isSquare?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  variant = "primary",
  isSquare = false,
  className,
  children,
  isLoading = false,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        variant === "primary" ? "button-primary" : "button-secondary",
        isSquare && "!py-3 !px-12 rounded-none",
        "py-3 px-6 rounded-full relative",
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
      {isLoading && (
        <span className="absolute left-[49%]">
          <Spinner />
        </span>
      )}
    </button>
  );
};
