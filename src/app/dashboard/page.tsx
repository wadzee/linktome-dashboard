"use client";

import classNames from "classnames";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "src/components/Button/Button";
import { Flex } from "src/components/Flex/Flex";
import { EllipsisIcon } from "src/components/Icons";
import { List } from "src/components/List/List";
import { Table } from "src/components/Table/Table";
import { Text } from "src/components/Text/Text";
import { userContext } from "src/context/UserProvider";
import { getUserLists } from "src/services/admin/listUsers";
import { UserProfile } from "src/services/user/type";

export default function DashboardPage() {
  const data = useContext(userContext);
  return <div>hello</div>;
}
