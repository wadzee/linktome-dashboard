import Link from "next/link";
import { Button } from "src/components/Button/Button";
import { Flex } from "src/components/Flex/Flex";
import { List } from "src/components/List/List";

interface TermsAndConditionProps {
  next: (accept: boolean) => void;
}

export function TermsAndCondition({ next }: TermsAndConditionProps) {
  return (
    <List gap="gap-4" className="gap-8 mb-8">
      <h3>Please accept our Terms and Conditions to continue</h3>
      <p className="text-light-navy">
        By continuing, you agree to our{" "}
        <Link
          href="https://linktome.xyz/legals/privacy-policy"
          target="_blank"
          className="links"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          href="https://linktome.xyz/legals/tnc"
          target="_blank"
          className="links"
        >
          Terms and Conditions
        </Link>
      </p>
      <Flex className="mb-8">
        <Button variant="secondary" onClick={() => next(false)}>
          Disagree
        </Button>
        <Button onClick={() => next(true)}>Agree</Button>
      </Flex>
    </List>
  );
}
