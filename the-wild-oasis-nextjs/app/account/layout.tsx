import React, {ReactNode} from 'react';
import SideNavigation from "@/app/_components/SideNavigation";

function Layout({children}: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
            <div><SideNavigation/></div>
            <div className="py-1">{children}</div>
        </div>
    );
}

export default Layout;