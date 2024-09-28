import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/utils/tw-cn";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Header from "@/components/header/Header";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import DatasetPageContext from "@/contexts/DatasetPageContext";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import ExportingDatasetsContext from "@/contexts/ExportingDatasetsContext";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "LLMs TDM App",
  description: "LLMs Training Datasets Manager application for creating and managing training datasets with different formats for training Large Language Models (LLMs).",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col gap-2 container !px-2",
          fontSans.variable
        )}
        style={{ marginLeft: "auto !important", marginRight: "auto !important" }}
      >
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <ReactQueryProvider>
            <TooltipProvider>
              <ExportingDatasetsContext>
                <DatasetPageContext>
                  <Header />
                  <main className="flex h-full flex-1">
                    {children}
                  </main>
                  <Toaster />
                </DatasetPageContext>
              </ExportingDatasetsContext>
            </TooltipProvider>
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
