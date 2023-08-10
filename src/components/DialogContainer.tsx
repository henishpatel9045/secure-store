import React from "react";

export default function DialogContainer({
  children,
  id,
  className="",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <dialog id={id} className={"modal absolute -z-50 "+className}>
      {children}
    </dialog>
  );
}
