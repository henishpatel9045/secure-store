"use client";
import Link from "next/link";
import { ImIndentDecrease, ImIndentIncrease } from "react-icons/im";
import { SideBarData } from "@/config/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const Sidebar = ({
  minimized,
  setMinimized,
  className,
}: // selected,
// setSelected,
{
  minimized: boolean;
  setMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  // selected: number | string;
  // setSelected: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth <= 550) setMinimized((val) => !val);
  }, [pathname]);

  return (
    <div
      className={`z-50 bg-base-200 h-full ${
        minimized ? "xs:-ml-16 lg:ml-0 lg:w-16" : "xs:w-full md:w-48"
      } transition-all fixed ${className}`}
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
          {/* <p className="divider" /> */}
          <div>
            <p
              className="w-full btn py-6 h-fit btn-ghost transition-all"
              onClick={() => {
                setMinimized(!minimized);
              }}
            >
              {!minimized ? (
                <ImIndentDecrease className="w-6 h-6" />
              ) : (
                <ImIndentIncrease className="w-6 h-6" />
              )}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
