"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading";
import { generateAvatarText } from "@/helpers/helper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  if (status === "loading") return <Loading />;

  return (
    <div className="flex flex-col items-start w-full h-full">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <button
            className="btn btn-ghost normal-case text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            SecureStore
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className={`btn btn-ghost btn-circle avatar min-w-10 rounded-full ${
              session.user?.image ? "" : "placeholder:"
            }`}
          >
            {session.user?.image ? (
              <div className="w-10">
                <img
                  src={session.user?.image}
                  alt={session.user?.email ?? ""}
                  className="rounded-full w-full h-full"
                />
              </div>
            ) : (
              <div className="text-neutral-content rounded-full w-full">
                <span className=" text-xl h-full flex items-center justify-center">
                  {generateAvatarText(
                    session.user?.name ?? session.user?.email ?? ""
                  )}
                </span>
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-30"
          >
            <li>
              <Link href="/dashboard/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li
              onClick={() => {
                signOut({ callbackUrl: "/auth/login" });
              }}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${"flex"} lg:flex items-start justify-start h-full w-full overflow-y-scroll`}
      >
        <Sidebar minimized={isOpen} setMinimized={setIsOpen} className="z-50" />
        <div
          className={`flex-1 h-full w-full overflow-auto ${
            isOpen ? "xs:ml-0 lg:ml-16" : "ml-48"
          }`}
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
