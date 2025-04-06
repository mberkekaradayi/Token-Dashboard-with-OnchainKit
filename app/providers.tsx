"use client";

import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import type { ReactNode } from "react";

export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      config={{
        appearance: { mode: "auto" },
        wallet: {},
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}
