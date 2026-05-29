import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavHeader from "./nav-header";
import { AuthProvider } from "./auth-context";
import { GoogleProvider } from "./google-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avatar Bible Quiz Questions",
  description: "Authentication pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleProvider>
          <AuthProvider>
            <NavHeader />
            {children}
          </AuthProvider>
        </GoogleProvider>
      </body>
    </html>
  );
}
