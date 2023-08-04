import React from "react";

export default function Icon({
  icon,
  size,
  color,
}: {
  icon: any;
  size: string | number;
  color?: string;
}): React.JSX.Element {
  return <div className={`w-${size} h-${size}`}>{icon}</div>;
}
