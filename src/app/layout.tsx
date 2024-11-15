import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/auth.provider";
import ReactQueryProvider from "@/providers/react.query.provider";

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
            <ReactQueryProvider>
            <AuthProvider>
            <div>
            {children}
            </div>
            </AuthProvider>
            </ReactQueryProvider>
            <Toaster position="bottom-right" />
         </body>
      </html>
   );
}
