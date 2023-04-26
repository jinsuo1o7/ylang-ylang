"use client";
import React from "react";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};
export default function SwrConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (url) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
