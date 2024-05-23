import Link from "next/link";
import {auth} from "@/app/_lib/auth";

export default async function Navigation() {
    const session = await auth();
    return (
        <nav className="z-10 text-xl">
            <ul className="flex gap-16 items-center">
                <li>
                    <Link href="/cabins" className="hover:text-accent-400 transition-colors">
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="hover:text-accent-400 transition-colors">
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        href="/account"
                        className="hover:text-accent-400 transition-colors flex items-center gap-4"
                    >
                        {session &&
                            <img className="h-8 rounded-full" src={String(session?.user?.image)} alt="User's avatar"
                                 referrerPolicy="no-referrer"/>}
                        <span>Guest area</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
