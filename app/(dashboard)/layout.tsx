import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "../globals.css";
import LeftSideBar from "../components/layout/LeftSideBar";
import TopBar from "../components/layout/TopBar";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ecom-admin dashboard",
  description: "Admin Dashboard to manage ecom data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className={inter.className}>
            <div className="flex max-lg:flex-col text-grey-1">
              <TopBar/>
              <LeftSideBar />
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
