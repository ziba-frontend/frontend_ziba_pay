import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const lato = Lato({
   subsets: ["latin"],
   weight: "400"
});

export const metadata: Metadata = {
   title: "Ziba Pay",
   description: "A payment gateway",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={cn("min-h-screen w-full ", lato.className)}>
            {children}
            <Toaster position="bottom-right" />
         </body>
      </html>
   );
}
