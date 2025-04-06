"use client";

import { FundCard } from "@coinbase/onchainkit/fund";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

interface FundCardComponentProps {
  assetSymbol?: string;
  headerText?: string;
  buttonText?: string;
  onClose?: () => void;
}

const presetAmountInputs = ["10", "20", "50"] as const;

export const FundCardComponent = ({
  assetSymbol = "ETH",
  headerText = "Add Funds to Your Wallet",
  buttonText = "Purchase",
  onClose,
}: FundCardComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay to trigger the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // Add blur effect to background
    document.body.classList.add("bg-blur");

    // Handle escape key to close
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleEscKey);
      // Remove blur effect when component unmounts
      document.body.classList.remove("bg-blur");
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    // Add a slight delay before actually unmounting to allow animation to complete
    setTimeout(() => {
      if (onClose) onClose();
    }, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the content
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-md bg-white dark:bg-gray-900 p-4 rounded-lg shadow-xl transform transition-transform duration-200 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <IoClose size={30} />
        </button>
        <FundCard
          assetSymbol={assetSymbol}
          country="US" // Default to US, can be made configurable
          currency="USD" // Default to USD, can be made configurable
          headerText={headerText}
          buttonText={buttonText}
          presetAmountInputs={presetAmountInputs}
        />
      </div>
    </div>
  );
};
