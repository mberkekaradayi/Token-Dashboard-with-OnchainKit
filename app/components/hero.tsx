import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageSvg from "../svg/Image";
import { LoadingSpinner } from "./loading-spinner";

export const Hero = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleDashboardClick = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  if (isRedirecting) {
    return (
      <div className="w-full min-h-full font-sans dark:bg-background dark:text-white bg-white text-black flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full font-sans dark:bg-background dark:text-white bg-white text-black flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <div className="mb-6">
            <ImageSvg className="w-24 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Discover Your Base Network Balance with OnchainKit
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
            {isConnected
              ? "View your Base network balance."
              : "Connect your wallet to view your Base network balance."}
          </p>
          <div className="flex justify-center w-full">
            {isConnected ? (
              <button
                onClick={handleDashboardClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              >
                Go to Dashboard
              </button>
            ) : (
              <Wallet>
                <ConnectWallet className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                  Connect Wallet to View Balance
                </ConnectWallet>
              </Wallet>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
