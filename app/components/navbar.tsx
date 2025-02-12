"use client";

import { useRouter } from "next/navigation";
import { WalletConnectButton } from "./wallet-connect-button";

export function Navbar() {
  const router = useRouter();

  const handleNavigateHome = () => {
    router.push("/");
  };

  return (
    <nav className="fixed w-full border-b border-[#0066cc] dark:border-[#0066cc] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-12 mx-auto">
        <span
          className="cursor-pointer text-xl font-bold hover:text-blue-600 transition-colors"
          onClick={handleNavigateHome}
        >
          ONCHAIN BALANCE
        </span>
        <div className="flex items-center gap-4">
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  );
}
