import { Card } from "src/components/Card/Card";
import { ConvertEpochToDate } from "src/utils";
import { Flex } from "src/components/Flex/Flex";
import { Grid3Cols } from "src/components/Grid/Grid3Cols";
import Image from "next/image";
import { List } from "src/components/List/List";
import { Text } from "src/components/Text/Text";
import { Transaction } from "src/constants/transaction";

export default function DonationPage() {
  return (
    <>
      <h2>Hi, John</h2>
      <Grid3Cols className="gap-6">
        <Card label="Funds raised">
          <h2>$10,500</h2>
        </Card>
        <Card label="Next payment">
          <Flex>
            <h2>$250.00</h2>
            <List gap="gap-0">
              <Flex gap="gap-2">
                <Image
                  src="/uptrend.svg"
                  alt="uptrend-logo"
                  height={24}
                  width={24}
                />
                <Text>3%</Text>
              </Flex>
              <Text>since last week</Text>
            </List>
          </Flex>
        </Card>
        <Card label="No. of donations">
          <h2>32</h2>
        </Card>
      </Grid3Cols>
      <Card label="Graph">
        <Text>Todo</Text>
      </Card>
      <Text>Transactions</Text>
      {Transaction.map(({ arrival_date, amount }, idx) => (
        <List
          key={idx}
          className="text-sm w-full pb-4 border-b border-dashed"
          gap="gap-2"
        >
          <Text>{ConvertEpochToDate(arrival_date)}</Text>
          <Flex className="w-full" justifyContent="justify-between">
            <Text>Payout</Text>
            <Text>${amount / 100}</Text>
          </Flex>
        </List>
      ))}
    </>
  );
}
