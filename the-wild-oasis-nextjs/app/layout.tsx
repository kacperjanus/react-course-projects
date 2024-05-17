import Navigation from "@/app/_components/Navigation";
import {ReactNode} from "react";
import Logo from "@/app/_components/Logo";

import "@/app/_styles/globals.css"

export const metadata = {
    title: {
        template: "%s | The Wild Oasis",
        default: "Welcome | The Wild Oasis"
    },
    description: "Luxurious cabin hotel, located in a heart of the Italian Dolomites, surrounded by beautiful mountains and dark forest"

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