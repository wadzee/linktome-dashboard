"use client";

import axios from "axios";

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

export async function getUserTransactions(
  idToken: string,
  stripeId: string,
  startingAfter?: string
) {
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  try {
    const {
      data: { ...rest },
    } = await axiosInstance.post<TransactionsResponse>(
      `/user/${stripeId}/transactions`,
      {
        startingAfter,
      }
    );

    return {
      ...rest,
    };
  } catch (err) {
    console.log("err", err);
  }
}
