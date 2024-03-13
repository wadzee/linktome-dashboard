"use client";

import {
  TransactionsResponse,
  getUserTransactions,
} from "src/services/stripe/getTransactions";
import { useCallback, useContext, useEffect, useState } from "react";

import { Card } from "src/components/Card/Card";
import { ConvertEpochToDate } from "src/utils";
import { Flex } from "src/components/Flex/Flex";
import { Grid3Cols } from "src/components/Grid/Grid3Cols";
import { List } from "src/components/List/List";
import { Text } from "src/components/Text/Text";
import { UserContext, userContext } from "src/context/UserProvider";

export default function DonationPage() {
  const data = useContext(userContext);
  const [transactions, setTransactions] = useState<TransactionsResponse>();

  const getTransactions = useCallback(async (userData: UserContext) => {
    const response = await getUserTransactions(
      userData.idToken,
      userData.stripeId
    );
    if (response) {
      setTransactions(response);
    }
  }, []);

  useEffect(() => {
    if (data && data.stripeId) {
      getTransactions(data);
    }
  }, [data, getTransactions]);

  return (
    <>
      <h2>Hi, {data?.name}</h2>
      <Grid3Cols className="gap-6">
        <Card label="Funds raised">
          <h2>${transactions?.fundRaised || 0}</h2>
        </Card>
        <Card label="Next payment">
          <Flex>
            <h2>{transactions?.balance || 0}</h2>
            {/* <List gap="gap-0">
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
            </List> */}
          </Flex>
        </Card>
        <Card label="No. of donations">
          <h2>{transactions?.totalDonations || 0}</h2>
        </Card>
      </Grid3Cols>
      {/* <Card label="Graph">
        <Text>Todo</Text>
      </Card> */}
      <Text>Transactions</Text>
      {transactions?.data.map(({ created, amount }, idx) => {
        return (
          <List
            key={idx}
            className="text-sm w-full pb-4 border-b border-dashed"
            gap="gap-2"
          >
            <Text>{ConvertEpochToDate(created)}</Text>
            <Flex className="w-full" justifyContent="justify-between">
              <Text>Payout</Text>
              <Text>${amount}</Text>
            </Flex>
          </List>
        );
      })}
      {!transactions?.data.length && (
        <List
          className="text-sm w-full pb-4 border-b border-dashed"
          gap="gap-2"
        >
          <Text>You have zero transaction</Text>
        </List>
      )}
    </>
  );
}
