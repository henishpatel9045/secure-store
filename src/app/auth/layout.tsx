"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <div className="relative flex items-center justify-center min-h-fit h-full bg-base-200 w-full">
      {session && session.user && (
        <pre className="absolute top-6 z-10 flex flex-wrap items-center justify-center gap-2 h-fit max-w-full xs:w-11/12 md:w-10/12 lg:w-8/12 xs:p-3 badge badge-success badge-lg break-words">
          Currently logged in as{" "}
          <b className="text-primary underline">{session?.user?.name}</b> with
          email <b className="text-primary underline">{session?.user?.email}</b>
          <Link
            className="btn btn-sm btn-primary ml-6"
            href="/dashboard/profile"
          >
            Go to Dashboard
          </Link>
        </pre>
      )}
      {children}
    </div>
  );
}
