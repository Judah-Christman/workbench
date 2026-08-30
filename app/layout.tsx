import type { Metadata } from "next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workbench | Online client organization and time tracker",
  description: "The online workbench for freelancers to keep track of their clients and time worked.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col items-center">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
