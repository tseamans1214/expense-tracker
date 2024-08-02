"use client"
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
function Topbar() {
    const router = useRouter();
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/assets/dollar-w.png" alt="logo" width={28} height={28}/>
                <p className="text-heading3-bold text-light-1 max-xs:hidden">Expense Tracker</p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton signOutCallback={()=> router.push('/sign-in')}>
                          <div className="flex cursor-pointer">
                                <Image
                                src="/assets/logout-w.png"
                                alt="logout"
                                width={24}
                                height={24}>

                                </Image>
                            </div>  
                        </SignOutButton>
                    </SignedIn>
                </div>
            </div>
        </nav>
    )
}

export default Topbar;