"use client";

import axios from "axios";
import { getSession } from "next-auth/react";

export interface TransactionProps {
  startingAfter?: string;
}

export interface TransactionObject {
  amount: number;
  created: number;
  id: string;
}

export interface TransactionsResponse {
  data: TransactionObject[];
  balance: number;
  feesTotal: number;
  totalDonations: number;
  fundRaised: number;
}

export async function getUserTransactions(props?: TransactionProps) {
  const session = await getSession();
  const stripeId = session?.user?.attributes.find(
    ({ Name }) => Name === "custom:stripeId"
  )?.Value;

  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${session?.user?.idToken}` },
  });

  try {
    const {
      data: { ...rest },
    } = await axiosInstance.post<TransactionsResponse>(
      `/user/${stripeId}/transactions`,
      props
    );

    return {
      ...rest,
    };
  } catch (err) {
    console.log("err", err);
  }
}
