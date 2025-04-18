import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import "@/styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function MainLayout({ children }) {
    return (
        <html>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
