import Provider from "@/components/Provider";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import CustomToastContainer from "@/components/CustomToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocVault",
  description: "Doc vault to store your documents securely.",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <CustomToastContainer />
        </Provider>
      </body>
    </html>
  );
}
