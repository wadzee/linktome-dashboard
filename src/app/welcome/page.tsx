"use client";

import { redirect, useSearchParams } from "next/navigation";

import { CreateAPassword } from "src/modules/welcome/CreateAPassword";
import Image from "next/image";
import Link from "next/link";
import { List } from "src/components/List/List";
import { ProfileCreation } from "src/modules/welcome/ProfileCreation";
import { TermsAndCondition } from "src/modules/welcome/TermsAndCondition";
import { useState } from "react";

enum STAGES {
  TNC = 1,
  CREATE_PASSWORD = 2,
  PROFILE_CREATION = 3,
}

export default function WelcomePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("email");
  const [stage, setStage] = useState<STAGES>(STAGES.TNC);

  console.log("username", username);

  const onNext = (accept = true) => {
    if (!accept) {
      redirect("/");
    }

    switch (stage) {
      case STAGES.TNC:
        setStage(STAGES.CREATE_PASSWORD);
        break;
      case STAGES.CREATE_PASSWORD:
        setStage(STAGES.PROFILE_CREATION);
        break;
      case STAGES.PROFILE_CREATION:
        redirect("/");
      default:
        setStage(STAGES.TNC);
    }
  };

  return (
    <div className="-mt-[56px] sm:mt-0 sm:-ml-[220px] h-full">
      <nav>
        <Link href="/">
          <Image
            src="/linktome-logo-light.svg"
            alt="linktome-logo"
            height={32}
            width={96}
          />
        </Link>
      </nav>
      <List className="max-w-[600px] mx-auto py-8 sm:py-20 h-full">
        {stage === STAGES.TNC && <TermsAndCondition next={onNext} />}
        {stage === STAGES.CREATE_PASSWORD && (
          <CreateAPassword username={username || ""} next={onNext} />
        )}
        {stage === STAGES.PROFILE_CREATION && <ProfileCreation next={onNext} />}
      </List>
    </div>
  );
}
