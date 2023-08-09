"use client";

import DocShareTable from "@/components/DocShareTable";
import { bytesToSize } from "@/helpers/helper";
import { HiDatabase } from "react-icons/hi";
import { IoDocumentLock, IoDocument } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserData } from "@/helpers/dbCalls";
import Timer from "@/components/Timer";

const iconProps = {
  size: 40,
  color: "#d926a9",
};

const Stats = ({
  space,
  docs,
  encDocs,
}: {
  space: number;
  docs: {
    totalCount: number;
    sharable: number;
  };
  encDocs: {
    totalCount: number;
  };
}) => {
  return (
    <div className="stats shadow w-full xs:flex xs:flex-col md:flex-row">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <HiDatabase {...iconProps} />
        </div>
        <div className="stat-title">Space Used</div>
        <div className="stat-value">{bytesToSize(space)}</div>
        {/* <div className="stat-desc"></div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <IoDocument {...iconProps} />
        </div>
        <div className="stat-title">Documents</div>
        <div className="stat-value">{docs.totalCount}</div>
        <div className="stat-desc">Sharable: {docs.sharable}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <IoDocumentLock {...iconProps} />
        </div>
        <div className="stat-title">Encrypted Documents</div>
        <div className="stat-value">{encDocs.totalCount}</div>
        {/* <div className="stat-desc">Sharable: {encDocs.sharable}</div> */}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<{
    accountId: string | undefined;
    spaceUsed: number | undefined;
    docs: {
      total: number | undefined;
      sharable: number | undefined;
    };
    encryptedDocs: {
      total: number | undefined;
    };
  } | null>(null);
  const getData = async () => {
    if (status !== "authenticated") return;

    setUserData(await getUserData(session.user?.email ?? ""));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-base-800 w-full h-full xs:p-4 p-6">
      <img
        src={session?.user?.image ?? ""}
        alt={session?.user?.name ?? ""}
        className="sm:w-1/3 md:w-40 h-40 rounded-full mb-4 mx-auto"
      />
      <h1 className="text-2xl font-bold mb-2 text-center">
        {session?.user?.name}
      </h1>
      <p className="text-secondary mb-4 text-center">{session?.user?.email}</p>
      <div className="w-full flex-1 flex flex-col items-center gap-4">
        <Stats
          space={userData?.spaceUsed ?? 0}
          docs={{
            totalCount: userData?.docs.total ?? 0,
            sharable: userData?.docs.sharable ?? 0,
          }}
          encDocs={{ totalCount: userData?.encryptedDocs.total ?? 0 }}
        />
        <DocShareTable />
        {/* <EncryptedDocShareTable /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
