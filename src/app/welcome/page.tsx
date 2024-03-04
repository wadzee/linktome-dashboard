"use client";

import { RedirectType, useRouter, useSearchParams } from "next/navigation";

import { CreateAPassword } from "src/modules/welcome/CreateAPassword";
import Image from "next/image";
import Link from "next/link";
import { List } from "src/components/List/List";
import { ProfileCreation } from "src/modules/welcome/ProfileCreation";
import { TermsAndCondition } from "src/modules/welcome/TermsAndCondition";
import { useEffect, useState } from "react";

enum STAGES {
  TNC = 1,
  CREATE_PASSWORD = 2,
  PROFILE_CREATION = 3,
}

export default function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("email");
  const nextStage = searchParams.get("nextStage");
  const [stage, setStage] = useState<STAGES>(STAGES.TNC);

  useEffect(() => {
    if (nextStage) {
      setStage(STAGES[nextStage as keyof typeof STAGES]);
    }
  }, [nextStage]);

  const onNext = (accept = true) => {
    if (!accept) {
      router.replace("/");
    }

    switch (stage) {
      case STAGES.TNC:
        setStage(STAGES.CREATE_PASSWORD);
        break;
      case STAGES.CREATE_PASSWORD:
        setStage(STAGES.PROFILE_CREATION);
        break;
      case STAGES.PROFILE_CREATION:
        router.replace("/");
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
