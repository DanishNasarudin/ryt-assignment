import React from "react";
import { AuthProvider } from "./providers/auth-provider";
import { MaskProvider } from "./providers/mask-provider";
import { SearchProvider } from "./providers/search-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <MaskProvider>{children}</MaskProvider>
        </SearchProvider>
      </AuthProvider>
    </>
  );
}
