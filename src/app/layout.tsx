import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const GooglePublicApi = process.env.OAUTH_GOOGLE;

export const metadata: Metadata = {
  title: "Firebox ai",
  description: "firebox ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId={GooglePublicApi ?? ""}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
