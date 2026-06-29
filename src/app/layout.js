
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



import { Toaster } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Legal-Ease",
  description: "Connecting Talent. Solving Problems.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#F8F5EF] text-[#3B2F1E] flex flex-col">
        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#FFFFFF",
              color: "#3B2F1E",
              border: "1px solid #E6DCC8",
            },
            success: {
              iconTheme: {
                primary: "#D4A95A",
                secondary: "#FFFFFF",
              },
            },
            error: {
              style: {
                border: "1px solid #ef4444",
              },
            },
          }}
        />

        <Navbar></Navbar>

        <main className="flex-1">
          {children}
        </main>

        <Footer></Footer>
      </body>
    </html>
  );
}
