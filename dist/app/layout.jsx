import "./globals.css";
import Providers from "./Providers";
import Navbar from "../components/Navbar";
export default function RootLayout({ children }) {
    return (<html lang="fr">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>);
}
