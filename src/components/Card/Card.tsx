import { List } from "../List/List";
import { ReactNode } from "react";
import { Text } from "../Text/Text";
import classNames from "classnames";

interface CardProps {
  label: string;
  children: ReactNode;
  order?: string | number;
  className?: string;
}

export const Card = ({ label, children, order, className }: CardProps) => {
  return (
    <List
      className={classNames(className, "bg-card-gray p-5 rounded-xl")}
      gap="gap-4"
    >
      {order && <Text>{order}.</Text>}
      <Text className={classNames(order && "text-2xl")}>{label}</Text>
      {children}
    </List>
  );
};
