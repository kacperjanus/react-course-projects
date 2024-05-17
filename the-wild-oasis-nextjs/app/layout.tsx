import {ReactNode} from "react";

import {Josefin_Sans} from "next/font/google"

const josefin = Josefin_Sans({
    subsets: ['latin'],
    display: "swap",
})

import "@/app/_styles/globals.css"
import Header from "@/app/_components/Header";

export const metadata = {
    title: {
        template: "%s | The Wild Oasis",
        default: "Welcome | The Wild Oasis"
    },
    description: "Luxurious cabin hotel, located in a heart of the Italian Dolomites, surrounded by beautiful mountains and dark forest"

}

export default function RootLayoutLayout({children}: { children: ReactNode }) {
    return <html>
    <body className={`bg-primary-950 text-primary-100 min-h-screen ${josefin.className} flex flex-col relative`}>
    <Header/>
    <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
            {children}
        </main>
    </div>
    </body>
    </html>
}