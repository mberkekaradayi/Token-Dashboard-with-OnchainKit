"use client";

import { useRouter } from "next/navigation";
import { WalletConnectButton } from "./wallet-connect-button";
import { useState, useEffect } from "react";
import { FundCardComponent } from "./fund-card";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useAccount } from "wagmi";
import { createPortal } from "react-dom";

export function Navbar() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [showFundCard, setShowFundCard] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleNavigateHome = () => {
    router.push("/");
  };

  const openFundCard = () => {
    setShowFundCard(true);
  };

  const closeFundCard = () => {
    setShowFundCard(false);
  };

  return (
    <>
      <nav className="fixed w-full border-b border-[#0066cc] dark:border-[#0066cc] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20">
        <div className="container flex h-20 items-center justify-between px-12 mx-auto">
          <span
            className="cursor-pointer text-xl font-bold hover:text-blue-600 transition-colors"
            onClick={handleNavigateHome}
          >
            ONCHAIN BALANCE
          </span>
          <div className="flex items-center gap-4">
            {isConnected && (
              <button
                onClick={openFundCard}
                className="bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-2 rounded-lg border border-blue-600 transition flex items-center gap-2"
              >
                <RiMoneyDollarCircleLine size={18} />
                Add Funds
              </button>
            )}
            <WalletConnectButton />
          </div>
        </div>
      </nav>

      {/* Render FundCard using a portal to ensure it appears in the middle of the page */}
      {isMounted &&
        showFundCard &&
        createPortal(
          <FundCardComponent assetSymbol="ETH" onClose={closeFundCard} />,
          document.body
        )}
    </>
  );
}
