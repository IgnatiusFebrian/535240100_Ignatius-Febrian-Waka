import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "../components/navbar";

export const metadata = {
  title: "Checklist Perlengkapan Acara",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
