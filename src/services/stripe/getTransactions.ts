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
  totalDonations: number;
  fundRaised: number;
}

export async function getUserTransactions(props?: TransactionProps) {
  const session = await getSession();
  console.log("session", session);
  const axiosInstance = axios.create({
    baseURL: "https://api.linktome.xyz",
    headers: { Authorization: `Bearer ${session?.user.accessToken}` },
  });

  try {
    const {
      data: { ...rest },
    } = await axiosInstance.post<TransactionsResponse>(
      "/user/acct_1Oml0xQeithcVJLi/transactions",
      props
    );

    return {
      ...rest,
    };
  } catch (err) {
    console.log("err", err);
  }
}
