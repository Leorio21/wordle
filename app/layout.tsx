import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font--inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font--orbitron" });

export const metadata: Metadata = {
  title: "Wordle",
  description: "CodeLine - Challenge Wordle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${orbitron.variable}`}>
        {children}
      </body>
    </html>
  );
}
