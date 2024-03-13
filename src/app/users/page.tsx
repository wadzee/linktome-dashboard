"use client";

import classNames from "classnames";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "src/components/Button/Button";
import { Card } from "src/components/Card/Card";
import { Flex } from "src/components/Flex/Flex";
import { EllipsisIcon } from "src/components/Icons";
import { List } from "src/components/List/List";
import { Table } from "src/components/Table/Table";
import { Text } from "src/components/Text/Text";
import { userContext } from "src/context/UserProvider";
import { ProfileAdminCreation } from "src/modules/Admin/ProfileAdminCreation";
import { getUserLists } from "src/services/admin/listUsers";
import { UserProfile } from "src/services/user/type";

const UnverifiedHeader = [
  {
    field: "name",
    label: "Name",
    width: "20%",
  },
  {
    field: "party",
    label: "Political Party",
    width: "20%",
  },
  {
    field: "email",
    label: "Email",
    width: "20%",
  },
  {
    field: "status",
    label: "Status",
    width: "20%",
  },
  {
    field: "action",
    label: "Action",
    width: "20%",
  },
];

const VerifiedHeader = [
  {
    field: "name",
    label: "Name",
    width: "25%",
  },
  {
    field: "party",
    label: "Political Party",
    width: "25%",
  },
  {
    field: "amount",
    label: "Amount Raised",
    width: "25%",
  },
  {
    field: "active",
    label: "Active",
    width: "25%",
  },
];

export default function UserPage() {
  const data = useContext(userContext);
  const [inviteUserMode, setInviteUserMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [users, setUsers] = useState<Array<UserProfile & { email: string }>>();
  const [filter, setFitler] = useState<"Unverified" | "Verified">("Unverified");

  if (!data?.isAdmin) {
    redirect("/");
  }

  const renderUnverifiedAction = useCallback(
    (id: string, status: string) => {
      return (
        <Flex justifyContent="justify-between">
          <Button disabled={status === "Verified"}>Verify</Button>
          <div onClick={() => setSelectedId(id)} className="relative">
            <EllipsisIcon width={18} height={18} className="fill-light-navy" />
            {selectedId === id && (
              <Card className="fixed right-24 z-50 bg-white text-navy">
                <List gap="gap-2" alignItems="items-start">
                  <button className="w-full text-start">Profile</button>
                  <button className="w-full text-start">Reset password</button>
                  <button className="w-full text-start">
                    Delete permenantly
                  </button>
                </List>
              </Card>
            )}
          </div>
        </Flex>
      );
    },
    [selectedId]
  );

  const renderVerifiedAction = useCallback((id: string) => {
    return (
      <label className="relative">
        <input
          type="checkbox"
          className="peer appearance-none hidden"
          defaultChecked
        />
        <span
          className={classNames(
            "w-12 h-6 flex items-center flex-shrink-0 p-1",
            "bg-light-navy rounded-full duration-300 ease-in-out",
            "peer-checked:bg-secondary-dark after:w-5 after:h-5 peer-checked:after:translate-x-5",
            "after:bg-primary-dark after:rounded-full after:shadow-md after:duration-300"
          )}
        ></span>
      </label>
    );
  }, []);

  const fetchUserList = useCallback(async (token: string) => {
    const { users } = await getUserLists(token);

    setUsers(users);
  }, []);

  useEffect(() => {
    if (data.idToken) {
      fetchUserList(data.idToken);
    }
  }, [data.idToken, fetchUserList]);

  if (inviteUserMode) {
    return (
      <ProfileAdminCreation
        next={() => {
          toast.success("User added");
          setInviteUserMode(false);
          fetchUserList(data.idToken);
        }}
        onCancel={() => setInviteUserMode(false)}
      />
    );
  }

  return (
    <>
      <Flex justifyContent="justify-between">
        <h2>Users</h2>
        <Button onClick={() => setInviteUserMode(true)}>Invite users</Button>
      </Flex>
      <Flex justifyContent="justify-between" className="sm:my-12">
        <Flex>
          <button
            className={classNames(filter === "Unverified" && "active-link")}
            onClick={() => setFitler("Unverified")}
          >
            Unverified
          </button>
          <button
            className={classNames(filter === "Verified" && "active-link")}
            onClick={() => setFitler("Verified")}
          >
            Verified
          </button>
        </Flex>
      </Flex>
      <Table
        columns={filter === "Unverified" ? UnverifiedHeader : VerifiedHeader}
        rows={(users || [])
          ?.filter((user) => {
            if (filter === "Verified" && user.status === "Verified") {
              return user;
            }
            if (filter === "Unverified" && user.status !== "Verified") {
              return user;
            }
          })
          .map((user) => {
            if (filter === "Verified") {
              return {
                name: (
                  <Flex>
                    <Image
                      src={
                        user.image
                          ? `https://linktome-assets.s3.ap-southeast-1.amazonaws.com/${user.id}/${user.image}`
                          : "/default_profile.png"
                      }
                      alt="profile"
                      width={32}
                      height={32}
                      className="rounded-full aspect-square"
                    />
                    <Text>{user.firstName + " " + user.lastName} </Text>
                  </Flex>
                ),
                party: user.party,
                amount: Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(100),
                active: renderVerifiedAction(user.id),
              };
            }

            return {
              name: (
                <Flex>
                  <Image
                    src={
                      user.image
                        ? `https://linktome-assets.s3.ap-southeast-1.amazonaws.com/${user.id}/${user.image}`
                        : "/default_profile.png"
                    }
                    alt="profile"
                    width={32}
                    height={32}
                    className="rounded-full aspect-square"
                  />
                  <Text>{user.firstName + " " + user.lastName} </Text>
                </Flex>
              ),
              party: user.party,
              email: user.email,
              status: user.status,
              action: renderUnverifiedAction(user.id, user.status),
            };
          })}
      />
    </>
  );
}
