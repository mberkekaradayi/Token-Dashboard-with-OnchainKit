"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { fetchBaseToken, TokenData } from "../api/fetch-token";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import ImageSvg from "../svg/Image";
import { Address } from "@coinbase/onchainkit/identity";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const tokensPerPage = 5;

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    async function fetchTokens() {
      if (address) {
        setIsLoading(true);
        try {
          const data = await fetchBaseToken(address);
          setTokens(data);
        } catch (error) {
          console.error("Error fetching tokens:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchTokens();
  }, [address]);

  const sortedTokens = [...tokens].sort((a, b) => {
    const quantityA = parseFloat(a.quantity);
    const quantityB = parseFloat(b.quantity);
    return sortOrder === "asc" ? quantityA - quantityB : quantityB - quantityA;
  });

  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = sortedTokens.slice(indexOfFirstToken, indexOfLastToken);
  const totalPages = Math.ceil(sortedTokens.length / tokensPerPage);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center p-8 backdrop-blur-sm border border-gray-200 rounded-lg">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200/50 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200/50 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="text-gray-500 mt-4">Fetching your tokens...</p>
        </div>
      );
    }

    if (tokens.length === 0) {
      return (
        <div className="text-center p-8 backdrop-blur-sm border border-gray-200 rounded-lg">
          <p className="text-gray-500 text-lg mb-2">No Base tokens found</p>
          <p className="text-gray-400 text-sm mb-2">
            Your connected wallet doesn&apos;t have any tokens on Base network
            yet
          </p>
          <Address address={address} isSliced={false} className="text-sm" />
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl text-center mb-2">
          Your Token Balances on Base Network
        </h2>
        <div className="text-center mb-4">
          <Address address={address} isSliced={false} className="text-sm" />
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSort}
            className="px-4 py-2 text-sm border border-gray-200 rounded-md transition-all duration-200 hover:bg-white/10 hover:border-gray-300 flex items-center gap-2"
          >
            Sort by Quantity
            <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {currentTokens.map((token, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-3 px-2 transition-all duration-200 hover:bg-white/10 hover:shadow-sm rounded-md"
            >
              <div className="flex items-center">
                <div>
                  <p className="text-lg font-semibold">{token.name}</p>
                  <p className="text-sm text-gray-500">{token.symbol}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">
                {parseFloat(token.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-md transition-all duration-200 hover:bg-white/10 hover:border-gray-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-gray-200"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-md transition-all duration-200 hover:bg-white/10 hover:border-gray-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-gray-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-6 mt-16">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6 mt-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <ImageSvg className="w-12 h-12" />
          </div>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}
