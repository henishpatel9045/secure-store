import React from "react";

export default function ShareViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-full bg-base-100">{children}</div>;
}
