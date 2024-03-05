"use client";

import classNames from "classnames";
import { redirect } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "src/components/Button/Button";
import { Card } from "src/components/Card/Card";
import { Flag } from "src/components/Flag/Flag";
import { Flex } from "src/components/Flex/Flex";
import { PlusIcon } from "src/components/Icons";
import { SelectField } from "src/components/Inputs/SelectField";
import { Table } from "src/components/Table/Table";
import { userContext } from "src/context/UserProvider";
import { CountryCreation } from "src/modules/Admin/CountryCreation";
import { PartyCreation } from "src/modules/Admin/PartyCreation";
import {
  Countries,
  Parties,
  getCountries,
} from "src/services/admin/getCountries";

const PartyHeader = [
  {
    field: "party",
    label: "Party Name",
    width: "25%",
  },
  {
    field: "country",
    label: "Country",
    width: "25%",
  },
  {
    field: "member",
    label: "Members",
    width: "25%",
  },
  {
    field: "active",
    label: "Active",
    width: "25%",
  },
];

const CountryHeader = [
  {
    field: "country",
    label: "Name of the country",
    width: "33%",
  },
  {
    field: "linkedParties",
    label: "No of linked parties",
    width: "33%",
  },
  {
    field: "active",
    label: "Active",
    width: "33%",
  },
];

export default function Parties() {
  const data = useContext(userContext);
  const [parties, setParties] = useState<Parties[]>();
  const [countries, setCountries] = useState<Countries[]>();
  const [isAddPartyMode, setIsAddPartyMode] = useState(false);
  const [isAddCountryMode, setIsAddCountryMode] = useState(false);
  const [view, setView] = useState<"party" | "country">("party");

  if (!data?.isAdmin) {
    redirect("/");
  }

  const fetchCountries = useCallback(async () => {
    const data = await getCountries();

    const parties = data
      .filter(({ parties }) => !!parties)
      .map(({ parties }) => parties)
      .flat();
    setParties(parties);
    setCountries(data);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleNext = (back?: boolean) => {
    toast.success("New Party Added");
    fetchCountries();
  };

  const renderAction = useCallback((id: string, active: boolean) => {
    return (
      <label className="relative">
        <input
          type="checkbox"
          className="peer appearance-none hidden"
          defaultChecked={active}
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

  return (
    <div className="relative">
      <Flex
        justifyContent="justify-between"
        alignItems="items-start"
        className="flex-col items-start justify-start sm:flex-row sm:items-center"
      >
        <h2>Parties</h2>
        <Flex>
          <Button onClick={() => setIsAddPartyMode(true)}>Add new party</Button>
          <Button onClick={() => setIsAddCountryMode(true)}>
            Add new country
          </Button>
        </Flex>
      </Flex>
      <Flex justifyContent="justify-between" className="sm:my-12 my-8">
        <Flex>
          <button
            className={classNames(view === "party" && "active-link")}
            onClick={() => setView("party")}
          >
            Parties
          </button>
          <button
            className={classNames(view === "country" && "active-link")}
            onClick={() => setView("country")}
          >
            Countries
          </button>
        </Flex>
      </Flex>
      <Table
        columns={view === "party" ? PartyHeader : CountryHeader}
        rows={
          view === "country"
            ? (countries || []).map((country) => {
                return {
                  country: (
                    <Flag
                      flag={`/flags/${country.id.toLowerCase()}.png`}
                      name={country.id}
                    />
                  ),
                  linkedParties: country.parties?.length,
                  active: renderAction(country.id, country.active),
                };
              })
            : (parties || []).map((party) => {
                return {
                  party: party?.label,
                  country: party?.country,
                  member: party?.member || 3,
                  active: renderAction(party?.id, party?.active),
                };
              })
        }
      />
      {isAddPartyMode && (
        <div className="backdrop">
          <Card
            label="Add a new party"
            className=" bg-primary-dark max-w-[500px] w-full p-8 relative mx-4"
          >
            <PartyCreation idToken={data.idToken} next={handleNext} />
            <div
              className="rotate-45 absolute top-8 right-8"
              onClick={() => setIsAddPartyMode(false)}
            >
              <PlusIcon
                width={24}
                height={24}
                className="fill-secondary-dark"
              />
            </div>
          </Card>
        </div>
      )}
      {isAddCountryMode && (
        <div className="backdrop">
          <Card
            label="Add a new country"
            className=" bg-primary-dark max-w-[500px] w-full p-8 relative mx-4"
          >
            <CountryCreation idToken={data.idToken} next={handleNext} />
            <div
              className="rotate-45 absolute top-8 right-8"
              onClick={() => setIsAddCountryMode(false)}
            >
              <PlusIcon
                width={24}
                height={24}
                className="fill-secondary-dark"
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
