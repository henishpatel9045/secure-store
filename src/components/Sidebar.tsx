"use client";
import Link from "next/link";
import { ImIndentDecrease, ImIndentIncrease } from "react-icons/im";
import { SideBarData } from "@/config/navigation";
import { usePathname } from "next/navigation";

const Sidebar = ({
  minimized,
  setMinimized,
}: // selected,
// setSelected,
{
  minimized: boolean;
  setMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  // selected: number | string;
  // setSelected: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={`z-50 bg-base-200 h-full ${
        minimized ? "w-16" : "w-48"
      } transition-all fixed`}
    >
      <nav className="text-white pt-4 flex flex-col items-center justify-between w-full h-full">
        <ul className="w-full">
          {SideBarData.map((item, index) => {
            return (
              <li className="w-full" key={index}>
                <Link
                  href={item.href}
                  className={`flex flex-nowrap items-center justify-start btn btn-md btn-ghost ${
                    pathname.includes(item.href) && "btn-active"
                  }`}
                >
                  <item.icon className="w-8 h-8" />
                  {!minimized && (
                    <p className="transition-all text-xs">{item.title}</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="absolute bottom-20 w-full">
          <p className="divider" />
          <div>
            <p
              className="w-full btn btn-ghost transition-all"
              onClick={() => {
                setMinimized(!minimized);
              }}
            >
              {!minimized ? (
                <ImIndentDecrease className="w-8 h-8" />
              ) : (
                <ImIndentIncrease className="w-8 h-8" />
              )}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
