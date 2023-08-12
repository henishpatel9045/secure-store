import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from "@/config/site";
import { ImGithub, ImLinkedin, ImWhatsapp } from "react-icons/im";

export default function Footer() {
  return (
    <footer
      className={`footer footer-center z-10 p-4 pb-2 bg-base-200 text-base-content rounded transition-all ${
        // isOpen ? "ml-16" : "ml-48"
        ""
      }`}
    >
      <div className=" flex flex-col justify-between">
        <div className="flex justify-between gap-4">
          <a className="link link-hover" target="_blank" href={GITHUB_URL}>
            <ImGithub className="xs:w-6 xs:h-6" />
          </a>
          <a className="link link-hover" target="_blank" href={WHATSAPP_URL}>
            <ImWhatsapp className="xs:w-6 xs:h-6" />
          </a>
          <a className="link link-hover" target="_blank" href={LINKEDIN_URL}>
            <ImLinkedin className="xs:w-6 xs:h-6" />
          </a>
        </div>
        <div>
          Copyright © 2023 - All right reserved by SecureStore
          <p className="xs:text-sm"></p>
        </div>
      </div>
    </footer>
  );
}
