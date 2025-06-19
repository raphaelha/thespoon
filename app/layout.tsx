import "./globals.css";
import { ReactNode } from "react";
import Providers from "./Providers";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}