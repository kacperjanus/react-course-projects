import Navigation from "@/app/_components/Navigation";
import {ReactNode} from "react";
import Logo from "@/app/_components/Logo";

import "@/app/_styles/globals.css"

export const metadata = {
    title: "The Wild Oasis",
}

export default function RootLayoutLayout({children}: { children: ReactNode }) {
    return <html>
    <body className="bg-primary-950 text-primary-100 min-h-screen">
    <header>
        <Logo/>
        <Navigation/>
    </header>
    <main>
        {children}
    </main>
    <footer>Copyright by The Wild Oasis</footer>
    </body>
    </html>
}