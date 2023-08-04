import { HiUserCircle, HiDocument, HiShieldCheck } from "react-icons/hi";

const SideBarData = [
  {
    title: "Profile",
    icon: HiUserCircle,
    href: "/dashboard/profile"
  },
  {
    title: "Doc",
    icon: HiDocument,
    href: "/dashboard/doc"
  },
  {
    title: "Security",
    icon: HiShieldCheck,
    href: "/dashboard/encryptedDoc"
  },
];

export { SideBarData };
