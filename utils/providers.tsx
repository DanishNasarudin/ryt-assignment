import React from "react";
import AuthProvider from "./providers/auth-provider";
import { MaskProvider } from "./providers/mask-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <MaskProvider>{children}</MaskProvider>
      </AuthProvider>
    </>
  );
}
