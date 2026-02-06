import type { Metadata } from "next";
import './global.css';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Roboto } from "next/font/google";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "An app for creating and organizing personal notes so nothing gets lost",
  openGraph: {
    title: "NoteHub",
    description:
      "An app for creating and organizing personal notes so nothing gets lost",
    url: "https://08-zustand-aedg.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanstackProvider>
          <AuthProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}