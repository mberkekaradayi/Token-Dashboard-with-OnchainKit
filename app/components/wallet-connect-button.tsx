"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
  ConnectWalletText,
} from "@coinbase/onchainkit/wallet";
import {
  Avatar,
  Name,
  Address,
  EthBalance,
  Identity,
} from "@coinbase/onchainkit/identity";
import { useRouter } from "next/navigation";

export function WalletConnectButton({ label = "Log In" }: { label?: string }) {
  const router = useRouter();

  const handleDisconnect = () => {
    router.push("/");
  };

  return (
    <Wallet>
      <ConnectWallet className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg transition flex items-center gap-2">
        <ConnectWalletText className="text-md font-bold">
          {label}
        </ConnectWalletText>
        <Avatar className="h-5 w-5" />
        <Name className="text-sm text-white" />
      </ConnectWallet>
      <WalletDropdown>
        <Identity
          className="px-4 pb-2 pt-3 hover:bg-[var(--primary-blue)]"
          hasCopyAddressOnClick
        >
          <Avatar />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownLink
          className="hover:bg-[var(--primary-blue)]"
          icon="wallet"
          href="https://keys.coinbase.com"
        >
          Wallet
        </WalletDropdownLink>
        <WalletDropdownDisconnect onDisconnect={handleDisconnect} />
      </WalletDropdown>
    </Wallet>
  );
}
