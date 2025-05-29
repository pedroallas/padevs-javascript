import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationLoading } from "@/components/ui/navigation-loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JavaScript Completo - Do Básico ao Avançado",
  description:
    "Aprenda JavaScript de forma completa e interativa, desde os conceitos básicos até técnicas avançadas de programação.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NavigationLoading />
        {children}
      </body>
    </html>
  );
}
