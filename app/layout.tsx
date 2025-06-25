import "./globals.css";
import { ReactNode } from "react";
import Navbar from "../components/navigation/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
          <ClerkProvider>
            <Navbar />
            {children}
          </ClerkProvider>
      </body>
    </html>
  );
}