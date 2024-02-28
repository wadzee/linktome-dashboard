import { Button } from "src/components/Button/Button";
import { Flex } from "src/components/Flex/Flex";
import { List } from "src/components/List/List";

interface TermsAndConditionProps {
  next: (accept: boolean) => void;
}

export function TermsAndCondition({ next }: TermsAndConditionProps) {
  return (
    <List gap="gap-4" className="gap-8">
      <h3>Please accept our Terms and Conditions to continue</h3>
      <p className="text-light-navy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in augue
        congue, porttitor mi ut, volutpat metus. Mauris efficitur ut augue in
        congue. Integer in tellus sagittis, porttitor orci eu, molestie odio.
        Praesent varius bibendum turpis, eget imperdiet odio auctor vel. Nullam
        rutrum rutrum malesuada. Maecenas mauris justo, rhoncus vitae ultrices
        ut, finibus a nisi. Morbi tristique nisi eget est posuere varius. Aenean
        tempus libero at condimentum accumsan. Proin tincidunt nisi non aliquam
        tempus. Aenean tempus, ex pharetra molestie placerat, nisi metus mattis
        nulla, vel pharetra nunc nisl sit amet metus. Vivamus non velit
        placerat, fringilla mi dapibus, egestas diam. Nulla fringilla iaculis
        odio, sed tempor lorem vulputate nec. Suspendisse fringilla scelerisque
        mollis. Ut accumsan quam vehicula quam faucibus, id efficitur libero
        finibus. Cras nisl lacus, dictum a tristique ut, gravida vel tellus.
        Mauris ac arcu quis nunc lobortis imperdiet sed vitae neque. Ut at magna
        ex. Nulla ornare, eros commodo imperdiet dictum, erat ex pulvinar justo,
        a aliquet metus quam vitae felis. Suspendisse mi elit, consequat id
        egestas a, efficitur non nisl. Morbi eu efficitur diam. Quisque varius,
        purus ut ullamcorper cursus, enim ex ullamcorper odio, nec mattis ante
        arcu ut nunc. Donec et bibendum ligula. Aenean molestie sodales
        eleifend. Morbi scelerisque pretium volutpat. Etiam posuere, leo vel
        auctor iaculis, dolor enim scelerisque urna, luctus dignissim elit lorem
        non dolor. Maecenas fermentum tortor non nisi tempus, id feugiat lacus
        sodales. Proin non neque nunc. Mauris ante est, aliquam vel pellentesque
        et, elementum non quam.
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
