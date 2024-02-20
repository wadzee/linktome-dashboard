import Image from "next/image";
import { Text } from "src/components/Text/Text";

export interface FlagProps {
  name?: string;
  flag: string;
}

export const Flag = ({ name, flag }: FlagProps) => {
  return (
    <div className="flex gap-4">
      <Image height={24} width={24} src={flag} alt={`flag-${name}`} />
      {name && <Text>{name}</Text>}
    </div>
  );
};
