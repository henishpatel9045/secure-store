"use client";

import DocShareTable from "@/components/DocShareTable";
import { bytesToSize, generateAvatarText } from "@/helpers/helper";
import { HiDatabase } from "react-icons/hi";
import { IoDocumentLock, IoDocument } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserData } from "@/helpers/dbCalls";
import Timer from "@/components/Timer";
import Loading from "@/components/Loading";

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
  const [fetched, setFetched] = useState(false);
  const getData = async () => {
    if (status !== "authenticated") return;
    setUserData(await getUserData(session.user?.email ?? ""));
    setFetched(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-base-800 w-full h-full xs:p-4 p-6">
      <div className="sm:w-1/3 md:w-40 h-40 rounded-full mb-4 mx-auto">
        {session?.user?.image ? (
          <img
            src={session?.user?.image}
            alt={session?.user?.name ?? ""}
            className="w-full h-full rounded-full"
          />
        ) : (
          <div className="text-neutral-content rounded-full bg-base-content xs:w-20 xs:h-20 md:w-40 md:h-40 ">
            <span className="xs:text-2xl md:text-5xl text-white w-full h-full flex items-center justify-center">
              {generateAvatarText(
                session?.user?.name ?? session?.user?.email ?? ""
              )}
            </span>
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-2 text-center">
        {session?.user?.name}
      </h1>
      <p className="text-secondary mb-4 text-center">{session?.user?.email}</p>
      {fetched ? (
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProfilePage;
